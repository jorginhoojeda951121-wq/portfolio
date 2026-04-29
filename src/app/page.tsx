"use client";

import { useEffect, useState } from "react";
import { FeatureThree } from "@/ui/FeatureThree";
import HeroSection from "@/ui/HeroSection";
import HireMe from "@/ui/HireMe/HireMe";
import Projects from "@/ui/Projects";

function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfo) return;

      const response = await fetch("/api/ip-tracking");
      const data = await response.json();
      setUserInfo(data);
    };

    fetchUserInfo();
  }, [userInfo]);
  
  return (
    <>
      <title>Maxwell Carter Official Portfolio Website</title>
      <HeroSection />
      <FeatureThree />
      <Projects />
      <HireMe />
    </>
  );
}

export default Home;
