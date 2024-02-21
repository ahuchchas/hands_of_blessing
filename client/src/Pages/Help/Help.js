import AOS from "aos";
import "aos/dist/aos.css";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fs } from "../../Firebase/firebase.config";
export default function Help() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const [help, setHelp] = useState({
    name: "",
    area: "",
    supportType: "",
    phone: "",
    description: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHelp({
      ...help,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(help);
    /*RegEx for input validation */
    const namePattern = /^[a-zA-z .]+$/;
    const phnPattern = /^(\+88)?-?01[3-9]\d{8}$/;

    /*  validation:*/
    if (
      help.name.length === 0 ||
      help.area.length === 0 ||
      help.supportType.length === 0 ||
      help.phone.length === 0 ||
      help.description.length === 0
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Empty field is not allowed !",
        showConfirmButton: true,
      });
      return;
    } else if (!help.name.match(namePattern)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Only alphabets are allowed !",
        showConfirmButton: true,
      });
      return;
    } else if (help.name.length < 3 || help.name.length > 30) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Length of name must be within 3-30 ",
        showConfirmButton: true,
      });
      return;
    } else if (!help.phone.match(phnPattern)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please Enter a valid bangladeshi phone number !",
        showConfirmButton: true,
      });
      return;
    }

    const docRef = await addDoc(collection(fs, "helpReq"), help);

    if (docRef.id) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Help request has been sent !",
        showConfirmButton: true,
      });
    } else {
      alert("Error");
    }
  };
  return (
    <div>
      <div
        data-aos="fade-in"
        className="hero min-h-[400px]"
        style={{
          backgroundSize: "cover",
          backgroundImage: "url('/help.png')",
        }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-3 text-5xl font-bold">Ask Help</h1>
            <p className="mb-2">
              Find Volunteer Support or directly send help request.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center " data-aos="zoom-in">
        <p className="text-4xl font-bold m-5 text-gray-700">
          Ask For Volunteer Support In Your Area
        </p>
        <form
          className="form-control w-full max-w-md px-5 py-4 m-3 shadow-md"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <p className="h5">We need some information</p>
          <label className="label">
            <span className="label-text">Your Name ?</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-"
            placeholder="Your Name"
            name="name"
            onChange={handleChange}
            required
          />
          <label className="label">
            <span className="label-text">Where do you need support?</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-"
            placeholder="Area/Location"
            name="area"
            onChange={handleChange}
            required
          />

          <label className="label">
            <span className="label-text">What kind of support is needed?</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-md"
            placeholder="For example: Relief"
            name="supportType"
            required
            onChange={handleChange}
          />

          <label className="label">
            <span className="label-text">Your contact No.?</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-md"
            placeholder="For example: 01712345678"
            name="phone"
            required
            onChange={handleChange}
          />

          <label className="label">
            <span className="label-text">Describe your request:</span>
          </label>
          <textarea
            type="text"
            multiline
            className="input input-bordered w-full max-w-md"
            placeholder="Description..."
            name="description"
            onChange={handleChange}
            required
          />

          <button
            onClick={handleSubmit}
            className="my-3 btn bg-sky-950 text-white"
          >
            Send Request
          </button>
        </form>

        <div></div>
      </div>
    </div>
  );
}
