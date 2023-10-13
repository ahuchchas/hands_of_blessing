import React from "react";

export default function Service({ title, description, image }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl ">
      <figure className="px-10 pt-10">
        <img src={image} alt="" className="rounded-md w-50 my-5" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p></p>
        <div className="card-actions"></div>
      </div>
    </div>
  );
}
