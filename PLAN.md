# Goal
Propagate my `pop-dark` theme across terminal tooling contexts.

## Lineage
```
VSCodePopTheme (upstream) → helix pop-dark (current) → ghostty, bat, opencode
```

## Formats
| Context | Format | Notes |
|---------|--------|-------|
| VSCodePopTheme | VSCode JSON | upstream source; converters expect this |
| helix | TOML | already done |
| ghostty | TOML | ANSI-16 + UI; semantic mapping TBD (e.g. bright vs dark) |
| bat | tmTheme (XML) | TextMate scopes |
| opencode | tmTheme | uses tmTheme under the hood |

## Converters
All consume VSCode JSON. Compare implementations before choosing.

| Converter | Output | Notes |
|-----------|--------|-------|
| vscode_theme_converter | tmTheme + Ghostty + ANSI map | Python; most complete |
| json2tm | tmTheme | Rust; minimal |
| theme-converter | tmTheme | Rust; lib only |

## Strategy
1. Pull VSCodePopTheme as source artifact
2. Evaluate converters → produce tmTheme (bat, opencode) + Ghostty
3. Ghostty may need manual tuning (bright/dark semantics)

## Documents (TBD)
- `docs/source.md` — VSCodePopTheme + helix lineage
- `docs/ghostty.md` — ANSI mapping decisions
- `docs/bat.md` — tmTheme generation
- `docs/opencode.md` — tmTheme integration
