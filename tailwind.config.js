/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./presentation/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                spotify: {
                    green: "#1DB954",
                    "green-light": "#1ED760",
                    "green-dark": "#1AA34A",
                    black: "#121212",
                    "dark-base": "#121212",
                    "dark-elevated": "#1A1A1A",
                    "dark-surface": "#242424",
                    "dark-highlight": "#2A2A2A",
                    "dark-card": "#181818",
                    white: "#FFFFFF",
                    "light-gray": "#B3B3B3",
                    "medium-gray": "#535353",
                    "dark-gray": "#282828",
                    subdued: "#A7A7A7",
                },
            },
            fontFamily: {
                sans: ["System"],
            },
        },
    },
    plugins: [],
};
