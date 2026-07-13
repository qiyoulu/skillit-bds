# UI Components — Skillit BDS

**Last updated:** 2026-07-10

---

## Rules before you use this file

- All components use tokens from `tokens/color.md`, `tokens/typography.md`, and `tokens/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons and interactive cards use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element must have a visible focus state (2px solid Cord, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

---

## Buttons

### Primary button
The main CTA. One per section maximum. Cord background, Notebook text.

```css
.btn-primary {
  background-color: var(--color-primary);   /* Cord #EF6F1A */
  color: var(--color-bg);                   /* Notebook #FAF7F3 */
  font-family: var(--font-primary);
  font-size: var(--text-ui);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--space-3) var(--space-8);   /* 12px 32px — tactile padding */
  border: none;
  border-radius: 100px;
  letter-spacing: 0;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #CC5200;               /* Cord darkened 20% */
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

**Label rules:** Sentence-case imperative. “Sign up” / “Get hired” / “Apply” / “See the network.” Never “Click here” or “Submit form.”

### Secondary button
Outlined, Graphite stroke, no fill. For secondary actions.

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-fg);                   /* Graphite #232F36 */
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--space-3) var(--space-8);   /* tactile padding */
  border: 1.5px solid var(--color-fg);
  border-radius: 100px;
  cursor: pointer;
}
.btn-secondary:hover {
  background-color: var(--color-fg);
  color: var(--color-bg);
}
```

### Destructive button
For irreversible actions only. Toolbox background.

```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-bg);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  font-weight: var(--weight-semibold);
  padding: var(--space-3) var(--space-8);
  border: none;
  border-radius: 100px;
  cursor: pointer;
}
```

---

## Navigation

```css
.nav {
  background-color: var(--color-bg);        /* Notebook */
  border-bottom: 1px solid rgba(35, 47, 54, 0.12); /* Graphite at 12% */
  padding: 0 var(--space-16);              /* 64px side margins */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  font-family: var(--font-primary);
  font-size: var(--text-ui-sm);          /* 0.875rem */
  font-weight: var(--weight-medium);       /* 500 */
  color: var(--color-fg);                  /* Graphite */
  text-decoration: none;
}

.nav-link:hover,
.nav-link[aria-current="page"] {
  color: var(--color-primary);             /* Cord */
}
```

**Approved nav tabs:** How It Works · Our Network · Jobs · About Us · Resources

**Right side:** Primary button (“Sign up”) — Cord, tactile padding.

---

## Form inputs

Input fields use a bottom-border-only style — no box, no background fill. Mimics a drafting line.

```css
.input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-fg); /* Graphite */
  border-radius: 0;
  color: var(--color-fg);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  padding: var(--space-3) 0;               /* 12px top/bottom, no side padding */
  width: 100%;
}
.input:focus {
  outline: none;
  border-bottom-color: var(--color-primary); /* Cord on focus */
}
.input::placeholder {
  color: rgba(35, 47, 54, 0.4);            /* Graphite at 40% */
}
```

**Labels:** Above the field, not inside (placeholder is not a label). `--text-label` size, `--weight-medium`, Graphite.

**Error state:** Border becomes Toolbox (`--color-error`). Error message below field in Toolbox, `--text-ui-sm`. Must include an error icon (non-color signal).

**Success state:** Border becomes Lumber (`--color-success`). Checkmark icon alongside.

---

## Badges and status indicators

Every badge must communicate via color + shape + label. Never color alone.

```css
/* Base badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-primary);
  font-size: var(--text-label);            /* 0.75rem */
  font-weight: var(--weight-medium);       /* 500 */
  padding: var(--space-1) var(--space-2); /* 4px 8px */
}

/* Success — pill shape */
.badge-success {
  background-color: var(--color-success);  /* Lumber */
  color: var(--color-bg);                  /* Notebook */
  border-radius: 100px;                    /* pill */
}

/* Warning — chamfered (use clip-path or angled border) */
.badge-warning {
  background-color: var(--color-warning);  /* Hard Hat */
  color: var(--color-fg);                  /* Graphite */
  border-radius: 0;
}

/* Error — square */
.badge-error {
  background-color: var(--color-error);    /* Toolbox */
  color: var(--color-bg);                  /* Notebook */
  border-radius: 0;
}

/* Info */
.badge-info {
  background-color: var(--color-link);     /* Cooler */
  color: var(--color-bg);                  /* Notebook */
  border-radius: 100px;
}
```

---

## Cards

Cards use generous padding (tactile) and a hairline border for separation. No drop shadows.

```css
.card {
  background-color: var(--color-bg);       /* Notebook */
  border: 1px solid rgba(35, 47, 54, 0.1); /* Graphite at 10% */
  border-radius: 0;
  padding: var(--space-6);                 /* 24px all sides */
}

/* Hover state for interactive cards */
.card-interactive:hover {
  border-color: var(--color-primary);      /* Cord border on hover */
  cursor: pointer;
}

/* Active / selected state */
.card-interactive[aria-selected="true"] {
  border-color: var(--color-primary);
  border-width: 2px;
}
```

---

## Text links

Links are Cooler, always underlined. Never a fill, never a button-style treatment.

```css
a {
  color: var(--color-link);               /* Cooler #007CA6 */
  text-decoration: underline;
  text-underline-offset: 2px;
}
a:hover {
  text-decoration-thickness: 2px;
}
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0;
}
```

**On Graphite (dark) backgrounds:** Use Notebook underlined text instead of Cooler — Cooler does not pass contrast on Graphite.

---

## Dividers

```css
.divider {
  border: none;
  border-top: 1px solid rgba(35, 47, 54, 0.12); /* Graphite at 12% */
  margin: var(--space-8) 0;              /* 32px top and bottom */
}
```

No decorative dividers. No colored dividers. No thick rules used as decorative elements.

---

## Metadata and data strings

All timestamps, IDs, distances, file sizes, and numeric data strings use the monospace stack.

```css
.meta {
  font-family: var(--font-mono);
  font-size: var(--text-mono);            /* 0.875rem */
  color: rgba(35, 47, 54, 0.6);          /* Graphite at 60% */
  letter-spacing: 0.02em;
}
```

This visually separates machine data from human content — a core distinction in the system.
