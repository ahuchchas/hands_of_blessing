import React from "react";

export default function JoinUs() {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#0f1f41", color: "white" }}
    >
      <div className="hero min-h-screen ">
        <div className="flex-col hero-content lg:flex-row text-center  gap-5">
          <div>
            <img
              src="volunteer2.png"
              className="sm:max-w-sm lg:max-w-3xl rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold ">Become A Volunteer!</h1>
            <p className="py-6 ">
              Join Us to take your volunteering experience to the next level.
              Discover working opportunities and build connection with the
              community of volunteers. Serve the humanity in a better way.
            </p>
            <button
              className="btn btn-border-0 text-white"
              style={{ backgroundColor: "#EB6855" }}
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
