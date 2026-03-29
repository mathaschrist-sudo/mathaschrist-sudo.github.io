
import Image from "next/image";
import Headers from "./components/Headers";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Navigation from "./sections/Navigation";
import Hero from "./components/Hero";
import Projects from "./sections/Projects";

export default function Home() {
  return (
    <main>
      <Navigation/>
      <Hero/>
      <Skills />
      <Projects/>
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
