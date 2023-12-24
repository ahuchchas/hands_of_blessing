import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fs } from "../../../Firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const ProjectResponse = () => {
  const { project_id, project_title } = useParams();
  // console.log(project_id, project_title);

  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const vs = [];
      const querySnapshot = await getDocs(
        collection(fs, "projects", project_id, "InterestedUsers")
      );
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const v = doc.data();
        vs.push(v);
      });
      setVolunteers(vs);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      {volunteers.length ? (
        <div className="overflow-x-auto m-3">
          {/* {console.log(volunteers)} */}
          <h2 className=" text-2xl text-center my-12">
            Interested volunteers in the project titled{" "}
            <span className=" font-bold">'{project_title}'</span>
          </h2>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {/* rows*/}
              {volunteers.map((volunteer) => (
                <tr className=" font-bold" key={volunteer.email}>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" min-h-screen w-full flex justify-center items-center">
          <h1 className="text-accent text-4xl">No one is interested yet !!</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectResponse;
