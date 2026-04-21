import { Box, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Market() {
  const { m, locale } = useI18n();
  const isTr = locale === "tr";
  const panelIntro = isTr ? m.market.turkeyIntro : m.market.regionalIntro;
  const panelPoints = isTr ? m.market.turkeyPoints : m.market.regionalPoints;
  const panelFocusTitle = isTr ? m.market.focusTitle : m.market.regionalFocusTitle;

  return (
    <Box id="market" sx={{ py: { xs: 6, sm: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
              {m.market.overline}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.15rem" }, mb: 1.5 }}>
              {m.market.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.55, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
              {m.market.intro}
            </Typography>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {m.market.segments.map((s) => (
                <Grid item xs={12} key={s.title}>
                  <Box
                    sx={{
                      p: { xs: 1.75, sm: 2 },
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      gap: 1.5,
                      alignItems: "flex-start",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <StorefrontOutlined color="secondary" sx={{ flexShrink: 0 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {s.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {s.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 2.25, sm: 3 },
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "common.white",
                height: "100%",
              }}
            >
              <StackedHeader focusTitle={panelFocusTitle} m={m} />
              <Typography variant="body2" sx={{ opacity: 0.92, mb: 2, lineHeight: 1.55 }}>
                {panelIntro}
              </Typography>
              <List dense sx={{ py: 0 }}>
                {panelPoints.map((pt, idx) => (
                  <ListItem key={idx} disableGutters sx={{ alignItems: "flex-start", py: 0.4 }}>
                    <ListItemIcon sx={{ color: "secondary.main", minWidth: 30, mt: 0.2 }}>
                      <CheckCircleOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={pt}
                      primaryTypographyProps={{ variant: "body2", sx: { color: "common.white", lineHeight: 1.45 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function StackedHeader({ m, focusTitle }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2, flexDirection: { xs: "column", sm: "row" } }}>
      <PublicOutlined sx={{ color: "secondary.main", flexShrink: 0 }} />
      <Box>
        <Typography variant="overline" sx={{ color: "secondary.main", letterSpacing: 1, fontWeight: 700 }}>
          {m.market.focusOverline}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.05rem", sm: "1.25rem" }, lineHeight: 1.3 }}>
          {focusTitle}
        </Typography>
      </Box>
    </Box>
  );
}
