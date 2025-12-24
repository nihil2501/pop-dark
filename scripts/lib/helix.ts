/**
 * Helix theme types and parsing utilities
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface HelixStyle {
  fg?: string;
  bg?: string;
  modifiers?: string[];
  underline?: { color?: string; style?: string };
}

export type HelixValue = string | HelixStyle;

export interface HelixTheme {
  palette: Record<string, string>;
  scopes: Record<string, HelixValue>;
}

// -----------------------------------------------------------------------------
// Parsing
// -----------------------------------------------------------------------------

export function parseHelixTheme(tomlContent: string): HelixTheme {
  const parsed = Bun.TOML.parse(tomlContent) as any;

  // Extract palette and move everything else to scopes
  const { palette = {}, ...scopes } = parsed;

  return {
    palette,
    scopes,
  };
}
