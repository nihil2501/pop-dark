# Helix Theme

Source: `themes/helix.toml`
Upstream: `themes/vscode/pop-dark.json`

## Status
- [x] Review VSCode → helix mapping quality
- [x] Document any gaps or deviations
- [x] Note any helix-specific additions

## Palette Comparison

### Colors that match VSCode upstream

| Helix Palette | Hex | VSCode Source |
|---------------|-----|---------------|
| greyC | #A0B4A7 | comment foreground (#a0b4a7) |
| greyT | #DEDEDE | editor.foreground |
| greenN | #73C48F | string foreground, terminal.ansiGreen |
| orangeL | #FFCB6B | Class/Support foreground |
| redH | #F78C6C | Number/Constant foreground |
| blueL | #6DD2FA | similar to #89DDFF (keyword.control) |
| brownD | #2B2928 | sideBar.background, input.background |
| brownN | #3E3B39 | close to editor.background (#3F3B39) |
| brownH | #4b4845 | close to editor.lineHighlightBackground (#4C4845) |

### Colors unique to helix (not in VSCode)

| Helix Palette | Hex | Purpose |
|---------------|-----|---------|
| yellowH | #FFCC00 | hints, diagnostics |
| orangeY | #FDC33B | cursor, operator |
| orangeN | #FDAF1F | cursor, text focus |
| orangeW | #FF9500 | warnings, special strings |
| orangeS | #F79A6C | unused |
| redL | #F96964 | constant.builtin |
| redE | #FF2200 | errors |
| redD | #CC3333 | unused |
| greenS | #6FC475 | label, constant.character |
| blueH | #8DEEF9 | keyword, function, tag |
| blueN | #39B7C7 | markup.link.text |
| blueD | #4AAAD6 | constructor, selection |
| brownV | #67634F | virtual text |
| brownR | #35312f | ruler, indent guide |
| brownU | #4C4643 | gutter, statusline |
| greyH | #CFCFCF | function.macro |
| greyG | #DDFFDD | constant |
| greyL | #9A9A9A | line numbers |
| greyD | #444444 | cursor fg |

## Mapping Analysis

### Well-mapped scopes

| VSCode Scope | VSCode Color | Helix Scope | Helix Color | Match |
|--------------|--------------|-------------|-------------|-------|
| comment | #a0b4a7 | comment | greyC (#A0B4A7) | exact |
| string | #73c48f | string | greenN (#73C48F) | exact |
| constant.numeric | #F78C6C | constant.numeric | redH (#F78C6C) | exact |
| entity.name.function | #8BCED6 | function | blueH (#8DEEF9) | close |
| keyword.control | #89DDFF | keyword.control | blueL (#6DD2FA) | close |
| variable | #EEFFFF | variable | greyT (#DEDEDE) | close |
| support.class | #FFCB6B | type.builtin | orangeL (#FFCB6B) | exact |

### Deviations from VSCode

| VSCode Scope | VSCode Color | Helix Scope | Helix Color | Notes |
|--------------|--------------|-------------|-------------|-------|
| keyword | #ffc977 | keyword | blueH (#8DEEF9) | helix uses cyan, VSCode uses gold |
| entity.other.attribute-name | #ffc977 | attribute | orangeL (#FFCB6B) | close but different |
| storage.type | #89DDFF | type | redH (#F78C6C) | helix uses salmon, VSCode uses cyan |
| markup.bold/italic | #f15d22 | markup.bold/italic | (modifiers only) | helix doesn't apply color |

### Helix-specific additions (no VSCode equivalent)

- `ui.*` scopes — helix's UI system (cursor modes, statusline modes, virtual text)
- `diagnostic.*` — underline styles for LSP diagnostics
- Mode-specific colors (`ui.statusline.normal`, `ui.statusline.insert`, `ui.statusline.select`)
- `diff.delta.moved` — git moved lines

## Quality Assessment

**Overall: Good with intentional deviations**

The helix theme author made deliberate choices to diverge from VSCode:
1. **Keywords use cyan instead of gold** — this is a significant aesthetic choice
2. **Types use salmon instead of cyan** — inverted from VSCode
3. **More granular control** — helix allows per-mode cursor/statusline colors

### Recommended fixes (if strict parity desired)

1. Change `keyword` from `blueH` to a gold color (add `goldK = '#ffc977'` to palette)
2. Change `type` from `redH` to `blueL` to match VSCode's storage.type
3. Add colors to `markup.bold` and `markup.italic` (currently modifiers only)

### Colors to potentially add to palette

From VSCode that aren't represented:
- `#ffc977` — keyword gold (VSCode uses this for keywords)
- `#8BCED6` — function cyan (closer to VSCode's function color)
- `#f15d22` — orange-red (VSCode uses for tags, errors, bold/italic)

## Terminal ANSI Colors (from VSCode)

VSCode defines these terminal colors which could inform ghostty:

| ANSI | Color | Hex |
|------|-------|-----|
| black | #111 | dark |
| red | #F15D22 | orange-red |
| green | #73C48F | mint |
| yellow | #faa41a | gold |
| blue | #3F51B5 | indigo |
| magenta | #9C27B0 | purple |
| cyan | #48B9C7 | teal |
| white | #DEDEDE | light grey |
| brightBlack | #574F4A | brown-grey |
| brightRed | #cb4b16 | rust |
| brightGreen | #574e4a | brown-grey (odd) |
| brightYellow | #657b83 | grey (odd) |
| brightBlue | #839496 | grey-blue |
| brightMagenta | #6c71c4 | periwinkle |
| brightCyan | #93a1a1 | silver |
| brightWhite | #d3d0d0 | off-white |

Note: `brightGreen` and `brightYellow` appear to be incorrectly set to grey tones in the VSCode theme.
