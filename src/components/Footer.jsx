import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";
import { useI18n } from "../i18n/I18nContext.jsx";
import { SITE_URL } from "../seo/siteUrl.js";

export default function Footer() {
  const { m, t } = useI18n();
  const year = new Date().getFullYear();
  const copyright = m.footer.copyright.replace("{year}", String(year));
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <Box
      component="footer"
      sx={{
        pt: 0,
        pb: { xs: `max(24px, env(safe-area-inset-bottom, 0px))`, sm: `max(32px, env(safe-area-inset-bottom, 0px))` },
        bgcolor: "primary.dark",
        color: "rgba(255,255,255,0.88)",
        position: "relative",
        "&::before": {
          content: '""',
          display: "block",
          height: 4,
          width: "100%",
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 3, sm: 4 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ color: "common.white", fontWeight: 800, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              {m.footer.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.5 }}>
              {m.footer.subtitle}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
            <Link
              href={`${SITE_URL}/`}
              color="inherit"
              underline="hover"
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 600 }}
            >
              {siteHost}
            </Link>
            <Link href="#contact" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
              {t("nav.contact")}
            </Link>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.12)" }} />
        <Typography variant="caption" sx={{ opacity: 0.75, display: "block", lineHeight: 1.55 }}>
          {copyright}
        </Typography>
      </Container>
    </Box>
  );
}
