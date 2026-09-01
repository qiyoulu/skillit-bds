#!/usr/bin/env ruby
# frozen_string_literal: true

# Replace straight quotation marks and apostrophes with smart angled quotes.

def smart_quotes(text)
  result = ""
  single_open = true
  double_open = true
  chars = text.chars

  chars.each_with_index do |c, i|
    case c
    when '"'
      prev_char = i.positive? ? chars[i - 1] : ''
      is_opening = ['', ' ', "\n", "\t", '(', '[', '{', '<', '/'].include?(prev_char) || double_open

      if is_opening
        result += '“'
        double_open = false
      else
        result += '”'
        double_open = true
      end

    when "'"
      prev_char = i.positive? ? chars[i - 1] : ''
      next_char = i < chars.length - 1 ? chars[i + 1] : ''

      # Apostrophe in contractions (don't, it's, etc.)
      if prev_char.match?(/[[:alpha:]]/) && next_char.match?(/[[:alpha:]]/)
        result += '’'
        next
      end

      # Possessive 's
      if prev_char.match?(/[[:alpha:]]/) && ['', ' ', "\n", "\t", ',', '.', '!', '?', ';', ':', ')', ']', '}'].include?(next_char)
        result += '’'
        next
      end

      # Opening or closing single quote
      is_opening = ['', ' ', "\n", "\t", '(', '[', '{', '<', '/', '"'].include?(prev_char) || single_open

      if is_opening
        result += '‘'
        single_open = false
      else
        result += '’'
        single_open = true
      end

    else
      result += c
    end
  end

  result
end

def process_file(filepath)
  original = File.read(filepath, encoding: 'utf-8')
  converted = smart_quotes(original)

  if converted != original
    File.write(filepath, converted, encoding: 'utf-8')
    puts "✓ #{filepath}"
  else
    puts "  #{filepath} (no changes)"
  end
rescue StandardError => e
  puts "✗ #{filepath}: #{e.message}"
end

def process_directory(dirpath, extensions = %w[.md .txt])
  Dir.glob(File.join(dirpath, '**', '*')).each do |filepath|
    next unless File.file?(filepath)
    next unless extensions.include?(File.extname(filepath))

    process_file(filepath)
  end
end

if __FILE__ == $PROGRAM_NAME
  if ARGV.any?
    path = ARGV[0]
    if File.file?(path)
      process_file(path)
    elsif File.directory?(path)
      process_directory(path)
    else
      puts "Not found: #{path}"
      exit 1
    end
  else
    default = '/Users/qiyou/Documents/Work/skillit/workspace/creative/copywriting/brand-guidelines-copy.md'
    if File.exist?(default)
      process_file(default)
    else
      puts "Usage: ruby smart_quotes.rb <file or directory>"
      exit 1
    end
  end
end
