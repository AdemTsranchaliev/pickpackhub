import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import Public from "@mui/icons-material/Public";
import HubOutlined from "@mui/icons-material/HubOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { m } = useI18n();
  const stats = m.hero.stats;

  return (
    <Box
      sx={{
        position: "relative",
        mt: { xs: -7, sm: -8, md: -9 },
        pt: { xs: 12, sm: 14, md: 19 },
        pb: { xs: 8, sm: 10, md: 14 },
        overflow: "hidden",
        color: "common.white",
        background: "linear-gradient(155deg, #071a2e 0%, #0c3557 38%, #134e7a 68%, #0e5c73 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.11,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: { xs: "32px 32px", sm: "40px 40px", md: "48px 48px" },
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 22%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 22%, transparent 76%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: 220, sm: 280, md: 420 },
          height: { xs: 220, sm: 280, md: 420 },
          borderRadius: "50%",
          top: { xs: "-10%", md: "-12%" },
          right: { xs: "-35%", sm: "-25%", md: "-8%" },
          background: "radial-gradient(circle, rgba(245,158,11,0.38) 0%, transparent 70%)",
          filter: "blur(4px)",
          animation: "ps-float 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: 260, sm: 320, md: 520 },
          height: { xs: 260, sm: 320, md: 520 },
          borderRadius: "50%",
          bottom: { xs: "-35%", md: "-25%" },
          left: { xs: "-50%", sm: "-40%", md: "-18%" },
          background: "radial-gradient(circle, rgba(56,189,248,0.38) 0%, transparent 68%)",
          filter: "blur(2px)",
          animation: "ps-float-slow 14s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 72% 48% at 72% 8%, rgba(255,255,255,0.09), transparent 56%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ mb: { xs: 2, sm: 2.5 }, gap: 1, animation: "ps-fade-up 0.7s ease-out both" }}
            >
              <Chip
                icon={<BoltOutlined sx={{ color: "#0c3557 !important" }} />}
                label={m.hero.chipProcess}
                sx={{
                  bgcolor: "secondary.main",
                  color: "primary.dark",
                  fontWeight: 700,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.35)",
                }}
              />
              <Chip
                icon={<Public sx={{ color: "secondary.light !important" }} />}
                label={m.hero.chip3pl}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "common.white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              />
              <Chip
                icon={<HubOutlined sx={{ color: "secondary.light !important" }} />}
                label={m.hero.chipChannels}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "common.white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              />
            </Stack>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "1.85rem", sm: "2.35rem", md: "3.15rem", lg: "3.45rem" },
                mb: { xs: 1.5, sm: 2 },
                animation: "ps-fade-up 0.75s ease-out 0.08s both",
              }}
            >
              {m.hero.titleBefore ? `${m.hero.titleBefore} ` : ""}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(105deg, #ffffff 0%, #7dd3fc 42%, #fcd34d 92%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {m.hero.titleHighlight}
              </Box>
              {m.hero.titleAfter ? ` ${m.hero.titleAfter}` : ""}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: 520,
                mb: { xs: 2.5, sm: 3 },
                lineHeight: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                animation: "ps-fade-up 0.8s ease-out 0.14s both",
              }}
            >
              {m.hero.subtitle}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: { xs: 3, sm: 4 }, animation: "ps-fade-up 0.9s ease-out 0.2s both" }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ width: { xs: "100%", sm: "auto" } }}
                endIcon={<ArrowForward />}
                onClick={scrollToContact}
              >
                {m.hero.ctaQuote}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  color: "common.white",
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.32)",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "secondary.light",
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
                onClick={() =>
                  document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {m.hero.ctaPartners}
              </Button>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.5}
              sx={{ animation: "ps-fade-up 0.95s ease-out 0.24s both" }}
            >
              {stats.map((s, idx) => (
                <Box
                  key={`${s.k}-${idx}`}
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    flex: { xs: "1 1 calc(50% - 6px)", sm: "0 1 auto" },
                    minWidth: { xs: "calc(50% - 6px)", sm: "96px" },
                    maxWidth: { xs: "100%", sm: "none" },
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.78, letterSpacing: 0.5, fontWeight: 700 }}>
                    {s.k}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.25 }}>
                    {s.v}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} sx={{ animation: "ps-fade-up 1s ease-out 0.2s both" }}>
            <Box
              sx={{
                position: "relative",
                p: "2px",
                borderRadius: { xs: 3, sm: 4 },
                background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(245,158,11,0.55) 45%, rgba(56,189,248,0.4) 100%)",
                boxShadow: "0 24px 70px rgba(7, 26, 46, 0.35)",
              }}
            >
              <Box
                sx={{
                  borderRadius: { xs: 2.5, sm: 3.5 },
                  p: { xs: 2.25, sm: 3 },
                  bgcolor: "rgba(10, 36, 62, 0.72)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "flex-start" }}
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Box>
                    <Typography variant="overline" sx={{ opacity: 0.82, letterSpacing: "0.12em" }}>
                      {m.hero.cardOverline}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.5, fontSize: { xs: "1.1rem", sm: "1.3rem" }, lineHeight: 1.25 }}>
                      {m.hero.cardTitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 99,
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      bgcolor: "secondary.main",
                      color: "primary.dark",
                      flexShrink: 0,
                    }}
                  >
                    {m.hero.cardBadge}
                  </Box>
                </Stack>
                <Stack spacing={1.5}>
                  {m.hero.cardBullets.map((line) => (
                    <Typography
                      key={line}
                      variant="body2"
                      sx={{
                        opacity: 0.94,
                        pl: 1.5,
                        borderLeft: "3px solid",
                        borderColor: "secondary.main",
                        lineHeight: 1.45,
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Box
                  sx={{
                    mt: 2.25,
                    height: 3,
                    borderRadius: 99,
                    overflow: "hidden",
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "72%",
                      borderRadius: 99,
                      boxShadow: "0 0 22px rgba(245,158,11,0.45)",
                      animation: "ps-gradient 3.5s ease-in-out infinite",
                      background: (theme) =>
                        `linear-gradient(90deg, ${theme.palette.secondary.main}, rgba(255,255,255,0.92))`,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.72 }}>
                  {m.hero.cardFootnote}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
