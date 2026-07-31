/**
 * Skillit Brand Design System — Tailwind Theme Extension
 * 
 * Instructions:
 * Merge this object into the `theme.extend` section of your project's tailwind.config.js.
 * This ensures all brand colors are namespaced under `skillit-*` (e.g. `bg-skillit-canvas`, `text-skillit-iron`)
 * and tied directly to the CSS custom properties defined in the global stylesheet.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        skillit: {
          canvas: 'var(--color-bg)',
          plaster: 'var(--color-surface)',
          iron: 'var(--color-fg)',
          'traffic-cone': 'var(--color-primary)',
          'hard-hat': 'var(--color-warning)',
          toolbox: 'var(--color-error)',
          'bottle-glass': 'var(--color-success)',
          'painters-tape': 'var(--color-link)'
        }
      },
      fontFamily: {
        sans: ['"Work Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      borderRadius: {
        none: '0px',
        pill: '9999px'
      }
    }
  }
}