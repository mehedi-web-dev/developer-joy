import AboutSection from "./component/Home/AboutSection";
import ContactSection from "./component/Home/ContactSection";
import HeroSection from "./component/Home/HeroSection";
import PortfolioSection from "./component/Home/PortfolioSection";
import ServicesSection from "./component/Home/ServicesSection";
import SkillsSection from "./component/Home/SkillsSection";
import TestimonialsSection from "./component/Home/TestimonialsSection";



export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection/>
      <SkillsSection/>
      <PortfolioSection/>
      <TestimonialsSection/>
      <ContactSection/>

    </main>
  );
}
