# opencode Theme

Custom JSON format for [opencode](https://github.com/sst/opencode) TUI.

**Output:** `themes/opencode.json`
**Generator:** `bun run scripts/generate-opencode.ts`

## Format

opencode uses a custom JSON theme format with a `defs` palette and 51 theme fields. Since pop-dark is dark-only, all theme values use the palette directly (no dark/light variants needed).

Reference: `vendor/tuis/opencode/packages/opencode/src/cli/cmd/tui/context/theme/opencode.json`

## Theme Structure

```json
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "bg": "#3E3B39",
    "text": "#DEDEDE",
    ...
  },
  "theme": {
    "background": "bg",
    "text": "text",
    ...
  }
}
```

## Helix → opencode Mapping

### UI Semantic (7)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `primary` | `ui.selection` bg | blueH |
| `secondary` | — | redL |
| `accent` | `ui.cursor` bg | orangeY |
| `error` | `error` fg | redE |
| `warning` | `warning` fg | orangeW |
| `success` | — | greenN |
| `info` | `info` fg | brownD |

### Text (3)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `text` | `ui.text` fg | greyT |
| `textMuted` | `comment` fg | greyC |
| `selectedListItemText` | `ui.background` bg | brownN |

### Background (3)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `background` | `ui.background` bg | brownN |
| `backgroundPanel` | `ui.window` bg | brownH |
| `backgroundElement` | `ui.cursorline` bg | brownH |

### Border (3)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `border` | `ui.window` fg | brownD |
| `borderActive` | `ui.selection` bg | blueH |
| `borderSubtle` | `ui.virtual` fg | brownV |

### Diff (12)

| opencode Field | Helix Source | Value |
|----------------|--------------|-------|
| `diffAdded` | `diff.plus` fg | #4dd44d |
| `diffRemoved` | `diff.minus` fg | #dd4d4d |
| `diffContext` | `diff.delta` fg | #4d4ddd |
| `diffHunkHeader` | `diff.delta` fg | #4d4ddd |
| `diffHighlightAdded` | `diff.plus` fg | #4dd44d |
| `diffHighlightRemoved` | `diff.minus` fg | #dd4d4d |
| `diffAddedBg` | — | brownH (or darker) |
| `diffRemovedBg` | — | brownH (or darker) |
| `diffContextBg` | `ui.background` bg | brownN |
| `diffLineNumber` | `ui.linenr` fg | greyL |
| `diffAddedLineNumberBg` | — | brownH |
| `diffRemovedLineNumberBg` | — | brownH |

### Markdown (14)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `markdownText` | `ui.text` fg | greyT |
| `markdownHeading` | `markup.heading` fg | greenN |
| `markdownLink` | `markup.link` fg | blueD |
| `markdownLinkText` | `markup.link.text` fg | blueN |
| `markdownCode` | `markup.raw.inline` fg | blueL |
| `markdownBlockQuote` | `markup.quote` fg | blueL |
| `markdownEmph` | — (italic modifier) | greyT |
| `markdownStrong` | — (bold modifier) | greyT |
| `markdownHorizontalRule` | `ui.virtual` fg | brownV |
| `markdownListItem` | `markup.list` fg | greenN |
| `markdownListEnumeration` | `markup.list` fg | greenN |
| `markdownImage` | `markup.link` fg | blueD |
| `markdownImageText` | `markup.link.text` fg | blueN |
| `markdownCodeBlock` | `markup.raw.block` fg | orangeH |

### Syntax (9)

| opencode Field | Helix Source | Palette |
|----------------|--------------|---------|
| `syntaxComment` | `comment` fg | greyC |
| `syntaxKeyword` | `keyword` fg | blueH |
| `syntaxFunction` | `function` fg | blueH |
| `syntaxVariable` | `variable` fg | greyT |
| `syntaxString` | `string` fg | greenN |
| `syntaxNumber` | `constant.numeric` fg | redH |
| `syntaxType` | `type` fg | redH |
| `syntaxOperator` | `operator` fg | orangeY |
| `syntaxPunctuation` | `punctuation` fg | blueL |

## Generator Implementation

The generator should:

1. Parse `themes/helix.toml` using `Bun.TOML.parse()`
2. Extract palette colors
3. Build the `defs` object from palette
4. Map helix scopes to opencode fields per the tables above
5. Output JSON to `themes/opencode.json`

## Installation

```bash
# Generate theme
bun run generate:opencode

# Install (global)
mkdir -p ~/.config/opencode/themes
cp themes/opencode.json ~/.config/opencode/themes/pop-dark.json

# Install (project-local)
mkdir -p .opencode/themes
cp themes/opencode.json .opencode/themes/pop-dark.json

# Use via /theme command or config
```
