import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { fs } from "../../../Firebase/firebase.config";

const DeleteProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state;

  const handleDelete = async () => {
    await deleteDoc(doc(fs, "projects", project.id));
    navigate("/admin/projects");
  };
  return (
    <div className="h-screen flex-col justify-center items-center">
      <h4 className="h4 text-center my-16">::: {project.title} :::</h4>
      <h2 className="h2 text-center">
        Do you really want to delete the project?
      </h2>
      <div className="flex justify-center mt-10">
        <button className="btn bg-red-400 w-[100px]" onClick={handleDelete}>
          YES
        </button>
        <button
          className="btn ml-8 w-[100px]"
          onClick={() => {
            navigate("/admin/projects");
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
