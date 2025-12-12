import HeroSection from "./_components/hero-section";
import MetricsSection from "./_components/metric-section";
import TestimonialsSection from "./_components/testimonials-section";
import USPSection from "./_components/usp-section";
import AccommodationTypesSection from "./_components/accomdation-section";
import LandlordCTASection from "./_components/landlordcta-section";


export default function Home() {
  return (
    <main className="min-h-[calc(100dvh-4rem)]">
      <div className="relative">
        <div className="relative h-[500px] w-full overflow-hidden">
          <div className="relative z-10">
            <HeroSection />
          </div>
        </div>
      <MetricsSection />
      <AccommodationTypesSection /> 
      <USPSection />     
      <TestimonialsSection />
      <LandlordCTASection />
      </div>
    </main>
  );
}

