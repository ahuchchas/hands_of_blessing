import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
export default function Services() {
  const services = [
    {
      title: "We are available 24/7",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      image: "images/chat.png",
    },
    {
      title: "Providing volunteering support",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      image: "images/volunteers.png",
    },
    {
      title: "Contact us for help",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      image: "images/donation.png",
    },
  ];
  return (
    <div className="px-4 mb-20 ">
      <div className="w-3/12 mx-auto   border-b-2 border-t-2 py-4 m-6">
        <h1
          className="text-center  text-4xl uppercase py-2"
          style={{ color: "#152b59" }}
        >
          Serve the humanity
        </h1>
        <p className="text-yellow-600 text-center">---Our Services---</p>
      </div>
      <div className=" m-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={"images/volunteers.png"} style={{ height: "400px" }} />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src={"images/chat.png"} style={{ height: "400px" }} />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src={"images/donation.png"} style={{ height: "400px" }} />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src="images/op.png" style={{ height: "400px" }} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
