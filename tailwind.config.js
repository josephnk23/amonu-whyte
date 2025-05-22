module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elfridaqodeinteractivecomalto: "var(--elfridaqodeinteractivecomalto)",
        "elfridaqodeinteractivecomblack-black":
          "var(--elfridaqodeinteractivecomblack-black)",
        "elfridaqodeinteractivecomcod-gray":
          "var(--elfridaqodeinteractivecomcod-gray)",
        "elfridaqodeinteractivecomcutty-sark":
          "var(--elfridaqodeinteractivecomcutty-sark)",
        "elfridaqodeinteractivecomdove-gray":
          "var(--elfridaqodeinteractivecomdove-gray)",
        elfridaqodeinteractivecomgallery:
          "var(--elfridaqodeinteractivecomgallery)",
        "elfridaqodeinteractivecommine-shaft":
          "var(--elfridaqodeinteractivecommine-shaft)",
        elfridaqodeinteractivecomsilver:
          "var(--elfridaqodeinteractivecomsilver)",
        "elfridaqodeinteractivecomspring-wood":
          "var(--elfridaqodeinteractivecomspring-wood)",
        elfridaqodeinteractivecomtundora:
          "var(--elfridaqodeinteractivecomtundora)",
        "elfridaqodeinteractivecomwhite-white":
          "var(--elfridaqodeinteractivecomwhite-white)",
        elfridaqodeinteractivecomwoodsmoke:
          "var(--elfridaqodeinteractivecomwoodsmoke)",
        wwwmacofalltradescomblack: "var(--wwwmacofalltradescomblack)",
        "wwwmacofalltradescommine-shaft":
          "var(--wwwmacofalltradescommine-shaft)",
        wwwmacofalltradescomwhite: "var(--wwwmacofalltradescomwhite)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "elfrida-qodeinteractive-com-bona-nova-bold":
          "var(--elfrida-qodeinteractive-com-bona-nova-bold-font-family)",
        "elfrida-qodeinteractive-com-DM-sans-9pt-regular":
          "var(--elfrida-qodeinteractive-com-DM-sans-9pt-regular-font-family)",
        "elfrida-qodeinteractive-com-outfit-regular":
          "var(--elfrida-qodeinteractive-com-outfit-regular-font-family)",
        "elfrida-qodeinteractive-com-outfit-regular-upper":
          "var(--elfrida-qodeinteractive-com-outfit-regular-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-heading-2-upper":
          "var(--elfrida-qodeinteractive-com-semantic-heading-2-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-heading-3-upper":
          "var(--elfrida-qodeinteractive-com-semantic-heading-3-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-heading-4-upper":
          "var(--elfrida-qodeinteractive-com-semantic-heading-4-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-heading-5-upper":
          "var(--elfrida-qodeinteractive-com-semantic-heading-5-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-heading-6-upper":
          "var(--elfrida-qodeinteractive-com-semantic-heading-6-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-input":
          "var(--elfrida-qodeinteractive-com-semantic-input-font-family)",
        "elfrida-qodeinteractive-com-semantic-label-upper":
          "var(--elfrida-qodeinteractive-com-semantic-label-upper-font-family)",
        "elfrida-qodeinteractive-com-semantic-link":
          "var(--elfrida-qodeinteractive-com-semantic-link-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
