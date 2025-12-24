export const FG = "fg" as const;
export const BG = "bg" as const;

export type HelixProp = typeof FG | typeof BG;

type HelixColors = { [K in HelixProp]?: string };

export type HelixStyle = HelixColors & {
  modifiers?: string[];
  underline?: { color?: string; style?: string };
};

export type HelixValue = string | HelixStyle;

export interface HelixTheme {
  palette: Record<string, string>;
  scopes: Record<string, HelixValue>;
}

export function normalizeHelixValue(value: HelixValue | undefined): HelixStyle {
  if (typeof value === "string") return { [FG]: value };
  return value || {};
}

export function parseHelixTheme(tomlContent: string): HelixTheme {
  const parsed = Bun.TOML.parse(tomlContent) as any;
  const { palette = {}, ...scopes } = parsed;
  return { palette, scopes };
}

export async function loadHelixTheme(path = "themes/helix.toml"): Promise<HelixTheme> {
  return parseHelixTheme(await Bun.file(path).text());
}

export type Generate = (theme: HelixTheme) => string;

export async function run(
  outputPath: string,
  generate: (theme: HelixTheme) => string
) {
  const theme = await loadHelixTheme("themes/helix.toml");
  const content = generate(theme);
  await Bun.write(outputPath, content);
}
