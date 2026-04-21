import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import HubOutlined from "@mui/icons-material/HubOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";

const SI_VER = "11.14.0";
const siUrl = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@${SI_VER}/icons/${slug}.svg`;

const couriers = [
  { name: "Econt", src: "/images/partners/econt.svg" },
  { name: "Speedy", src: "/images/partners/speedy.svg" },
  { name: "DPD", src: siUrl("dpd") },
  { name: "GLS", src: "/images/partners/gls.svg" },
  { name: "DHL", src: siUrl("dhl") },
];

const salesChannels = [
  { name: "Shopify", src: siUrl("shopify") },
  { name: "WooCommerce", src: siUrl("woocommerce") },
  { name: "Amazon", src: siUrl("amazon") },
  { name: "eMAG", src: "/images/partners/emag.svg" },
  { name: "eBay", src: siUrl("ebay") },
  { name: "Allegro", src: siUrl("allegro") },
];

function LogoTile({ name, src, logoAria }) {
  return (
    <Box
      role="group"
      aria-label={`${logoAria} ${name}`}
      sx={{
        textAlign: "center",
        transition: "transform 0.2s ease",
        "@media (hover: hover)": {
          "&:hover": { transform: "translateY(-3px)" },
        },
      }}
    >
      <Box
        sx={{
          height: { xs: 64, sm: 72 },
          px: 1.5,
          py: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff",
          borderRadius: 2,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Box
          component="img"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          sx={{
            maxHeight: { xs: 40, sm: 44 },
            maxWidth: "100%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75, fontWeight: 600 }}>
        {name}
      </Typography>
    </Box>
  );
}

export default function Partners() {
  const { m } = useI18n();

  return (
    <Box
      id="partners"
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "background.paper",
        borderBlock: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
              {m.partners.overline}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.55rem", sm: "1.8rem", md: "2.1rem" }, mb: 1 }}>
              {m.partners.title}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.55 }}>
              {m.partners.intro}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <LocalShippingOutlined color="primary" />
                  <Typography variant="subtitle1" fontWeight={800}>
                    {m.partners.couriersTitle}
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {couriers.map((c) => (
                    <Grid item xs={6} sm={4} md={4} key={c.name}>
                      <LogoTile name={c.name} src={c.src} logoAria={m.partners.logoAria} />
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                  {m.partners.couriersNote}
                </Typography>
              </Box>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <HubOutlined color="primary" />
                  <Typography variant="subtitle1" fontWeight={800}>
                    {m.partners.channelsTitle}
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {salesChannels.map((c) => (
                    <Grid item xs={6} sm={4} md={4} key={c.name}>
                      <LogoTile name={c.name} src={c.src} logoAria={m.partners.logoAria} />
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                  {m.partners.channelsNote}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
