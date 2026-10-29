# Ngày mai, chúng ta sẽ khác

## Mission
Create implementation-ready, token-driven UI guidance for Ngày mai, chúng ta sẽ khác that is optimized for consistency, accessibility, and fast delivery across content site.

## Brand
- Product/brand: Ngày mai, chúng ta sẽ khác
- URL: https://fpt-graduation.tranchithuanjr.workers.dev/
- Audience: readers and knowledge seekers
- Product surface: content site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Be Vietnam Pro`, `font.family.stack=Be Vietnam Pro, system-ui, sans-serif`, `font.size.base=18.56px`, `font.weight.base=400`, `font.lineHeight.base=34.336px`
- Typography scale: `font.size.xs=11.52px`, `font.size.sm=13.12px`, `font.size.md=13.33px`, `font.size.lg=15.2px`, `font.size.xl=16px`, `font.size.2xl=16.8px`, `font.size.3xl=18.4px`, `font.size.4xl=18.56px`
- Color palette: `color.text.primary=#ece0c6`, `color.text.secondary=#f1e7d0`, `color.border.muted=#e8692c`, `color.text.inverse=#ffffff`, `color.surface.base=#000000`, `color.surface.raised=#14110f`, `color.surface.strong=#f4ead3`
- Spacing scale: `space.1=5.57px`, `space.2=6px`, `space.3=6.08px`, `space.4=10px`, `space.5=11.76px`, `space.6=14px`, `space.7=16px`, `space.8=18px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=999px` | `shadow.1=rgba(0, 0, 0, 0.5) 0px 16px 32px 0px`, `shadow.2=rgb(232, 105, 44) 4px 4px 0px 0px`, `shadow.3=rgba(0, 0, 0, 0.5) 0px 30px 60px 0px` | `motion.duration.instant=120ms`, `motion.duration.fast=200ms`, `motion.duration.normal=1100ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: buttons (15), navigation (10), cards (2), links (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
