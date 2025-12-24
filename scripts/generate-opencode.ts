import { type HelixValue, parseHelixTheme } from "./lib/helix";
import { type Prop, FG, THEME_MAP } from "./lib/opencode";

const NONE = "none" as const;

function resolveColor(
  scopes: Record<string, HelixValue>,
  helix?: { scope: string; prop: Prop }
): string {
  if (!helix) return NONE;

  let value = scopes[helix.scope] || {};
  if (typeof value === "string") value = { [FG]: value };

  return value[helix.prop] || NONE;
}

async function main() {
  const inputPath = "themes/helix.toml";
  const outputPath = "themes/opencode.json";

  const { scopes, palette } = parseHelixTheme(
    await Bun.file(inputPath).text()
  );

  const defs = Object.fromEntries(Object.entries(palette).sort(
    ([a], [b]) => a.localeCompare(b)
  ));

  const theme = Object.fromEntries(THEME_MAP.map(({ opencode, helix }) => {
    return [opencode, resolveColor(scopes, helix)];
  }));

  const output = { $schema: "https://opencode.ai/theme.json", defs, theme };
  await Bun.write(outputPath, JSON.stringify(output, null, 2) + "\n");
}

main().catch(console.error);
