import React from "react";
import { Parallax, Background } from "react-parallax";
import img from "../../Pages/Donate/donate1.jpg";
export default function DonationCover() {
  return (
    <div className=" mt-14">
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero h-[700px]">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-2 text-white text-5xl font-bold uppercase">
                Spread Your
              </h1>
              <span className="m-1 block  text-4xl font-bold text-amber-400">
                Blessed Hands
              </span>
              <span className="m-1 block text-3xl">for Humanity</span>
              <p className="mt-6 text-white mb-3">
                Our projects and volunteering activities can't run without your
                help. We need your support to continue the good work. Please
                donate. Your contribution is really appreciated.
              </p>
              <button className="btn btn-primary">
                <a href="/donate">Donate Now</a>
              </button>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}
