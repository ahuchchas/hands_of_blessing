import React from "react";
import TopBanner from "../../components/TopBanner/TopBanner";
import Services from "../../components/Services/Services";
import JoinUs from "../../components/JoinUs/JoinUs";

import DonationCover from "../../components/DonationCover/DonationCover";

export default function Home() {
  return (
    <div>
      <TopBanner></TopBanner>
      <Services></Services>
      <DonationCover></DonationCover>
      <JoinUs></JoinUs>
    </div>
  );
}
