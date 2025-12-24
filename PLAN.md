# Pop Dark Theme

Propagate the `pop-dark` theme across TUI contexts.

## Source of Truth

**Helix theme** (`themes/helix.toml`) is the canonical source.

## Palette

The helix theme defines 31 named colors:

| Category | Colors |
|----------|--------|
| Browns (bg) | brownN, brownH, brownD, brownR, brownU, brownV |
| Greys | greyT, greyC, greyL, greyH, greyG, greyD |
| Oranges | orangeH, orangeL, orangeN, orangeY, orangeW, orangeS |
| Blues | blueH, blueL, blueN, blueD |
| Greens | greenN, greenS |
| Reds | redH, redL, redE, redD |
| Yellow | yellowH |
| B/W | white, black |

See `themes/helix.toml` `[palette]` section for hex values.

## Semantic Mappings

Two documents define how helix theme concepts map to target formats:

| Document | Purpose | Target Formats |
|----------|---------|----------------|
| `docs/terminal.md` | ANSI-16 + terminal UI colors | Ghostty, iTerm2, etc. |
| `docs/syntax.md` | tmTheme syntax scopes | bat, opencode, Sublime, etc. |

## Targets

| Target | Format | Mapping Doc |
|--------|--------|-------------|
| Ghostty | Key-value config | `docs/terminal.md` |
| bat | tmTheme (XML) | `docs/syntax.md` |
| opencode | tmTheme (XML) | `docs/syntax.md` |

## Artifacts

| Path | Description | Status |
|------|-------------|--------|
| `themes/helix.toml` | Source theme (canonical) | done |
| `themes/ghostty` | Ghostty terminal theme | pending |
| `themes/pop-dark.tmTheme` | bat/opencode syntax theme | pending |

## Reference Implementations

The `vendor/converters/` directory contains 5 reference implementations for theme conversion. None are directly usable (all expect VSCode JSON input), but they're useful for understanding output formats:

| Converter | Language | Key Files | Useful For |
|-----------|----------|-----------|------------|
| `code-theme-converter` | TypeScript | `src/sublime/tmTheme.ts` | tmTheme XML structure, token color mapping |
| `json2tm` | Rust | `src/tm.rs` | Minimal tmTheme generation, plist serialization |
| `root-loops` | TypeScript/Svelte | `src/lib/export/ghostty.ts`, `helix.ts` | Ghostty and Helix format examples |
| `theme-converter` | Rust | `src/parser.rs` | VSCode theme parsing patterns |
| `vscode_theme_converter` | Python | `src/vscode_theme_converter/tm_theme.py` | plist handling, ANSI color mapping |

## Next Steps

1. **Review semantic mappings** — Validate `docs/terminal.md` and `docs/syntax.md`
2. **Create `themes/ghostty`** — Generate from `docs/terminal.md` mapping
3. **Write `scripts/generate-tmtheme.ts`** — Convert helix.toml → tmTheme using `docs/syntax.md`
4. **Generate `themes/pop-dark.tmTheme`** — Run generator
5. **Validate** — Test in ghostty, bat, opencode
