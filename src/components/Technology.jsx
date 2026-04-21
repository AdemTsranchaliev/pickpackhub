import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloudSyncOutlined from "@mui/icons-material/CloudSyncOutlined";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";

const cardSx = {
  height: "100%",
  borderRadius: 3,
  border: "1px solid rgba(7, 16, 24, 0.08)",
  bgcolor: "background.paper",
  overflow: "hidden",
  position: "relative",
  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.25s ease",
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: (theme) => `0 22px 55px ${alpha(theme.palette.primary.main, 0.12)}`,
      borderColor: (theme) => alpha(theme.palette.secondary.main, 0.38),
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    opacity: 0.95,
    background: (theme) =>
      `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  },
};

export default function Technology() {
  const { m } = useI18n();

  return (
    <Box id="technology" sx={{ py: { xs: 6, sm: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
          {m.technology.overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.25rem" }, mb: 1, maxWidth: 720 }}>
          {m.technology.title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520, mb: 3, fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.55 }}>
          {m.technology.intro}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={cardSx}>
              <CardContent sx={{ p: { xs: 2.25, sm: 3 } }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.75 }} flexWrap="wrap" useFlexGap>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                    }}
                  >
                    <CloudSyncOutlined fontSize="medium" />
                  </Box>
                  <Chip label={m.technology.chipStart} color="secondary" size="small" sx={{ fontWeight: 700 }} />
                </Stack>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                  {m.technology.omsTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                  {m.technology.omsBody}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={cardSx}>
              <CardContent sx={{ p: { xs: 2.25, sm: 3 } }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.75 }} flexWrap="wrap" useFlexGap>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                    }}
                  >
                    <DashboardCustomizeOutlined fontSize="medium" />
                  </Box>
                  <Chip label={m.technology.chipScale} variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                </Stack>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                  {m.technology.customTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                  {m.technology.customBody}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
