import { Box } from "@mui/material";
import SeoHead from "./components/SeoHead.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Partners from "./components/Partners.jsx";
import ValueProposition from "./components/ValueProposition.jsx";
import Market from "./components/Market.jsx";
import Operations from "./components/Operations.jsx";
import Technology from "./components/Technology.jsx";
import Launch from "./components/Launch.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

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
      <About />
      <Services />
      <Partners />
      <ValueProposition />
      <Market />
      <Operations />
      <Technology />
      <Launch />
      <Contact />
      <Footer />
    </Box>
  );
}
