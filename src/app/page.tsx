import HeroSection from "./_components/hero-section";
import LiquidEtherClient from "@/components/LiquidEtherClient";
import MetricsSection from "./_components/metric-section";
import TrustSecuritySection from "./_components/trust-section";
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
      
      <TrustSecuritySection />
      <AccommodationTypesSection /> 
      <USPSection />
      
      <TestimonialsSection />
      <LandlordCTASection />
      </div>
    </main>
  );
}












// export default function Home() {
//   return (
//     <main className="min-h-[calc(100dvh-4rem)]">
//       <div className="w-full relative">
//         {/* Hero area (LiquidEther inside this container so it fills the hero only) */}
//         <div className="relative h-[500px] w-full overflow-hidden">
//           {/* LiquidEther background for the hero (fills hero area, behind content) */}

//           {/* Hero content sits above the LiquidEther canvas */}
//           <div className="relative z-10">
//             <HeroSection />
//           </div>
//         </div>

//         {/* Other page content can go here */}
//       </div>
//     </main>
//   );
// }