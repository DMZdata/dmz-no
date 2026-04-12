import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundEffect from "@/components/BackgroundEffect";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
