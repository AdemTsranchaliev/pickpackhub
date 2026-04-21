import GlobalStyles from "@mui/material/GlobalStyles";

export default function AppGlobalStyles() {
  return (
    <GlobalStyles
      styles={(theme) => ({
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::selection": {
          backgroundColor: "rgba(56, 189, 248, 0.28)",
          color: theme.palette.primary.dark,
        },
        "@keyframes ps-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1.5deg)" },
        },
        "@keyframes ps-float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(12px, -10px) scale(1.03)" },
          "66%": { transform: "translate(-8px, 6px) scale(0.98)" },
        },
        "@keyframes ps-gradient": {
          "0%": { opacity: 0.55 },
          "50%": { opacity: 0.95 },
          "100%": { opacity: 0.55 },
        },
        "@keyframes ps-fade-up": {
          from: { opacity: 0, transform: "translateY(28px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      })}
    />
  );
}
