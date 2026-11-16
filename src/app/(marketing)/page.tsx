import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import PropertyShowcase from "@/components/sections/PropertyShowcase";
import FeatureBanner from "@/components/sections/FeatureBanner";
import WhyUs from "@/components/sections/WhyUs";
import { SocialStays, TravelStyle } from "@/components/sections/ExpandSections";
import Amenities from "@/components/sections/Amenities";
import Reviews from "@/components/sections/Reviews";
import LongStays from "@/components/sections/LongStays";
import TeamOffsite from "@/components/sections/TeamOffsite";
import HostPartnerCards from "@/components/sections/HostPartnerCards";
import Faq from "@/components/sections/Faq";
import TripPicker from "@/components/sections/TripPicker";

export const metadata: Metadata = {
  title: { absolute: "PG & Hostel in Satellite, Ahmedabad (Near ISRO) | Project Odyssey" },
  description:
    "Safe, comfortable PG and hostel stays in Satellite, Jodhpur Village, Ahmedabad — near ISRO SAC and Star Bazaar. Girls PG, co-ed PG and private dorms. Book direct.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <PropertyShowcase />
      <FeatureBanner />
      <WhyUs />
      <SocialStays />
      <TravelStyle />
      <Amenities />
      <Reviews />
      <LongStays />
      <TeamOffsite />
      <HostPartnerCards />
      <Faq />
      <TripPicker />
    </>
  );
}
