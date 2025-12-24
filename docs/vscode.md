# VSCodePopTheme (Upstream Source)

Upstream: https://github.com/ArtisanByteCrafter/VSCodePopTheme
Local: `themes/vscode/pop-dark.json`

## Status
- [x] Pull as artifact
- [x] Locate compiled JSON theme file
- [ ] Document color palette

## Theme Variants

The upstream repo contains 3 variants:
- `Pop-Dark-color-theme.json` — dark theme (pulled)
- `Pop-Light-color-theme.json` — light theme
- `Pop-color-theme.json` — original/default

## Key Colors

### Editor UI
| Property | Hex | Description |
|----------|-----|-------------|
| editor.background | #3F3B39 | main editor bg |
| editor.foreground | #DEDEDE | main text |
| editor.lineHighlightBackground | #4C4845 | current line |
| editor.selectionBackground | #00616F | selection |
| sideBar.background | #2B2928 | sidebar bg |
| statusBar.background | #2B2928 | status bar |

### Syntax (tokenColors)
| Scope | Hex | Description |
|-------|-----|-------------|
| comment | #a0b4a7 | muted green-grey |
| string | #73c48f | mint green |
| keyword | #ffc977 | gold |
| keyword.control | #89DDFF | cyan |
| constant.numeric | #F78C6C | salmon |
| entity.name.function | #8BCED6 | light cyan |
| support.class | #FFCB6B | light orange |
| variable | #EEFFFF | near-white |

### Terminal ANSI
| Color | Hex |
|-------|-----|
| black | #111 |
| red | #F15D22 |
| green | #73C48F |
| yellow | #faa41a |
| blue | #3F51B5 |
| magenta | #9C27B0 |
| cyan | #48B9C7 |
| white | #DEDEDE |
| brightBlack | #574F4A |
| brightRed | #cb4b16 |
| brightGreen | #574e4a |
| brightYellow | #657b83 |
| brightBlue | #839496 |
| brightMagenta | #6c71c4 |
| brightCyan | #93a1a1 |
| brightWhite | #d3d0d0 |

Note: `brightGreen` and `brightYellow` appear to be set to grey tones, which may be intentional for solarized-like semantics or a bug.
