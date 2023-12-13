import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Service({ title, description, image }) {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="card  rounded-none  w-96  shadow-xl  flex justify-center items-center"
    >
      <div className="p-3">
        {" "}
        <text className="  rounded text-5xl">{image}</text>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
