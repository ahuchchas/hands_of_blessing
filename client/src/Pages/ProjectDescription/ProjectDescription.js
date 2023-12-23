import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProjectDescription() {
  const [project, setProject] = useState({});
  const { state } = useLocation();
  useEffect(() => {
    setProject(state.project);
    console.log(state);
  }, []);
  return (
    <div className=" m-4">
      <div className="card lg:card-side bg-base-100   min-h-screen">
        <div className=" p-4 grid justify-center items-center grid-cols-1 md:grid-cols-2 ">
          <div>
            <figure>
              {project.photoUrl && (
                <div className="avatar">
                  <div className="  w-full  h-full rounded-xl">
                    <img src={project.photoUrl} />
                  </div>
                </div>
              )}
            </figure>
          </div>
          <div className="  p-6">
            <div className="badge p-1 text-slate-500  bg-amber-200 text-center w-full ">
              {" "}
              Duration: {project.starts} to {project.ends}
            </div>
            <div className=" mt-3 py-2">
              {" "}
              <h2 className=" card-title ">Title: {project.title}</h2>
              <p>Location: {project.location}</p>
              <p className="p-0 ">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
