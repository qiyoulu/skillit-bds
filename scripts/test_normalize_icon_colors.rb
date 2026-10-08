require 'minitest/autorun'
require 'tmpdir'
require 'open3'
require 'rbconfig'
require_relative 'normalize_icon_colors'

class IconColorTest < Minitest::Test
  SCRIPT = File.expand_path('normalize_icon_colors.rb', __dir__)

  def svg(body)
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none">' + body + '</svg>'
  end

  def test_single_color_and_idempotence
    source = svg('<path d="M1 2L3 4Z" fill="#233136" opacity="0.5"/>')
    changed, reason = IconColors.transform(source, 'utility.svg')
    assert_equal source.sub('#233136', 'currentColor'), changed
    assert_equal 'converted', reason
    assert_equal changed, IconColors.transform(changed)[0]
  end

  def test_semantic_and_multicolor_stay_identical
    [ ['exclamation-triangle.svg', '<path fill="#FEB11C"/>'],
      ['generic.svg', '<path fill="#33663D"/>'],
      ['control.svg', '<path fill="#EF6F1A"/><path fill="white"/>'],
      ['control.svg', '<path fill="currentColor"/><path fill="white"/>'] ].each do |name, body|
      source = svg(body)
      assert_equal source, IconColors.transform(source, name)[0]
    end
  end

  def test_equivalent_color_spellings_and_inline_style
    source = svg('<path fill="#FFF"/><path stroke="rgb(255, 255, 255)" style="fill: white !important; opacity: .5"/>')
    changed, reason = IconColors.transform(source)
    assert_equal 'converted', reason
    assert_includes changed, 'fill: currentColor !important; opacity: .5'
    refute_includes changed, '#FFF'
    refute_includes changed, 'rgb('
    REXML::Document.new(changed)
  end

  def test_transparency_quotes_comments_and_geometry
    source = svg('<!-- <path fill="#233136"/> --><path fill="none"/><path fill="transparent"/><path d="M0 0L2 3Z" fill=\'#233136\'/>')
    changed, = IconColors.transform(source)
    assert_includes changed, '<!-- <path fill="#233136"/> -->'
    assert_includes changed, 'fill="none"'
    assert_includes changed, 'fill="transparent"'
    assert_includes changed, "fill='currentColor'"
    assert_includes changed, 'd="M0 0L2 3Z"'
  end

  def test_complex_paint_skips_without_loss
    ['<defs/><path fill="#233136"/>', '<style>path{fill:red}</style><path/>',
     '<path fill="var(--color-primary)"/>', '<path fill="rgba(0,0,0,.5)"/>'].each do |body|
      source = svg(body)
      assert_equal source, IconColors.transform(source)[0]
    end
  end

  def test_all_approved_export_palettes_and_negative_controls
    assert_equal 12, IconColors::APPROVED_PAINTS.size
    IconColors::APPROVED_PAINTS.each do |name, allowed|
      path = File.join(IconColors::ICONS_DIR, name)
      original = File.read(path)
      assert_equal [original, 'approved-export'], IconColors.transform(original, path), name
      bad = original.sub('</svg>', '<path fill="#ff00ff"/></svg>')
      assert_raises(ArgumentError, name) { IconColors.transform(bad, path) }
      complex = original.sub('</svg>', '<style>path{fill:magenta}</style></svg>')
      assert_raises(ArgumentError, name) { IconColors.transform(complex, path) }
      external = File.join(Dir.tmpdir, name)
      utility = svg('<path fill="#233136"/>')
      # External names do not bypass normalization, even for semantic exports.
      assert_equal 'converted', IconColors.transform(utility, external)[1], name
    end
    %w[checkmark warning error information match].each do |name|
      assert_equal 'converted', IconColors.transform(svg('<path fill="#233136"/>'), name + '.svg')[1]
    end
  end

  def run_script(directory, *args)
    output, error, status = Open3.capture3(RbConfig.ruby, SCRIPT, '--icons-dir', directory, *args)
    [output, error, status.exitstatus]
  end

  def test_cli_preview_check_backup_and_two_pass
    Dir.mktmpdir do |directory|
      icons = File.join(directory, 'icons')
      backups = File.join(directory, 'backups')
      Dir.mkdir(icons)
      path = File.join(icons, 'utility.svg')
      original = svg('<path d="M0 0L1 1Z" fill="#233136"/>')
      File.write(path, original)
      File.chmod(0o640, path)
      assert_equal 0, run_script(icons, '--dry-run')[2]
      assert_equal original, File.read(path)
      assert_equal 1, run_script(icons, '--check')[2]
      assert_equal 0, run_script(icons, '--backup-dir', backups)[2]
      assert_equal original, File.read(File.join(backups, 'utility.svg'))
      first = File.binread(path)
      assert_equal 0o640, File.stat(path).mode & 0o777
      assert_equal 0, run_script(icons)[2]
      assert_equal first, File.binread(path)
      assert_equal 0, run_script(icons, '--check')[2]
    end
  end

  def test_malformed_batch_never_partially_writes
    Dir.mktmpdir do |directory|
      good = File.join(directory, 'a.svg')
      original = svg('<path fill="#233136"/>')
      File.write(good, original)
      File.write(File.join(directory, 'z.svg'), '<svg>')
      assert_equal 2, run_script(directory)[2]
      assert_equal original, File.read(good)
    end
  end

  def test_backup_collision_does_not_overwrite
    Dir.mktmpdir do |directory|
      icons = File.join(directory, 'icons')
      backups = File.join(directory, 'backups')
      Dir.mkdir(icons)
      Dir.mkdir(backups)
      original = svg('<path fill="#233136"/>')
      File.write(File.join(icons, 'x.svg'), original)
      File.write(File.join(backups, 'x.svg'), 'protected')
      assert_equal 2, run_script(icons, '--backup-dir', backups)[2]
      assert_equal original, File.read(File.join(icons, 'x.svg'))
      assert_equal 'protected', File.read(File.join(backups, 'x.svg'))
    end
  end
end
