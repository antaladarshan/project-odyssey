"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StayPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/#rooms"); }, [router]);
  return null;
}
