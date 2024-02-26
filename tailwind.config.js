const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("daisyui"), nextui()],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#00B4EC",

                    secondary: "#317DBA",

                    accent: "#E2812B",

                    neutral: "#F9F9F9",

                    "base-100": "#FFFFFF",

                    info: "#00c5ff",

                    success: "#1DAE1A",

                    warning: "#9d6300",

                    error: "#D00606",
                },
            },
        ],
    },
};
