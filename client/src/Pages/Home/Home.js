import React from "react";
import TopBanner from "../../components/TopBanner/TopBanner";
import Services from "../../components/Services/Services";
import JoinUs from "../../components/JoinUs/JoinUs";
import ContactUs from "../../components/ContactUs/ContactUs";

export default function Home() {
  return (
    <div>
      <TopBanner></TopBanner>
      <Services></Services>

      <JoinUs></JoinUs>
      <ContactUs></ContactUs>
    </div>
  );
}
