import Hero from "@/components/Hero";
import MessageSection from "@/components/MessageSection";
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
      <Hero />
      <MessageSection />
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
