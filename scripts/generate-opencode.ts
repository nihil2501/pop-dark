import { type HelixProp, type HelixTheme, type HelixValue, normalizeHelixValue, run } from "./lib/helix";
import { THEME_MAP } from "./lib/opencode";

const NONE = "none" as const;

function resolveColor(
  scopes: Record<string, HelixValue>,
  helix?: { scope: string; prop: HelixProp }
): string {
  if (!helix) return NONE;
  return normalizeHelixValue(scopes[helix.scope])[helix.prop] || NONE;
}

run("themes/opencode.json", ({ scopes, palette }: HelixTheme) => {
  const defs = Object.fromEntries(Object.entries(palette).sort(
    ([a], [b]) => a.localeCompare(b)
  ));

  const theme = Object.fromEntries(THEME_MAP.map(({ opencode, helix }) => {
    return [opencode, resolveColor(scopes, helix)];
  }));

  const json = { $schema: "https://opencode.ai/theme.json", defs, theme };
  return JSON.stringify(json, null, 2) + "\n";
});
