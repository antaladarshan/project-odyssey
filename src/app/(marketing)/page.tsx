import { Suspense, lazy } from "react";
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

const RouteLine = lazy(() => import("@/components/three/RouteLine"));

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <RouteLine />
      </Suspense>

      <Hero />
      <Intro />
      <Rooms />
      <Amenities />
      <Gallery />
      <PortsOfCall />
      <Reviews />
      <ReturningGuest />
      <FuturePropertiesTeaser />
      <Faq />
    </>
  );
}
