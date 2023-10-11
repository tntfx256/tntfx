import type { ColorScheme, PaletteColor, PaletteColorWithAlt, ThemeOptions } from "../types";
import { Colors } from "./colors";

type WithSchema = Record<ColorScheme, string>;
type RGBA = { alpha: number; blue: number; green: number; red: number };

export class Color {
  static alpha(color: string, alpha: number) {
    const parsed = parse(color);
    parsed.alpha = alpha;
    return toString(parsed);
  }

  static text(background: string, text: WithSchema): string {
    const { blue, green, red } = parse(background);

    let luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return luminance < 140 ? text.light : text.dark;
  }

  static combo(color: string, text: WithSchema): PaletteColor {
    const alpha = Color.alpha(color, 0.75);

    return {
      main: color,
      text: Color.text(color, text),
      alpha: {
        main: alpha,
        text: Color.text(alpha, text),
      },
    };
  }

  static comboWithAlt(color: string, altColor: string, text: WithSchema): PaletteColorWithAlt {
    const base = Color.combo(color, text);
    const alt = Color.combo(altColor, text);

    return { ...base, alt };
  }

  // static shades(color: string): Sizable<string> {
  //   const size = 8;
  //   const shades = {} as Sizable<string>;
  //   const { red, green, blue, alpha } = parse(color);

  //   const max = Math.max(red, green, blue, 1);
  //   const step = 256 / (max * size);

  //   Spacing.map((size, _, i) => {
  //     const stepSize = i * step;
  //     shades[size] = toString({
  //       alpha,
  //       blue: Math.floor(blue * stepSize),
  //       green: Math.floor(green * stepSize),
  //       red: Math.floor(red * stepSize),
  //     });
  //   });

  //   return shades;
  // }
}

function fromRGB(rawColor: string): RGBA {
  const [r, g, b, a = 1] = rawColor
    .split(",")
    .map((s) => s.trim())
    .map(Number);

  return { alpha: a, blue: b, green: g, red: r };
}

function fromHex(rawColor: string): RGBA {
  const regex = rawColor.length <= 4 ? /.{1}/g : /.{1,2}/g;
  const [r, g, b, a = 1] = (rawColor.match(regex) || ["0", "0", "0", "1"]).map((d) => Number.parseInt(d, 16));

  return { alpha: a, blue: b, green: g, red: r };
}

function parse(color: string): RGBA {
  color = color.toLowerCase();

  if (color.startsWith("rgba(")) {
    return fromRGB(color.replace("rgba(", "").replace(")", ""));
  }

  if (color.startsWith("rgb(")) {
    const code = color.replace("rgb(", "").replace(")", "");
    // check rgb(128 128 128 / 50%)
    if (code.includes("/")) {
      const [red, green, blue, alpha] = code
        .replace("%", "")
        .replace("/", " ")
        .split(/\s+/)
        .map((s) => +s.trim());
      return { alpha: alpha / 100, blue, green, red };
    }
    return fromRGB(code);
  }

  if (color.startsWith("#")) {
    return fromHex(color.replace("#", ""));
  }

  return { alpha: 1, blue: 0, green: 0, red: 0 };
}

function toString(color: RGBA): string {
  const alpha = Math.ceil(100 * color.alpha);
  return `rgb(${[color.red, color.green, color.blue].join(" ")} / ${alpha}%)`;
}

export function createThemePalette(palette: Required<ThemeOptions["palette"]>) {
  return {
    selected: Color.combo(palette.selected, palette.text),
    backdrop: Color.combo(Color.alpha(Colors.Black, 0.25), palette.text),
    body: Color.comboWithAlt(palette.body, palette.bodyAlt, palette.text),
    border: Color.combo(palette.border, palette.text),
    element: Color.comboWithAlt(palette.element, palette.elementAlt, palette.text),
    error: Color.combo(palette.error, palette.text),
    info: Color.combo(palette.info, palette.text),

    primary: Color.combo(palette.primary, palette.text),
    secondary: Color.combo(palette.secondary, palette.text),
    success: Color.combo(palette.success, palette.text),
    warning: Color.combo(palette.warning, palette.text),

    // shadow: Spacing.reduce((value) =>
    //   [
    //     `0px 0px ${2 * value}px ${value}px ${shadow}`,
    //     // `${index + 1}px ${index + 1}px ${4 * value}px ${2 * value}px ${shadow}`,
    //     // `${index + 2}px ${index + 2}px ${8 * value}px ${4 * value}px ${shadow}`,
    //   ].join(",")
    // ),
  };
}
