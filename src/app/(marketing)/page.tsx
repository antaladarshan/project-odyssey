import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Rooms from "@/components/sections/Rooms";
import Amenities from "@/components/sections/Amenities";
import Gallery from "@/components/sections/Gallery";
import PortsOfCall from "@/components/sections/PortsOfCall";
import Reviews from "@/components/sections/Reviews";
import ReturningGuest from "@/components/sections/ReturningGuest";
import FuturePropertiesTeaser from "@/components/sections/FuturePropertiesTeaser";
import Faq from "@/components/sections/Faq";
import WhyUs from "@/components/sections/WhyUs";
import LongStays from "@/components/sections/LongStays";
import GroupCta from "@/components/sections/GroupCta";
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
      <Rooms />
      <WhyUs />
      <Amenities />
      <Gallery />
      <Reviews />
      <LongStays />
      <PortsOfCall />
      <GroupCta />
      <FuturePropertiesTeaser />
      <Faq />
      <TripPicker />
      <ReturningGuest />
    </>
  );
}
