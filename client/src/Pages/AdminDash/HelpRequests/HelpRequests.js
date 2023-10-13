import React from "react";

export default function HelpRequests() {
  const requests = [
    {
      area: "Kanaighat",
      type: "Relief",
      contact: "01712345678",
      description:
        "In Kanaighat Upazila there is a sudden flood. People here need relief and other necessary volunteer support",
    },
    {
      area: "Companiganj",
      type: "Relief",
      contact: "01712345678",
      description:
        "In Kanaighat Upazila there is a sudden flood. People here need relief and other necessary volunteer support",
    },
    {
      area: "Sunamganj Sadar",
      type: "Relief",
      contact: "01712345678",
      description:
        "In Kanaighat Upazila there is a sudden flood. People here need relief and other necessary volunteer support",
    },
  ];

  return (
    <div>
      <p className="m-4 text-2xl font-bold">Help Requests From Public</p>
      <div className="overflow-x-auto m-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Area/Location</th>
              <th>Support type</th>
              <th>Contact No.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              return (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{request.area}</div>
                      </div>
                    </div>
                  </td>
                  <td>{request.type}</td>
                  <td>{request.contact}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
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
