import Hero from "@/components/Hero";
import BackgroundLines from "@/components/BackgroundLines";
import LegacySection from "@/components/LegacySection";
import PhotoGallery from "@/components/PhotoGallery";
import OnOffTrack from "@/components/OnOffTrack";
import HelmetsSection from "@/components/HelmetsSection";
import StoreSection from "@/components/StoreSection";
import PartnersSection from "@/components/PartnersSection";
import SocialGrid from "@/components/SocialGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <BackgroundLines />
      <Hero />
      <LegacySection />
      <PhotoGallery />
      <OnOffTrack />
      <HelmetsSection />
      <StoreSection />
      <PartnersSection />
      <SocialGrid />
      <Footer />
    </main>
  );
}
