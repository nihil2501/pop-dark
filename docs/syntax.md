# Syntax Scope Mapping

This document defines the semantic mapping from tmTheme scopes to Helix theme concepts.

The tmTheme format (TextMate themes) is used by bat, opencode, Sublime Text, and other syntax highlighters.

## Global Settings

These apply to the editor/viewer as a whole, not to specific syntax tokens.

| tmTheme Setting | Semantic Meaning | Helix Scope |
|-----------------|------------------|-------------|
| `background` | Editor background | `ui.background` bg |
| `foreground` | Default text | `ui.text` fg |
| `caret` | Cursor color | `ui.cursor` bg |
| `selection` | Selection background | `ui.selection` bg |
| `lineHighlight` | Current line background | `ui.cursorline` bg |
| `gutterForeground` | Line number color | `ui.linenr` fg |

## Token Scopes

### Direct Mappings

These Helix scopes map directly to tmTheme with identical or nearly identical names:

| tmTheme Scope | Helix Scope |
|---------------|-------------|
| `comment` | `comment` |
| `comment.line` | `comment.line` |
| `comment.block` | `comment.block` |
| `comment.block.documentation` | `comment.block.documentation` |
| `string` | `string` |
| `string.regexp` | `string.regexp` |
| `constant` | `constant` |
| `constant.numeric` | `constant.numeric` |
| `constant.character` | `constant.character` |
| `constant.character.escape` | `constant.character.escape` |
| `variable` | `variable` |
| `variable.parameter` | `variable.parameter` |
| `keyword` | `keyword` |
| `keyword.control` | `keyword.control` |
| `keyword.operator` | `keyword.operator` |
| `operator` | `operator` |
| `punctuation` | `punctuation` |
| `markup.heading` | `markup.heading` |
| `markup.bold` | `markup.bold` |
| `markup.italic` | `markup.italic` |
| `markup.strikethrough` | `markup.strikethrough` |
| `markup.quote` | `markup.quote` |
| `markup.raw` | `markup.raw` |
| `markup.list` | `markup.list` |

### Translated Mappings

These require translation between Helix tree-sitter scopes and tmTheme conventions:

| tmTheme Scope | Helix Scope | Notes |
|---------------|-------------|-------|
| `entity.name.function` | `function` | Function definitions |
| `entity.name.function.method` | `function.method` | Method definitions |
| `entity.name.function.macro` | `function.macro` | Macro definitions |
| `entity.name.function.constructor` | `constructor` | Constructors |
| `support.function` | `function.builtin` | Built-in functions |
| `entity.name.type` | `type` | Type definitions |
| `support.type` | `type.builtin` | Built-in types |
| `entity.name.type.enum` | `type.enum.variant` | Enum variants |
| `entity.name.tag` | `tag` | HTML/XML tags |
| `entity.other.attribute-name` | `attribute` | HTML/XML attributes |
| `entity.name.namespace` | `namespace` | Namespaces |
| `entity.name.module` | `module` | Modules |
| `entity.name.label` | `label` | Labels |
| `variable.language` | `variable.builtin` | Built-in variables (self, this) |
| `variable.other.member` | `variable.other.member` | Member variables |
| `variable.function` | `variable.function` | Function references |
| `constant.language` | `constant.builtin` | Built-in constants (true, false, nil) |
| `constant.other.symbol` | `string.special.symbol` | Symbols/atoms |
| `string.other` | `string.special` | Special strings |
| `string.other.link` | `string.special.url` | URLs |
| `storage.type.function` | `keyword.function` | fn, func, def |
| `keyword.other.directive` | `keyword.directive` | Preprocessor directives |
| `keyword.control.loop` | `keyword.control.repeat` | Loop keywords |
| `keyword.control.import` | `keyword.control.import` | Import/use statements |
| `keyword.control.return` | `keyword.control.return` | Return statements |
| `keyword.control.exception` | `keyword.control.exception` | Exception handling |
| `keyword.other` | `special` | Special keywords |
| `punctuation.separator` | `punctuation.delimiter` | Delimiters (, ; :) |
| `punctuation.bracket` | `punctuation.bracket` | Brackets ({} [] ()) |

### Markup Extensions

For markdown and documentation:

| tmTheme Scope | Helix Scope |
|---------------|-------------|
| `markup.heading.1` | `markup.heading.1` |
| `markup.heading.2` | `markup.heading.2` |
| `markup.heading.3` | `markup.heading.3` |
| `markup.heading.4` | `markup.heading.4` |
| `markup.heading.5` | `markup.heading.5` |
| `markup.heading.6` | `markup.heading.6` |
| `markup.link` | `markup.link` |
| `markup.link.url` | `markup.link.url` |
| `markup.list.numbered` | `markup.list.numbered` |
| `markup.list.unnumbered` | `markup.list.unnumbered` |
| `markup.raw.inline` | `markup.raw.inline` |
| `markup.raw.block` | `markup.raw.block` |

### Diff/VCS

| tmTheme Scope | Helix Scope |
|---------------|-------------|
| `markup.inserted` | `diff.plus` |
| `markup.deleted` | `diff.minus` |
| `markup.changed` | `diff.delta` |

## Helix-Only Scopes

These Helix scopes have no tmTheme equivalent (editor UI, not syntax):

- `ui.*` — Editor UI elements
- `diagnostic.*` — LSP diagnostics
- `error`, `warning`, `hint`, `info` — Gutter indicators

## Font Styles

Helix modifiers map to tmTheme `fontStyle`:

| Helix Modifier | tmTheme fontStyle |
|----------------|-------------------|
| `bold` | `bold` |
| `italic` | `italic` |
| `underline` | `underline` |
| `crossed_out` | `strikethrough` |

Multiple modifiers combine: `bold italic` → `"bold italic"`

## Generator Usage

A generator script will read this mapping and `themes/helix.toml` to produce tmTheme files for bat, opencode, and other tools.
