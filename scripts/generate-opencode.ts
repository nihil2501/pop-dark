/**
 * Generate opencode theme JSON from Helix theme
 *
 * Converts themes/helix.toml to themes/opencode.json
 *
 * Usage: bun run scripts/generate-opencode.ts
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface HelixStyle {
  fg?: string;
  bg?: string;
  modifiers?: string[];
}

type HelixValue = string | HelixStyle;

interface HelixTheme {
  palette: Record<string, string>;
  [scope: string]: HelixValue | Record<string, string>;
}

interface OpenCodeTheme {
  $schema: string;
  defs: Record<string, string>;
  theme: Record<string, string>;
}

// -----------------------------------------------------------------------------
// Theme Mapping: opencode field -> helix source
// -----------------------------------------------------------------------------

interface ThemeMapping {
  scope?: string; // helix scope to read from
  prop?: "fg" | "bg"; // which property (default: fg)
  fallback: string; // palette reference or hex value
}

// opencode field -> { helix scope, property, fallback }
const THEME_MAP: Record<string, ThemeMapping> = {
  // UI Semantic (7)
  primary: { scope: "ui.selection", prop: "bg", fallback: "blueH" },
  secondary: { fallback: "redL" },
  accent: { scope: "ui.cursor", prop: "bg", fallback: "orangeY" },
  error: { scope: "error", prop: "fg", fallback: "redE" },
  warning: { scope: "warning", prop: "fg", fallback: "orangeW" },
  success: { fallback: "greenN" },
  info: { scope: "info", prop: "fg", fallback: "brownD" },

  // Text (3)
  text: { scope: "ui.text", prop: "fg", fallback: "greyT" },
  textMuted: { scope: "comment", prop: "fg", fallback: "greyC" },
  selectedListItemText: { scope: "ui.background", prop: "bg", fallback: "brownN" },

  // Background (3)
  background: { scope: "ui.background", prop: "bg", fallback: "brownN" },
  backgroundPanel: { scope: "ui.window", prop: "bg", fallback: "brownH" },
  backgroundElement: { scope: "ui.cursorline", prop: "bg", fallback: "brownH" },

  // Border (3)
  border: { scope: "ui.window", prop: "fg", fallback: "brownD" },
  borderActive: { scope: "ui.selection", prop: "bg", fallback: "blueH" },
  borderSubtle: { scope: "ui.virtual", prop: "fg", fallback: "brownV" },

  // Diff (12)
  diffAdded: { scope: "diff.plus", prop: "fg", fallback: "#4dd44d" },
  diffRemoved: { scope: "diff.minus", prop: "fg", fallback: "#dd4d4d" },
  diffContext: { scope: "diff.delta", prop: "fg", fallback: "#4d4ddd" },
  diffHunkHeader: { scope: "diff.delta", prop: "fg", fallback: "#4d4ddd" },
  diffHighlightAdded: { scope: "diff.plus", prop: "fg", fallback: "#4dd44d" },
  diffHighlightRemoved: { scope: "diff.minus", prop: "fg", fallback: "#dd4d4d" },
  diffAddedBg: { fallback: "brownH" },
  diffRemovedBg: { fallback: "brownH" },
  diffContextBg: { scope: "ui.background", prop: "bg", fallback: "brownN" },
  diffLineNumber: { scope: "ui.linenr", prop: "fg", fallback: "greyL" },
  diffAddedLineNumberBg: { fallback: "brownH" },
  diffRemovedLineNumberBg: { fallback: "brownH" },

  // Markdown (14)
  markdownText: { scope: "ui.text", prop: "fg", fallback: "greyT" },
  markdownHeading: { scope: "markup.heading", prop: "fg", fallback: "greenN" },
  markdownLink: { scope: "markup.link", prop: "fg", fallback: "blueD" },
  markdownLinkText: { scope: "markup.link.text", prop: "fg", fallback: "blueN" },
  markdownCode: { scope: "markup.raw.inline", prop: "fg", fallback: "blueL" },
  markdownBlockQuote: { scope: "markup.quote", prop: "fg", fallback: "blueL" },
  markdownEmph: { fallback: "greyT" },
  markdownStrong: { fallback: "greyT" },
  markdownHorizontalRule: { scope: "ui.virtual", prop: "fg", fallback: "brownV" },
  markdownListItem: { scope: "markup.list", prop: "fg", fallback: "greenN" },
  markdownListEnumeration: { scope: "markup.list", prop: "fg", fallback: "greenN" },
  markdownImage: { scope: "markup.link", prop: "fg", fallback: "blueD" },
  markdownImageText: { scope: "markup.link.text", prop: "fg", fallback: "blueN" },
  markdownCodeBlock: { scope: "markup.raw.block", prop: "fg", fallback: "orangeH" },

  // Syntax (9)
  syntaxComment: { scope: "comment", prop: "fg", fallback: "greyC" },
  syntaxKeyword: { scope: "keyword", prop: "fg", fallback: "blueH" },
  syntaxFunction: { scope: "function", prop: "fg", fallback: "blueH" },
  syntaxVariable: { scope: "variable", prop: "fg", fallback: "greyT" },
  syntaxString: { scope: "string", prop: "fg", fallback: "greenN" },
  syntaxNumber: { scope: "constant.numeric", prop: "fg", fallback: "redH" },
  syntaxType: { scope: "type", prop: "fg", fallback: "redH" },
  syntaxOperator: { scope: "operator", prop: "fg", fallback: "orangeY" },
  syntaxPunctuation: { scope: "punctuation", prop: "fg", fallback: "blueL" },
};

// -----------------------------------------------------------------------------
// Parsing
// -----------------------------------------------------------------------------

function parseHelixTheme(tomlContent: string): HelixTheme {
  return Bun.TOML.parse(tomlContent) as HelixTheme;
}

// -----------------------------------------------------------------------------
// Value Extraction
// -----------------------------------------------------------------------------

function getHelixValue(
  theme: HelixTheme,
  scope: string,
  prop: "fg" | "bg"
): string | undefined {
  const value = theme[scope];
  if (!value) return undefined;

  // Skip palette object
  if (typeof value === "object" && "palette" in value) return undefined;

  // Simple string value (color reference for fg)
  if (typeof value === "string") {
    return prop === "fg" ? value : undefined;
  }

  // Object with fg/bg
  return value[prop];
}

function isHexColor(value: string): boolean {
  return value.startsWith("#");
}

// -----------------------------------------------------------------------------
// Theme Building
// -----------------------------------------------------------------------------

function buildDefs(palette: Record<string, string>): Record<string, string> {
  // Copy palette as-is, sorted for stability
  const defs: Record<string, string> = {};
  const sortedKeys = Object.keys(palette).sort((a, b) => a.localeCompare(b));

  for (const key of sortedKeys) {
    defs[key] = palette[key]!;
  }

  return defs;
}

function buildTheme(
  helixTheme: HelixTheme,
  palette: Record<string, string>
): Record<string, string> {
  const theme: Record<string, string> = {};

  // Sort fields for stable output
  const sortedFields = Object.keys(THEME_MAP).sort((a, b) =>
    a.localeCompare(b)
  );

  for (const field of sortedFields) {
    const mapping = THEME_MAP[field]!;
    let value: string | undefined;

    // Try to get value from helix theme
    if (mapping.scope) {
      value = getHelixValue(helixTheme, mapping.scope, mapping.prop ?? "fg");
    }

    // Use fallback if no value found
    if (!value) {
      value = mapping.fallback;
    }

    // If value is a hex color, use it directly
    // If value is a palette reference, verify it exists
    if (!isHexColor(value) && !palette[value]) {
      console.warn(
        `Warning: ${field} references unknown palette color: ${value}`
      );
    }

    theme[field] = value;
  }

  return theme;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  const inputPath = "themes/helix.toml";
  const outputPath = "themes/opencode.json";

  console.log(`Reading ${inputPath}...`);
  const tomlContent = await Bun.file(inputPath).text();

  console.log("Parsing Helix theme...");
  const helixTheme = parseHelixTheme(tomlContent);
  const palette = helixTheme.palette;

  console.log(`Found ${Object.keys(palette).length} palette colors`);

  console.log("Building defs...");
  const defs = buildDefs(palette);

  console.log("Building theme...");
  const theme = buildTheme(helixTheme, palette);
  console.log(`Mapped ${Object.keys(theme).length} theme fields`);

  const output: OpenCodeTheme = {
    $schema: "https://opencode.ai/theme.json",
    defs,
    theme,
  };

  console.log(`Writing ${outputPath}...`);
  await Bun.write(outputPath, JSON.stringify(output, null, 2) + "\n");

  console.log("Done!");
}

main().catch(console.error);
