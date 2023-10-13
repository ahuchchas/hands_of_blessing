import React from "react";

export default function Help() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <p className="text-4xl font-bold m-5 text-gray-700">
        Ask For Volunteer Support In Your Area
      </p>
      <div
        className="form-control w-full max-w-md px-5 py-4 m-3 shadow-md"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <p className="h5">We need some information</p>
        <label className="label">
          <span className="label-text">Where do you need support?</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-"
          placeholder="Area/Location"
        />

        <label className="label">
          <span className="label-text">What kind of support is needed?</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="For example: Relief"
        />

        <label className="label">
          <span className="label-text">Your contact No.?</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="For example: 01712345678"
        />

        <label className="label">
          <span className="label-text">Describe your request:</span>
        </label>
        <textarea
          type="text"
          multiline
          className="input input-bordered w-full max-w-md"
          placeholder="Description..."
        />

        <button className="my-3 btn bg-sky-950 text-white">Send Request</button>
      </div>
    </div>
  );
}
