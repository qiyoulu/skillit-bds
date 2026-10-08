#!/usr/bin/env ruby
# Normalize single-color utility SVGs without reserializing their geometry.
# ruby scripts/normalize_icon_colors.rb             # apply replacements
# ruby scripts/normalize_icon_colors.rb --dry-run   # preview only
# ruby scripts/normalize_icon_colors.rb --check     # CI: exit 1 if changes needed

require 'json'
require 'optparse'
require 'rexml/document'
require 'fileutils'
require 'tempfile'
require 'set'

module IconColors
  # Exact approved export palettes, not a basename-only semantic bypass.
  ICONS_DIR = File.expand_path('../assets/icons', __dir__)
  APPROVED_PAINTS = {
    'checkbox-checked.svg' => %w[#ef6f1a #233136],
    'check-circle.svg' => %w[#33663d #ffffff],
    'x-octagon.svg' => %w[#c8102e #ffffff],
    'information-square.svg' => %w[#007ca6 #ffffff],
    'information-circle.svg' => %w[#007ca6 #ffffff],
    'puzzle-piece.svg' => %w[#33663d],
    'pause-circle.svg' => %w[#233136 #ffffff],
    'play-circle.svg' => %w[#233136 #ffffff],
    'radio-checked.svg' => %w[#ef6f1a #ffffff],
    'switch-off.svg' => %w[#ffffff #233136],
    'switch-on.svg' => %w[#ffffff #33663d],
    'exclamation-triangle.svg' => %w[#feb11c #ffffff]
  }.transform_values { |paints| Set.new(paints).freeze }.freeze
  SEMANTIC_COLORS = %w[#33663d #feb11c #c8102e #007ca6].freeze
  COMPLEX_ELEMENTS = %w[style defs mask filter linearGradient radialGradient pattern image use].freeze
  TAG = /<([A-Za-z_][\w:.-]*)\b[^<>]*>/m
  ATTRIBUTE = /\b(fill|stroke|style)\s*=\s*(['"])(.*?)\2/m
  STYLE_PAINT = /((?:^|;)\s*(?:fill|stroke)\s*:\s*)([^;]+)/i

  def self.color_key(value)
    value = value.strip.downcase.sub(/\s*!important\s*$/, '')
    return { 'white' => '#ffffff', 'black' => '#000000' }[value] if %w[white black].include?(value)
    return '#' + value[1..-1].chars.map { |c| c * 2 }.join if value.match?(/\A#[0-9a-f]{3}\z/)
    return value if value.match?(/\A#[0-9a-f]{6}\z/)
    rgb = value.match(/\Argb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\z/)
    if rgb && rgb.captures.all? { |v| v.to_i.between?(0, 255) }
      return '#' + rgb.captures.map { |v| format('%02x', v.to_i) }.join
    end
    return value if value.match?(/\A[a-z]+\z/)
    # Alpha, variables and context paint need review, not a guessed color.
    'unsupported:' + value
  end

  def self.transform(text, filename = '')
    raise ArgumentError, 'DTD declarations are not supported' if text.match?(/<!DOCTYPE/i)
    document = REXML::Document.new(text)
    root = document.root
    raise ArgumentError, 'not an SVG document' unless root && root.name == 'svg'

    nodes = [root]
    root.each_recursive { |node| nodes << node if node.is_a?(REXML::Element) }
    colors = Set.new
    nodes.each do |node|
      paints = %w[fill stroke].map { |key| node.attributes[key] }.compact
      node.attributes['style'].to_s.scan(STYLE_PAINT) { |_prefix, value| paints << value }
      paints.each do |paint|
        key = color_key(paint)
        colors << key unless %w[none transparent].include?(key)
      end
    end
    # Resolve exact repository paths; external lookalikes get no named exemption.
    approved = File.dirname(File.expand_path(filename)) == ICONS_DIR && APPROVED_PAINTS[File.basename(filename)]
    if approved
      raise ArgumentError, 'complex paint in approved asset' if nodes.any? { |n| COMPLEX_ELEMENTS.include?(n.name) }
      unexpected = colors - approved
      raise ArgumentError, "unexpected approved-asset paint: #{unexpected.to_a.join(', ')}" unless unexpected.empty?
      return [text, 'approved-export']
    end
    return [text, 'complex-paint'] if nodes.any? { |n| COMPLEX_ELEMENTS.include?(n.name) }
    return [text, 'semantic-color'] unless (colors.to_a & SEMANTIC_COLORS).empty?
    return [text, 'multicolor'] if colors.size > 1
    return [text, 'already-tintable'] if colors.empty? || colors == Set['currentcolor']
    return [text, 'complex-paint'] if colors.any? do |key|
      key.start_with?('unsupported:') || %w[inherit initial unset revert context-fill context-stroke].include?(key)
    end
    color = colors.first

    result = text.split(/(<!--.*?-->)/m).map do |part|
      next part if part.start_with?('<!--')
      part.gsub(TAG) do |tag|
        tag.gsub(ATTRIBUTE) do
          match = Regexp.last_match
          name, quote, value = match.captures
          prefix = match[0][0...(match.begin(3) - match.begin(0))]
          replacement = if name == 'style'
                          value.gsub(STYLE_PAINT) do
                            style_match = Regexp.last_match
                            if color_key(style_match[2]) == color
                              important = style_match[2].match?(/!important\s*$/i) ? ' !important' : ''
                              style_match[1] + 'currentColor' + important
                            else
                              style_match[0]
                            end
                          end
                        else
                          color_key(value) == color ? 'currentColor' : value
                        end
          prefix + replacement + quote
        end
      end
    end.join
    REXML::Document.new(result)
    [result, result == text ? 'already-tintable' : 'converted']
  end

  def self.main(argv)
    options = { icons_dir: File.expand_path('../assets/icons', __dir__) }
    parser = OptionParser.new do |opts|
      opts.banner = 'Usage: ruby scripts/normalize_icon_colors.rb [options]'
      opts.on('--icons-dir DIR', 'Icon directory (defaults to assets/icons)') { |v| options[:icons_dir] = v }
      opts.on('--dry-run', 'Preview without writing') { options[:dry_run] = true }
      opts.on('--check', 'Exit 1 if conversions are needed') { options[:check] = true }
      opts.on('--backup-dir DIR', 'Back up changed files; never overwrite backups') { |v| options[:backup_dir] = v }
      opts.on('-h', '--help') { puts opts; return 0 }
    end
    parser.parse!(argv)
    raise OptionParser::InvalidOption, 'unexpected positional arguments' unless argv.empty?
    raise OptionParser::InvalidOption, '--dry-run and --check are mutually exclusive' if options[:dry_run] && options[:check]
    raise OptionParser::InvalidArgument, 'icon directory does not exist' unless Dir.exist?(options[:icons_dir])

    plans, errors = [], []
    Dir.glob(File.join(options[:icons_dir], '*.svg')).sort.each do |path|
      begin
        before = File.binread(path).force_encoding(Encoding::UTF_8)
        raise ArgumentError, 'invalid UTF-8' unless before.valid_encoding?
        after, reason = transform(before, path)
        raise ArgumentError, 'transform is not idempotent' unless transform(after, path)[0] == after
        plans << { path: path, before: before, after: after, reason: reason }
      rescue REXML::ParseException, ArgumentError => e
        errors << { file: File.basename(path), error: e.message }
      end
    end
    # Parse every file before writing any; malformed input cannot partly normalize a batch.
    unless errors.empty?
      puts JSON.pretty_generate(status: 'ERROR', errors: errors)
      return 2
    end
    changes = plans.select { |plan| plan[:before] != plan[:after] }
    write = !options[:dry_run] && !options[:check]
    if write && options[:backup_dir]
      changes.each do |plan|
        backup = File.join(options[:backup_dir], File.basename(plan[:path]))
        raise OptionParser::InvalidArgument, "backup already exists: #{backup}" if File.exist?(backup)
      end
    end
    if write
      changes.each do |plan|
        path = plan[:path]
        raise ArgumentError, "file changed during normalization: #{path}" unless File.binread(path).force_encoding(Encoding::UTF_8) == plan[:before]
        if options[:backup_dir]
          FileUtils.mkdir_p(options[:backup_dir])
          FileUtils.cp(path, File.join(options[:backup_dir], File.basename(path)), preserve: true)
        end
        temporary = Tempfile.new(['icon-colors-', '.svg'], File.dirname(path))
        begin
          temporary.binmode
          temporary.write(plan[:after])
          temporary.close
          File.chmod(File.stat(path).mode & 0o7777, temporary.path)
          File.rename(temporary.path, path)
        ensure
          temporary.close!
        end
      end
    end
    mode = options[:check] ? 'check' : options[:dry_run] ? 'dry-run' : 'write'
    puts JSON.pretty_generate(mode: mode, total: plans.size,
                             changed: changes.map { |plan| File.basename(plan[:path]) },
                             retained: plans.reject { |plan| plan[:before] != plan[:after] }.map do |plan|
                               { file: File.basename(plan[:path]), reason: plan[:reason] }
                             end)
    options[:check] && !changes.empty? ? 1 : 0
  rescue OptionParser::ParseError, ArgumentError => e
    warn e.message
    2
  end
end

exit IconColors.main(ARGV) if $PROGRAM_NAME == __FILE__
