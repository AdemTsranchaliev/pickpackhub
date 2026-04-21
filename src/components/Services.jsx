import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlined from "@mui/icons-material/AssignmentReturnOutlined";
import IntegrationInstructionsOutlined from "@mui/icons-material/IntegrationInstructionsOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";

const icons = [
  <Inventory2Outlined key="i" sx={{ fontSize: 34 }} />,
  <LocalShippingOutlined key="l" sx={{ fontSize: 34 }} />,
  <AssignmentReturnOutlined key="a" sx={{ fontSize: 34 }} />,
  <IntegrationInstructionsOutlined key="n" sx={{ fontSize: 34 }} />,
  <AutoAwesomeOutlined key="w" sx={{ fontSize: 34 }} />,
];

export default function Services() {
  const { m } = useI18n();

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 6, sm: 8, md: 11 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          display: { xs: "none", md: "block" },
          top: 80,
          right: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.16), transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
          {m.services.overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.25rem" }, mb: 1, maxWidth: 640 }}>
          {m.services.title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 560, mb: 3, fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.55 }}>
          {m.services.intro}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {m.services.list.map((s, idx) => (
            <Grid item xs={12} md={6} key={s.title}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid rgba(7, 16, 24, 0.08)",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #FAFBFD 100%)",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.25s ease",
                  "@media (hover: hover) and (pointer: fine)": {
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 50px rgba(7, 16, 24, 0.12)",
                      borderColor: (theme) => alpha(theme.palette.secondary.main, 0.45),
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    opacity: 0.9,
                    background: (theme) =>
                      `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.25, sm: 3 } }}>
                  <Box
                    sx={{
                      mb: 1.75,
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      color: "primary.main",
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                    }}
                  >
                    {icons[idx]}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                    {s.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {s.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
