import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Flag from "@mui/icons-material/Flag";
import SupportAgent from "@mui/icons-material/SupportAgent";
import HomeWork from "@mui/icons-material/HomeWork";
import { useI18n } from "../i18n/I18nContext.jsx";

const tileIcons = [<HomeWork key="h" color="primary" sx={{ mb: 1 }} />, <SupportAgent key="s" color="primary" sx={{ mb: 1 }} />, <Flag key="f" color="primary" sx={{ mb: 1 }} />];

export default function About() {
  const { m } = useI18n();

  return (
    <Box id="about" sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
              {m.about.overline}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.15rem" }, mb: 2 }}>
              {m.about.title}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.6 }}>
              {m.about.body}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {m.about.tiles.map((tile, i) => (
                <Grid item xs={12} sm={4} key={tile.title}>
                  <Paper sx={{ p: { xs: 2, sm: 2.5 }, height: "100%", borderRadius: 2, border: "1px solid rgba(13,148,136,0.12)" }}>
                    {tileIcons[i]}
                    <Typography variant="h6" gutterBottom sx={{ fontSize: "1.05rem" }}>
                      {tile.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                      {tile.body}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                p: { xs: 2, sm: 2.5 },
                borderLeft: 4,
                borderColor: "secondary.main",
                bgcolor: "primary.main",
                color: "common.white",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {m.about.promiseTitle}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95, lineHeight: 1.55 }}>
                {m.about.promiseBody}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box
          component="section"
          aria-labelledby="about-trust-heading"
          sx={{
            mt: { xs: 5, sm: 6, md: 8 },
            pt: { xs: 4, md: 5 },
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5, display: "block" }}>
            {m.about.trustOverline}
          </Typography>
          <Typography
            id="about-trust-heading"
            variant="h2"
            sx={{ fontSize: { xs: "1.35rem", sm: "1.55rem", md: "1.75rem" }, mb: 1.5, mt: 0.5 }}
          >
            {m.about.trustTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" }, lineHeight: 1.55, maxWidth: 720, mb: 3 }}>
            {m.about.trustCaption}
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {m.about.trustPhotos.map((ph) => (
              <Grid item xs={12} sm={4} key={ph.src}>
                <Box
                  component="figure"
                  sx={{
                    m: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "grey.100",
                  }}
                >
                  <Box
                    component="img"
                    src={ph.src}
                    alt={ph.alt}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
