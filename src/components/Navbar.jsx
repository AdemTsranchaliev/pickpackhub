import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { BRAND_NAME } from "../brand.js";

function navLabelKey(sectionId) {
  return sectionId === "why-us" ? "why" : sectionId;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar({ sections }) {
  const { t } = useI18n();
  const muiTheme = useTheme();
  const isLg = useMediaQuery(muiTheme.breakpoints.up("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navButtons = (
    <Stack
      direction="row"
      spacing={0.25}
      flexWrap="nowrap"
      alignItems="center"
      sx={{
        overflowX: "auto",
        maxWidth: { lg: 640, xl: 720 },
        py: 0.5,
        mx: -0.5,
        px: 0.5,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {sections.map((id) => (
        <Button
          key={id}
          color="inherit"
          onClick={() => scrollToId(id)}
          sx={{
            color: "rgba(255,255,255,0.92)",
            fontWeight: 600,
            fontSize: { lg: "0.8rem", xl: "0.875rem" },
            borderRadius: 99,
            px: { lg: 1, xl: 1.25 },
            minWidth: 0,
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.12)",
            },
          }}
        >
          {t(`nav.${navLabelKey(id)}`)}
        </Button>
      ))}
    </Stack>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: elevated ? "rgba(10, 36, 62, 0.86)" : "transparent",
          backdropFilter: elevated ? "blur(16px) saturate(160%)" : "none",
          WebkitBackdropFilter: elevated ? "blur(16px) saturate(160%)" : "none",
          borderBottom: elevated ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          boxShadow: elevated ? "0 12px 40px rgba(0,0,0,0.25)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
          backgroundImage: elevated
            ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(7, 26, 46, 0.52) 0%, rgba(7, 26, 46, 0) 100%)",
        }}
      >
        <Toolbar
          sx={{
            py: { xs: 1, sm: 1.25 },
            px: { xs: 1, sm: 2 },
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            flexWrap: { xs: "wrap", lg: "nowrap" },
            rowGap: { xs: 1, lg: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.25 },
              cursor: "pointer",
              mr: { xs: 0, lg: 1 },
              minWidth: 0,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Box
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                background: "linear-gradient(145deg, #f59e0b, #fde68a)",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.38)",
              }}
            >
              <LocalShippingOutlined sx={{ color: "#0c3557", fontSize: { xs: 24, sm: 26 } }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                }}
              >
                {BRAND_NAME}
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, letterSpacing: 2, fontWeight: 700, fontSize: "0.6rem", display: { xs: "none", sm: "block" } }}
              >
                {t("nav.tagline")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }} />
          {isLg ? navButtons : null}
          {!isLg && (
            <>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ fontWeight: 800, ml: "auto" }}
                onClick={() => scrollToId("contact")}
              >
                {t("nav.ctaShort")}
              </Button>
              <Box sx={{ ml: 0.75, flexShrink: 0, maxWidth: { xs: 120, sm: "none" } }}>
                <LanguageSwitcher showIcon={false} />
              </Box>
            </>
          )}
          {isLg && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 2, flexShrink: 0 }}>
              <LanguageSwitcher />
              <Button variant="contained" color="secondary" sx={{ fontWeight: 800, flexShrink: 0 }} onClick={() => scrollToId("contact")}>
                {t("nav.cta")}
              </Button>
            </Stack>
          )}
          {!isLg && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label={t("nav.menuAria")}
              onClick={() => setDrawerOpen(true)}
              sx={{
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 2,
                ml: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "primary.dark",
            color: "common.white",
            width: { xs: "min(100% - 40px, 300px)", sm: 300 },
            maxWidth: "100vw",
            pt: 2,
            pb: "max(16px, env(safe-area-inset-bottom))",
            backgroundImage: "linear-gradient(180deg, rgba(245, 158, 11, 0.12), transparent 44%)",
          },
        }}
      >
        <Box role="presentation">
          <List sx={{ px: 1 }}>
            {sections.map((id) => (
              <ListItemButton
                key={id}
                onClick={() => {
                  setDrawerOpen(false);
                  scrollToId(id);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 1.25,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                <ListItemText
                  primary={t(`nav.${navLabelKey(id)}`)}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "1rem" }}
                />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ px: 2, pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ fontWeight: 800, py: 1.25 }}
              onClick={() => {
                setDrawerOpen(false);
                scrollToId("contact");
              }}
            >
              {t("nav.cta")}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
