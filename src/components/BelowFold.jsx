import About from "./About.jsx";
import Services from "./Services.jsx";
import Partners from "./Partners.jsx";
import ValueProposition from "./ValueProposition.jsx";
import Market from "./Market.jsx";
import Operations from "./Operations.jsx";
import Technology from "./Technology.jsx";
import Launch from "./Launch.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

/** One lazy chunk: everything below the hero (code-split from initial bundle). */
export default function BelowFold() {
  return (
    <>
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
    </>
  );
}
