import { Box, Container, Grid, Typography, Paper, Stack } from "@mui/material";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Operations() {
  const { m } = useI18n();

  return (
    <Box id="operations" sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>
          {m.operations.overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.15rem" }, mb: 1 }}>
          {m.operations.title}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520, mb: 3, lineHeight: 1.55, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
          {m.operations.intro}
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1.05rem", sm: "1.15rem" } }}>
                {m.operations.warehouseTitle}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary" }}>
                {m.operations.layoutItems.map((t) => (
                  <Typography component="li" variant="body2" key={t} sx={{ mb: 0.75, lineHeight: 1.5 }}>
                    {t}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1.05rem", sm: "1.15rem" } }}>
              {m.operations.orderFlowTitle}
            </Typography>
            <Stack spacing={1.25}>
              {m.operations.orderSteps.map((s, i) => (
                <Paper
                  key={s.label}
                  variant="outlined"
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    display: "flex",
                    gap: { xs: 1.25, sm: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 34,
                      height: 34,
                      borderRadius: "50%",
                      bgcolor: "secondary.main",
                      color: "primary.dark",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700}>{s.label}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.45 }}>
                      {s.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
            <Paper sx={{ mt: 2.5, p: { xs: 2, sm: 2.5 }, bgcolor: "primary.dark", color: "common.white", borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {m.operations.returnsTitle}
              </Typography>
              <Box component="ol" sx={{ m: 0, pl: 2.25, opacity: 0.95 }}>
                {m.operations.returnSteps.map((t) => (
                  <Typography component="li" variant="body2" key={t} sx={{ mb: 0.5, lineHeight: 1.45 }}>
                    {t}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
