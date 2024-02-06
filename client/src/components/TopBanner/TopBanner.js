import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function TopBanner() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url('slide3.png')` }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content flex-col lg:flex-row  ">
          <img
            src="slide3.png"
            className="md:max-w-lg rounded-lg shadow-xl p-4  "
            style={{ backgroundColor: "white" }}
            alt=""
          />
          <div
            className="p-4  justify-center ml-6 text-center "
            data-aos="fade-right"
          >
            <h1 className="text-6xl font-bold text-white">
              Hands of Blessing !
            </h1>
            <p className="py-6 text-xl  text-white">
              We are here to build connections between volunteers, create
              volunteering opportunities and provide necessary support to them.
              So that the humanity can be served in a better way.
            </p>

            <Link
              to="/register"
              className="btn border-0 bg-orange-400 rounded-none text-white"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
