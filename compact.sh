#!/bin/bash
for f in $(find . -name "*.md" -not -path "*/memory/*" -not -path "*/MEMORY.md"); do
  # Remove trailing whitespace
  sed -i '' -e 's/[[:space:]]*$//' "$f"
  # Squeeze multiple blank lines into one
  awk 'v != "" || $0 != "" {
    if ($0 == "") {
      if (b == 0) { print ""; b = 1 }
    } else {
      print; b = 0
    }
  } END { if (b == 1) print "" }' "$f" > "${f}.tmp" && mv "${f}.tmp" "$f"
done
