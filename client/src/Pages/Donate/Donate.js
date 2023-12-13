import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Donate = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const handleDonate = () => {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //navigate to
        window.location = data.url;
      })
      .catch((e) => {
        alert(
          "Sorry! The Donation payment server is unavailable right now! Please try again later."
        );
      });
  };

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: "url(donation5.png)" }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md " data-aos="fade-up">
            <h1 className="text-5xl font-bold">People Needs Your</h1>{" "}
            <span className="text-5xl font-bold text-accent">Help</span>
            <p className="mb-3">
              We need your support to continue the good work. Please donate.
              Your contribution is really appreciated.
            </p>
            <button
              className="btn btn-accent text-white  rounded-none"
              onClick={handleDonate}
            >
              Donate now
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex justify-center items-center ">
        <div className=" w-4/6  bg-amber-100 rounded-md flex shadow-md">
          <div className=" w-3/6 mt-12 ml-12">
            <span className="m-1 block text-5xl">Spread Your</span>
            <span className="m-1 block text-4xl font-bold">Blessed Hands</span>
            <span className="m-1 block text-3xl">for Humanity</span>
            <p className="mt-6">
              Our projects and volunteering activities can't run without your
              help. We need your support to continue the good work. Please
              donate. Your contribution is really appreciated.
            </p>
            <button
              className="mt-12 btn  btn-accent text-white"
              onClick={handleDonate}
            >
              Donate now
            </button>
          </div>
          <div className="m-12 w-3/6">
            <img
              src={require("./donate1.jpg")}
              alt="donate"
              className=" rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
