import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fs } from "../../../Firebase/firebase.config";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const ps = [];
      const querySnapshot = await getDocs(collection(fs, "projects"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const project = doc.data();
        project.id = doc.id;
        ps.push(project);
      });
      setProjects(ps);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <div>
        <h1 className="h1 text-center text-gray-700 p-4">Current Projects</h1>
      </div>

      <div className="py-6 grid grid-cols-3 min-h-screen">
        {projects.map((project) => {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg m-2"
              key={project.id}
            >
              <img
                className="w-full h-[200px]"
                src={`${project.photoUrl || require("./no_image.jpg")}`}
                alt="card img"
              />
              <div className="px-6 py-4">
                <div className=" h-[300px] overflow-y-auto">
                  <div className="font-bold text-xl mb-2">{project.title}</div>
                  <p className=" mt-3 ">
                    <strong>Location: </strong>
                    {project.location}
                  </p>
                  <p className=" mt-3 ">
                    <strong>Duration: </strong>
                    {project.starts} to {project.ends}
                  </p>
                  <p className="text-gray-700 text-base mt-3 h-[120px] ">
                    <strong>
                      Description: <br />
                    </strong>
                    {project.description}
                  </p>
                </div>
                {/* <div className="card-actions justify-end ">
                  <button
                    className="btn bg-emerald-400 mt-2 w-25"
                    onClick={() => {
                      navigate("/admin/editproject", { state: project });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-gray-400 mt-2 w-25"
                    onClick={() => {
                      navigate("/admin/deleteproject", { state: project });
                    }}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
