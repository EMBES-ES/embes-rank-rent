import animate from 'tailwindcss-animate';

/**
 * EMBES · tailwind.config.mjs
 * Paleta, tipografía, bordes y transiciones de la marca EMBES.
 *
 * AVISO: los valores HSL de los tokens (--primary, --ring, --background, etc.)
 * son PLACEHOLDERS definidos en src/styles/global.css. Deben sustituirse por los
 * colores EXACTOS de la marca EMBES cuando se confirme la paleta corporativa.
 * @type {import('tailwindcss').Config}
 */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,tsx,ts,jsx,js,md,mdx}', './src/components/ui/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      // Bordes suavizados EMBES (rounded-md / rounded-lg).
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // Tipografías de sistema de alta legibilidad: 0 ms de red, LCP-friendly.
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      // Transiciones sutiles basadas en opacidad y transformaciones GPU.
      transitionTimingFunction: { embes: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { embes: '180ms' },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'fade-in': 'fade-in 180ms ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};
