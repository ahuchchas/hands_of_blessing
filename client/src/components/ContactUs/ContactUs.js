import React, { useState } from "react";

export default function ContactUs() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  console.log(subject, message);

  return (
    <div>
      <div
        className="container  shadow  "
        style={{ backgroundColor: "#F5F7FE" }}
      >
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse  w-100 ">
            <div className="card m-3  w-50">
              <div className="card-body">
                <h1 className="text-3xl font-bold text-center ">Contact Us</h1>
                <h3 className="text  text-center pt-2">
                  If you have any query,contact us.
                </h3>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="subject"
                    className="input input-bordered"
                    onChange={(event) => setSubject(event.target.value)}
                  />
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <input
                    type=""
                    placeholder="Message"
                    className="input input-bordered"
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <div className="mt-6 text-center">
                    <button
                      className="btn  w-full"
                      style={{ backgroundColor: "#0D1338", color: "white" }}
                    >
                      <a
                        href={`mailto:cse_1932020041@lus.ac.bd ?subject=${subject}&body=${message}`}
                      >
                        Send
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
