import React from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
export default function JoinUs() {
  return (
    <div>
      <Parallax
        blur={5}
        bgImage="cover2.jpg"
        bgImageAlt="the cat"
        strength={200}
      >
        <div className=" min-h-screen  p-5">
          <div className="flex-col hero-content lg:flex-row-reverse text-center  gap-5">
            <div>
              <img src="cover2.jpg" className="sm:max-w-sm lg:max-w-2xl  " />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">
                Become A Volunteer!
              </h1>
              <p className="py-6  text-white">
                Join Us to take your volunteering experience to the next level.
                Discover working opportunities and build connection with the
                community of volunteers. Serve the humanity in a better way.
              </p>

              <button className="btn  border-0  bg-orange-400 rounded-none">
                <Link to="/register" className=" text-white">
                  Register
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}
