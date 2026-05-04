import { lazy, Suspense } from "react";
import { Box } from "@mui/material";
import SeoHead from "./components/SeoHead.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

const BelowFold = lazy(() => import("./components/BelowFold.jsx"));

const sectionIds = [
  "about",
  "services",
  "partners",
  "why-us",
  "market",
  "operations",
  "technology",
  "launch",
  "contact",
];

export default function App() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <SeoHead />
      <Navbar sections={sectionIds} />
      <Hero />
      <Suspense fallback={null}>
        <BelowFold />
      </Suspense>
    </Box>
  );
}
