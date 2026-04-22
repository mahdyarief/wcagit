# Web Interface Guidelines

These guidelines are adapted from the Vercel Web Interface Guidelines. Use them to ensure UI/UX excellence beyond basic accessibility.

## Accessibility
- Icon-only buttons need `aria-label`.
- Form controls need `<label>` or `aria-label`.
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`).
- Use `<button>` for actions, `<a>`/`<Link>` for navigation (not `<div onClick>`).
- Images need `alt` (or `alt=""` if decorative).
- Decorative icons need `aria-hidden="true"`.
- Async updates (toasts, validation) need `aria-live="polite"`.
- Use semantic HTML before ARIA.
- Headings must be hierarchical (`<h1>`–`<h6>`).
- Include skip link for main content.

## Focus States
- Interactive elements need visible focus: `focus-visible:ring-*`.
- Never use `outline-none` without a focus replacement.
- Use `:focus-visible` over `:focus`.

## Forms
- Inputs need `autocomplete` and meaningful `name`.
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`.
- Never block paste (`onPaste` + `preventDefault`).
- Labels must be clickable (`htmlFor` or wrapping control).
- Disable spellcheck on sensitive fields like emails or usernames.
- Submit button stays enabled until request starts; show spinner during request.
- Errors should be inline next to fields.
- Placeholders should end with `…` and show an example pattern.

## Animation
- Honor `prefers-reduced-motion` (provide reduced variant or disable).
- Animate `transform`/`opacity` only (compositor-friendly).
- Never use `transition: all`—list properties explicitly.

## Typography & Content
- Use `…` (ellipsis) not `...` (three dots).
- Use curly quotes `“` `”` not straight `"`.
- Loading states end with `…`: `"Loading…"`.
- Use `font-variant-numeric: tabular-nums` for number columns.
- Text containers must handle long content (`truncate`, `line-clamp`).

## Performance & Images
- Large lists (>50 items) should be virtualized.
- No layout reads in render (`getBoundingClientRect`, `offsetHeight`).
- `<img>` needs explicit `width` and `height` to prevent CLS.
- Below-fold images: `loading="lazy"`.

## Touch & Interaction
- `touch-action: manipulation` (prevents double-tap zoom delay).
- `overscroll-behavior: contain` in modals/drawers.
- Avoid `autoFocus` on mobile.

## AAA Excellence (Highest Standard)
These points elevate the UI from "Usable" to "Elite".

### Cognitive & Layout (AAA)
- **Minimalist Design**: Reduce visual noise. Each screen should have ONE primary action.
- **Reading Level**: Use plain language. Aim for a reading level that a 12-year-old can understand.
- **Consistent Identification**: Use icons and labels consistently across the entire site.

### Interaction & Errors (AAA)
- **Undo Everything**: Provide an "Undo" mechanism for ALL destructive actions (deleting, moving, editing).
- **No Time Limits**: If a session timeout exists, the user MUST be able to turn it off before it happens.
- **Confirmatory Checkpoint**: For any data submission, provide a "Review" screen before final submission.

### Typography (AAA)
- **Line Height**: Set `line-height` to at least `1.5` within paragraphs.
- **Paragraph Spacing**: Space between paragraphs should be at least `2x` the line spacing.
- **No Justification**: Never use `text-align: justify`.
- **Text Width**: Limit text containers to ~80 characters (around `60ch` or `65ch`) for optimal readability.

### Motion & Seizures (AAA)
- **Zero Flashing**: Content must not flash more than 3 times in any 1-second period.
- **Animation Control**: Provide a global toggle to disable all non-essential animations.

## Anti-patterns (Flag these)
- `user-scalable=no` or `maximum-scale=1` (Disables zoom).
- `onPaste` with `preventDefault`.
- `transition: all`.
- `outline-none` without focus-visible replacement.
- Inline `onClick` navigation without `<a>`.
- Images without dimensions.
- Form inputs without labels.


