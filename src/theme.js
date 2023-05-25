import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#1D4ED8"
        },
        secondary: {
            main: "#5C5C5C"
        },

        textColor: {
            main: "#1e1e1e"
        },
        tertiary: {
            main: "#F5F6FF"
        },
        error: {
            main: red.A400
        },
        white: "#fff"
    },
    chips: {
        text: {
            red: "#B91C1C",
            warning: "#B45309",
            progress: "#1D4ED8",
            complete: "#15803D"
        },
        background: {
            red: "#FEF2F2",
            warning: "#FFFBEB",
            progress: "#EFF6FF",
            complete: "#F0FDF4"
        }
    },
    percentage: {
        main: {
            success: "#4CAF50",
            fifty: "#1D4ED8",
            half: "#1D4ED8",
            quarter: "#1D4ED8"
        },
        bg: {
            success: "#4CAF50",
            fifty: "#DBEAFE",
            half: "#DBEAFE",
            quarter: "#DBEAFE"
        }
    },
    spacing: (value) => value * 4,
    margin: {},
    letterSpacing: {
        main: "-0.011em"
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(",")
    },
    fontsize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 30,
        "4xl": 36,
        "5xl": 48,
        "6xl": 64,
        "7xl": 72,
        "8xl": 96
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 671,
            lg: 1152,
            xl: 1440,
            xxl: 1920
        }
    }
})

export default theme
