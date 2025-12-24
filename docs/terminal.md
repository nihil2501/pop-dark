# Terminal Color Mapping

This document defines the semantic mapping from ANSI-16 terminal colors to Helix theme concepts.

## Terminal UI Colors

These are non-ANSI colors used by terminal emulators for UI elements.

| Terminal Concept | Semantic Meaning | Helix Scope |
|------------------|------------------|-------------|
| `background` | Main terminal background | `ui.background` bg |
| `foreground` | Default text color | `ui.text` fg |
| `cursor` | Cursor fill color | `ui.cursor` bg |
| `cursor-text` | Text under cursor | `ui.cursor` fg |
| `selection-background` | Selected text background | `ui.selection` bg |
| `selection-foreground` | Selected text foreground | `ui.selection` fg |

## ANSI-16 Palette

The ANSI-16 palette provides 16 color slots with conventional semantic meanings.
Terminal applications use these colors for specific purposes.

### Normal Colors (0-7)

| Slot | ANSI Name | Semantic Meaning | Helix Scope |
|------|-----------|------------------|-------------|
| 0 | black | Background, hidden text | `ui.background` bg |
| 1 | red | Errors, failures, deletions | `error` fg |
| 2 | green | Success, additions, strings | `string` fg |
| 3 | yellow | Warnings, caution | `warning` fg |
| 4 | blue | Info, links, emphasis | `markup.link` fg |
| 5 | magenta | Special, decorative | `special` fg |
| 6 | cyan | Keywords, identifiers | `keyword` fg |
| 7 | white | Normal text | `ui.text` fg |

### Bright Colors (8-15)

| Slot | ANSI Name | Semantic Meaning | Helix Scope |
|------|-----------|------------------|-------------|
| 8 | bright black | Comments, muted text | `comment` fg |
| 9 | bright red | Bright errors, important warnings | `error` fg (alternative) |
| 10 | bright green | Bright success, highlights | `string` fg (alternative) |
| 11 | bright yellow | Hints, annotations | `hint` fg |
| 12 | bright blue | Bright links, active elements | `keyword.control` fg |
| 13 | bright magenta | Types, special identifiers | `type` fg |
| 14 | bright cyan | Functions, callables | `function` fg |
| 15 | bright white | Bright/bold text | `ui.text` fg (bright) |

## Design Notes

### Palette Constraints

The source Helix palette has 31 colors but no purple/magenta. When generating terminal themes:

- Magenta slots (5, 13) must use warm alternatives from the palette
- The palette is intentionally warm (oranges, salmons, browns)
- Preserving the warm aesthetic is preferred over introducing derived colors

### Semantic Priority

When mapping, prioritize semantic meaning over exact color matching:

1. Errors must feel "error-like" (red family)
2. Success/strings must feel "positive" (green family)
3. Warnings must draw attention (yellow/orange family)
4. Info/links should be calm but visible (blue family)

### Unmapped Helix Colors

These Helix palette colors don't have direct ANSI-16 equivalents but are preserved in the source:

- Browns (brownV, brownH, brownR, brownD, brownU) — UI backgrounds
- Additional oranges (orangeH, orangeY, orangeS) — syntax accents
- Greys (greyH, greyG, greyL, greyC) — UI and muted syntax

## Generator Usage

A generator script will read this mapping and `themes/helix.toml` to produce terminal theme files (e.g., Ghostty, iTerm2, etc.).
