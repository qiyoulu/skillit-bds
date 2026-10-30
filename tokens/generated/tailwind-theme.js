/**
 * Skillit Brand Design System — Tailwind Theme Extension
 *
 * DERIVED from tokens/tokens.json5 (single source of truth).
 * No generator exists yet — keep this file in sync with tokens.json5 manually.
 *
 * WARNING: the `spacing` keys (1–128) override Tailwind's default scale for
 * the keys they share. In practice the 1–24 range matches Tailwind's defaults
 * (both are 4px-base rem, e.g. p-5 = 1.25rem = 20px), so the merge is
 * harmless there — the real additions are the macro token 128 and the
 * role names `gutter` and `page`, which Tailwind does not define.
 *
 * Instructions:
 * 1. Import the CSS custom properties from tokens/generated/tokens.css into your global stylesheet
 *    (the var() references below resolve against that :root block).
 * 2. Merge this object's `theme.extend` into your project's `theme.extend`, or use the whole export as a Tailwind preset.
 * This ensures all brand colors are namespaced under `skillit-*` (e.g. `bg-skillit-canvas`, `text-skillit-iron`)
 * and tied directly to the canonical design tokens.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        skillit: {
          canvas: 'var(--color-background)',
          plaster: 'var(--color-surface)',
          iron: 'var(--color-foreground)',
          'traffic-cone': 'var(--color-primary)',
          'hard-hat': 'var(--color-warning)',
          toolbox: 'var(--color-error)',
          'bottle-glass': 'var(--color-success)',
          'painters-tape': 'var(--color-link)',
          // accessible variants: opt-in only, never defaults; per instance where AA is required
          'traffic-cone-accessible': 'var(--color-primary-accessible)',
          'hard-hat-accessible': 'var(--color-warning-accessible)',
          'painters-tape-accessible': 'var(--color-link-accessible)'
        }
      },
      fontFamily: {
        sans: ['"Work Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        '8x': 'var(--text-8x)',
        '6x': 'var(--text-6x)',
        '4x': 'var(--text-4x)',
        '3x': 'var(--text-3x)',
        '2x': 'var(--text-2x)',
         '1.5x': 'var(--text-1\\.5x)',
        '1x': 'var(--text-1x)',
        '0.75x': 'var(--text-0\\.75x)' // captions/labels; pair with font-mono for machine data
      },
      borderRadius: {
        sharp: 'var(--radius-sharp)',
        soft: 'var(--radius-soft)',
        pill: 'var(--radius-pill)'
      },
      spacing: {
        '1': 'var(--space-1)',
         '1.5': 'var(--space-1\\.5)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '128': 'var(--space-128)',
        'gutter': 'var(--space-gutter)',
        'page': 'var(--space-page)',
        // DEPRECATED: the space-*x keys below; use the numeric keys above. Removed in a later release.
        'space-0.25x': 'var(--space-0\\.25x)',
        'space-0.5x': 'var(--space-0\\.5x)',
        'space-1x': 'var(--space-1x)',
        'space-1.5x': 'var(--space-1\\.5x)',
        'space-2x': 'var(--space-2x)',
        'space-3x': 'var(--space-3x)',
        'space-4x': 'var(--space-4x)',
        'space-6x': 'var(--space-6x)',
        'space-8x': 'var(--space-8x)'
      }
    }
  }
}
