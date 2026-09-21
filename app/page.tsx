import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Capabilities from "@/components/Capabilities";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <About />
      <Services />
      <Capabilities />
      <Clients />
      <Contact />
      <Footer />

      <WhatsAppButton />
    </main>
  );
}