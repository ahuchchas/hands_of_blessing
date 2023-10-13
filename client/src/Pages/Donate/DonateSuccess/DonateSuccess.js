import React from "react";
import { Link } from "react-router-dom";

const DonateSuccess = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className=" w-4/6 bg-slate-300 rounded-md flex ">
        <div className=" w-4/6 mt-12 ml-12">
          <span className="m-1 block text-4xl font-bold">
            Donation Successfull!
          </span>

          <p className="mt-6">Thanks for your kind contribution</p>
          <Link to="/" className="my-12 btn ">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccess;
