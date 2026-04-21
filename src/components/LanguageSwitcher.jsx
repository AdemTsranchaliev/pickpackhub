import { Box, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { LOCALE_OPTIONS } from "../i18n/locales.js";
import { useI18n } from "../i18n/I18nContext.jsx";

function optionByCode(code) {
  return LOCALE_OPTIONS.find((o) => o.code === code) ?? LOCALE_OPTIONS[0];
}

function langCode(option) {
  return String(option.code).toUpperCase();
}

function FlagLabel({ option, labelProps, navTrigger = false }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.75} component="span" {...labelProps}>
      <Box component="span" sx={{ fontSize: "1.2rem", lineHeight: 1 }} aria-hidden>
        {option.flag}
      </Box>
      <Typography
        component="span"
        variant="body2"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.04em",
          fontVariantNumeric: "tabular-nums",
          ...(navTrigger ? { color: "inherit" } : {}),
        }}
      >
        {langCode(option)}
      </Typography>
    </Stack>
  );
}

const selectSx = {
  minWidth: { xs: 96, sm: 104 },
  color: "common.white",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.28)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.45)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.light" },
  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.9)" },
  "& .MuiSelect-select": { py: 0.65, pr: 3, display: "flex", alignItems: "center" },
};

export default function LanguageSwitcher({ showIcon = true }) {
  const { locale, setLocale, t } = useI18n();

  const control = (
    <FormControl size="small" variant="outlined" sx={{ flexShrink: 0 }}>
      <Select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        inputProps={{
          "aria-label": `${t("nav.language")}: ${optionByCode(locale).label}`,
        }}
        renderValue={(value) => <FlagLabel option={optionByCode(value)} navTrigger />}
        sx={selectSx}
        MenuProps={{
          PaperProps: {
            sx: { mt: 1, borderRadius: 2 },
          },
        }}
      >
        {LOCALE_OPTIONS.map((o) => (
          <MenuItem key={o.code} value={o.code} sx={{ py: 1 }} aria-label={o.label}>
            <FlagLabel option={o} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  if (!showIcon) return control;

  return (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flexShrink: 0 }}>
      <LanguageOutlined sx={{ color: "rgba(255,255,255,0.88)", fontSize: 20 }} aria-hidden />
      {control}
    </Stack>
  );
}
