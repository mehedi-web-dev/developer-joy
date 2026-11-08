import AboutSection from "./component/Home/AboutSection";
import FaqSection from "./component/Home/FaqSection";
import HeroSection from "./component/Home/HeroSection";
import PortfolioSection from "./component/Home/PortfolioSection";
import ServicesSection from "./component/Home/ServicesSection";
import SkillsSection from "./component/Home/SkillsSection";
import StatsSection from "./component/Home/StatsSection";
import TestimonialsSection from "./component/Home/TestimonialsSection";
import WhyChooseSection from "./component/Home/WhyChooseSection";



export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <SkillsSection />
      <PortfolioSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
