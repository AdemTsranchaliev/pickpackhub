import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import CampaignOutlined from "@mui/icons-material/CampaignOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";

const phaseIcons = [<CampaignOutlined key="c" />, <HandshakeOutlined key="h" />, <PublicOutlined key="p" />];

export default function Launch() {
  const { m } = useI18n();

  return (
    <Box id="launch" sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
          {m.launch.overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.15rem" }, mb: { xs: 2.5, md: 3 } }}>
          {m.launch.title}
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={0}>
              {m.launch.phases.map((p, i) => (
                <Box
                  key={p.title}
                  sx={{
                    display: "flex",
                    gap: { xs: 1.5, sm: 2 },
                    pb: i < m.launch.phases.length - 1 ? { xs: 2, sm: 2.5 } : 0,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row", sm: "column", alignItems: "center", flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: { xs: 42, sm: 46 },
                        height: { xs: 42, sm: 46 },
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: "secondary.main",
                        color: "secondary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "background.paper",
                      }}
                    >
                      {phaseIcons[i]}
                    </Box>
                    {i < m.launch.phases.length - 1 ? (
                      <Box
                        sx={{
                          display: { xs: "none", sm: "block" },
                          width: 2,
                          flexGrow: 1,
                          minHeight: 20,
                          bgcolor: "divider",
                          my: 0.5,
                          mx: "auto",
                        }}
                      />
                    ) : null}
                  </Box>
                  <Box sx={{ pb: 0.5, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      {p.period}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: { xs: "1.02rem", sm: "1.12rem" } }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {p.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "primary.light",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1.05rem", sm: "1.12rem" } }}>
                {m.launch.month1Title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.5 }}>
                {m.launch.month1Intro}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary" }}>
                {m.launch.month1List.map((t) => (
                  <Typography component="li" variant="body2" key={t} sx={{ mb: 0.5, lineHeight: 1.45 }}>
                    {t}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
