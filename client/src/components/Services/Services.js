import React, { useEffect } from "react";
import Service from "../Service/Service";
import { GoStopwatch } from "react-icons/go";
import { MdVolunteerActivism } from "react-icons/md";
import { MdPhoneCallback } from "react-icons/md";
import { CiWavePulse1 } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Services() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const services = [
    {
      title: "We are available 24/7",
      description:
        "Round-the-clock support for all your needs, ensuring assistance is available anytime, day or night.",
      image: <GoStopwatch></GoStopwatch>,
    },
    {
      title: "Providing volunteering support",
      description:
        "Empowering positive change through dedicated assistance and guidance in your volunteering journey.",
      image: <MdVolunteerActivism></MdVolunteerActivism>,
    },
    {
      title: "Contact us for help",
      description:
        "Reach out to us for guidance and support on our volunteering platform, connecting you with opportunities to make a positive impact.",
      image: <MdPhoneCallback />,
    },
  ];
  return (
    <div
      className="container-fluid p px-4 py-6  d-flex flex-col align-items-center justify-content-center  "
      style={{ backgroundColor: "#fffec8" }}
    >
      <div>
        {" "}
        <div className=" my-10 ">
          {" "}
          <div className="flex ">
            <CiWavePulse1 className=" text-orange-400 text-3xl"></CiWavePulse1>
            <h1 className=" text-orange-400 text-xl mb-1">
              {" "}
              Hands of Blessing....
            </h1>
          </div>
          <h1 className=" text-5xl font-bold">We are here to help you</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4   mb-5 ">
        {services.map((service) => (
          <Service
            title={service.title}
            description={service.description}
            image={service.image}
          ></Service>
        ))}
      </div>
    </div>
  );
}
