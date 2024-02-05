import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fs } from "../../../Firebase/firebase.config";

export default function HelpRequests() {
  const [requests, setRequests] = useState([]);

  const [selectedReq, setSelectedReq] = useState({});
  useEffect(() => {
    getDocs(collection(fs, "helpReq")).then((querySnapshot) => {
      const req = [];
      querySnapshot.forEach((doc) => {
        const reqInfo = {
          name: doc.data().name,
          phone: doc.data().phone,
          area: doc.data().area,
          description: doc.data().description,
        };

        req.push(reqInfo);
        setRequests(req);
      });
    });
  }, []);

  const handleModalSelection = (req) => {
    setSelectedReq(req);
  };
  return (
    <div>
      <p className="m-4 text-4xl font-bold text-slate-800 text-center my-5">
        Help Requests From Public
      </p>
      <div className="overflow-x-auto m-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Requester Name</th>
              <th>Area/Location</th>

              <th>Contact No.</th>

              <th>Support Type</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              return (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <td>{request.name}</td>
                      </div>
                    </div>
                  </td>
                  <td>{request.area}</td>
                  <td>{request.phone}</td>
                  <td>{request.supportType}</td>
                  <th>
                    {/* The button to open modal */}
                    <label
                      htmlFor="my_modal_7"
                      className="btn btn-sm"
                      onClick={() => handleModalSelection(request)}
                    >
                      Problem Details
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h1 className="h1 text-secondary">Request Details</h1>
                        <h3 className="text-lg font-bold">
                          Requester Name: {selectedReq.name}
                        </h3>
                        <p className="">Support Need in {selectedReq.area}</p>
                        <p className="">
                          Description: {selectedReq.description}
                        </p>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">
                        Close
                      </label>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
