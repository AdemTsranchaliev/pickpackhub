import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HubOutlined from "@mui/icons-material/HubOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import EuroSymbol from "@mui/icons-material/Euro";
import { useI18n } from "../i18n/I18nContext.jsx";

const pillarIcons = [
  <HubOutlined key="h" sx={{ fontSize: 30 }} />,
  <HandshakeOutlined key="s" sx={{ fontSize: 30 }} />,
  <EuroSymbol key="e" sx={{ fontSize: 30 }} />,
];

export default function ValueProposition() {
  const { m } = useI18n();

  return (
    <Box
      id="why-us"
      sx={{
        py: { xs: 6, sm: 8, md: 11 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          display: { xs: "none", sm: "block" },
          bottom: -100,
          left: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,79,122,0.1), transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
          {m.why.overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.25rem" }, mb: 1, maxWidth: 720 }}>
          {m.why.title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520, mb: 3, fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.55 }}>
          {m.why.intro}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {m.why.pillars.map((p, i) => (
            <Grid item xs={12} md={4} key={p.title}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.25, sm: 3 },
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid rgba(7, 16, 24, 0.08)",
                  background: "linear-gradient(165deg, #FFFFFF 0%, #F4F7FB 100%)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
                  "@media (hover: hover) and (pointer: fine)": {
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 24px 60px rgba(7, 16, 24, 0.14)",
                    },
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: "-40%",
                    background: (theme) =>
                      `radial-gradient(circle at 80% 0%, ${alpha(theme.palette.secondary.main, 0.16)}, transparent 45%)`,
                    opacity: 0,
                    transition: "opacity 0.35s ease",
                  },
                  "@media (hover: hover)": { "&:hover::after": { opacity: 1 } },
                }}
              >
                <Box
                  sx={{
                    mb: 1.75,
                    width: 52,
                    height: 52,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    zIndex: 1,
                    color: "primary.main",
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}14, ${theme.palette.secondary.main}22)`,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                  }}
                >
                  {pillarIcons[i]}
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    fontWeight: 800,
                    fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  }}
                >
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ position: "relative", zIndex: 1, lineHeight: 1.55 }}>
                  {p.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
