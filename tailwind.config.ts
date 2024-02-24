import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        shimmer: "shimmer 3s ease infinite",
      },
      keyframes: {
        shimmer: {
          "0%,100%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
