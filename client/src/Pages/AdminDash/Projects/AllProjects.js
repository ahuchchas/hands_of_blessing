import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fs } from "../../../Firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleDetails = (project) => {
    navigate(`/admin/projects/${project.id}`, {
      state: { project: project },
    });
  };

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

      <div className="min-h-screen grid grid-cols-3 gap-3 m-3">
        {projects.map((project) => {
          return (
            <div className="card  w-80 bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-full h-[200px]"
                  src={`${project.photoUrl || require("./no_image.jpg")}`}
                  alt="card img"
                />
              </figure>
              <div className="badge  bg-amber-200 rounded-none">
                {" "}
                Duration: {project.starts} to {project.ends}
              </div>
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>Location: {project.location}</p>
                <div className="card-actions justify-end">
                  <CiEdit
                    onClick={() => {
                      navigate("/admin/editproject", { state: project });
                    }}
                    className=" text-3xl"
                  ></CiEdit>
                  <MdDelete
                    onClick={() => {
                      navigate("/admin/deleteproject", { state: project });
                    }}
                    className=" text-3xl"
                  ></MdDelete>
                  <div>
                    <button className="btn btn-accent text-slate-800   btn-sm me-1">
                      {" "}
                      <Link
                        className="text-white"
                        to={`/admin/project-response/${project.id}/${project.title}`}
                      >
                        Response
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDetails(project)}
                      className="btn btn-sm    btn-accent btn-outline"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
