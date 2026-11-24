import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Facts from "@/components/Facts";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <Facts />
      <About />
      <Services />
      <Work />
      <Clients />
      <Contact />
      <Footer />

      <WhatsAppButton />
    </main>
  );
}