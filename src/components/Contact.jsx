import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
  Snackbar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import { useI18n } from "../i18n/I18nContext.jsx";
import { BRAND_NAME, SALES_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164 } from "../brand.js";

const VOLUME_KEYS = ["up100", "r100_500", "r500_2000", "over2000"];

const initial = { name: "", company: "", email: "", phone: "", volumeTier: "", message: "" };

function fieldSx(theme) {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    },
    "& .MuiOutlinedInput-root:hover": {
      boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.35)}`,
    },
  };
}

function infoCardPaperSx(theme) {
  return {
    p: 2,
    display: "flex",
    gap: 2,
    alignItems: "center",
    borderRadius: 3,
    border: "1px solid rgba(7, 16, 24, 0.08)",
    bgcolor: "background.paper",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
    "@media (hover: hover) and (pointer: fine)": {
      "&:hover": {
        transform: "translateX(6px)",
        boxShadow: "0 12px 32px rgba(7, 16, 24, 0.08)",
        borderColor: alpha(theme.palette.secondary.main, 0.42),
      },
    },
  };
}

function iconShellSx(theme) {
  return {
    width: 44,
    height: 44,
    borderRadius: 2,
    display: "grid",
    placeItems: "center",
    bgcolor: alpha(theme.palette.primary.main, 0.1),
    color: "primary.main",
    flexShrink: 0,
  };
}

const WEB3_ENDPOINT = "https://api.web3forms.com/submit";

function buildInquiryBody(form, m) {
  const L = m.contact.mailLines;
  const volumeLabel = m.contact.volumeTiers[form.volumeTier] ?? form.volumeTier;
  return [
    `${L.name}: ${form.name}`,
    `${L.company}: ${form.company}`,
    `${L.email}: ${form.email}`,
    `${L.phone}: ${form.phone}`,
    `${L.volume}: ${volumeLabel}`,
    "",
    form.message,
  ].join("\n");
}

export default function Contact() {
  const { m } = useI18n();
  const [form, setForm] = useState(initial);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const [sending, setSending] = useState(false);

  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  const usesDirectSend = Boolean(web3Key);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim() || !form.volumeTier) {
      setToast({ open: true, message: m.contact.validation, severity: "warning" });
      return;
    }
    const subjectLine = form.name.trim() ? `${BRAND_NAME} — ${form.name.trim()}` : m.contact.mailSubject;
    const bodyText = buildInquiryBody(form, m);

    if (!usesDirectSend) {
      const subject = encodeURIComponent(subjectLine);
      const body = encodeURIComponent(bodyText);
      window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
      setToast({ open: true, message: m.contact.toastClient, severity: "info" });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(WEB3_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: subjectLine,
          from_name: form.name.trim() || BRAND_NAME,
          name: form.name.trim(),
          email: form.email.trim(),
          message: bodyText,
          replyto: form.email.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setToast({ open: true, message: m.contact.submitSuccess, severity: "success" });
        setForm(initial);
      } else {
        setToast({
          open: true,
          message: typeof data.message === "string" ? data.message : m.contact.submitError,
          severity: "error",
        });
      }
    } catch {
      setToast({ open: true, message: m.contact.submitError, severity: "error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, sm: 8, md: 11 },
        position: "relative",
        background: (theme) =>
          `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.04)} 0%, #ffffff 52%)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
              {m.contact.overline}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", sm: "1.85rem", md: "2.25rem" }, mb: 1.5 }}>
              {m.contact.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2.5, fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.55 }}>
              {m.contact.intro}
            </Typography>
            <Stack spacing={1.75}>
              <Paper elevation={0} sx={(theme) => infoCardPaperSx(theme)}>
                <Box sx={(theme) => iconShellSx(theme)}>
                  <LocationOnOutlined fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {m.contact.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.contact.addressValue}
                  </Typography>
                </Box>
              </Paper>
              <Paper elevation={0} sx={(theme) => infoCardPaperSx(theme)}>
                <Box sx={(theme) => iconShellSx(theme)}>
                  <EmailOutlined fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {m.contact.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                    {SALES_EMAIL}
                  </Typography>
                </Box>
              </Paper>
              <Paper elevation={0} sx={(theme) => infoCardPaperSx(theme)}>
                <Box sx={(theme) => iconShellSx(theme)}>
                  <PhoneOutlined fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {m.contact.phone}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="a"
                    href={`tel:${CONTACT_PHONE_E164}`}
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {CONTACT_PHONE}
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                p: "2px",
                borderRadius: 3,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                boxShadow: "0 24px 60px rgba(7, 16, 24, 0.12)",
              }}
            >
              <Paper elevation={0} sx={{ p: { xs: 2.25, sm: 3, md: 3.5 }, borderRadius: 2.75, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>
                  {m.contact.formTitle}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={m.contact.labelName} name="name" value={form.name} onChange={handleChange} sx={(theme) => fieldSx(theme)} autoComplete="name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={m.contact.labelCompany} name="company" value={form.company} onChange={handleChange} sx={(theme) => fieldSx(theme)} autoComplete="organization" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label={m.contact.labelEmail}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        sx={(theme) => fieldSx(theme)}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={m.contact.labelPhone} name="phone" value={form.phone} onChange={handleChange} sx={(theme) => fieldSx(theme)} autoComplete="tel" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        component="fieldset"
                        required
                        fullWidth
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid rgba(7, 16, 24, 0.12)",
                          bgcolor: "rgba(7, 16, 24, 0.02)",
                        }}
                      >
                        <FormLabel component="legend" sx={{ typography: "body2", fontWeight: 700, color: "text.primary", mb: 1 }}>
                          {m.contact.labelVolume}
                        </FormLabel>
                        <RadioGroup name="volumeTier" value={form.volumeTier} onChange={handleChange}>
                          {VOLUME_KEYS.map((key) => (
                            <FormControlLabel
                              key={key}
                              value={key}
                              control={<Radio size="small" color="secondary" />}
                              label={m.contact.volumeTiers[key]}
                              sx={{
                                alignItems: "center",
                                ml: 0,
                                mr: 0,
                                py: 0.35,
                                borderRadius: 1,
                                px: 0.5,
                                mx: -0.5,
                                "&:hover": { bgcolor: "action.hover" },
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        minRows={3}
                        label={m.contact.labelMessage}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        sx={(theme) => fieldSx(theme)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        disabled={sending}
                        sx={{ py: 1.25, sm: { width: "auto", px: 3 } }}
                      >
                        {sending ? m.contact.sending : m.contact.submit}
                      </Button>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1.25 }}>
                        {usesDirectSend ? m.contact.submitHintDirect : m.contact.submitHintMailto}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          sx={{ maxWidth: { xs: "100%", sm: 400 } }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
