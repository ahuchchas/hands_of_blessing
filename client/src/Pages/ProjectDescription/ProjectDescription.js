import { getAuth } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fs } from "../../Firebase/firebase.config";
import Swal from "sweetalert2";
import { CiHospital1 } from "react-icons/ci";
const auth = getAuth();

export default function ProjectDescription() {
  const [project, setProject] = useState({});
  const [user, setUser] = useState({});
  const [contrText, setContrText] = useState("");
  const { state } = useLocation();
  const { projectId } = useParams();
  // console.log(projectId);

  const fetchProject = async () => {
    const res = await getDoc(doc(fs, "projects", projectId));
    const project = res.data();
    setProject(project);
  };

  useEffect(() => {
    fetchProject();
  }, []);
  //get user name
  useEffect(() => {
    auth.onAuthStateChanged((volunteer) => {
      if (volunteer.uid === "uy9HY9Me1Ph1yTM68z55OouOItN2") {
        setUser({ name: "Admin" });
      } else if (volunteer) {
        async function getUserDoc() {
          const docRef = doc(fs, "volunteers", volunteer.uid);
          await getDoc(docRef)
            .then((doc) => {
              setUser(doc.data());
            })
            .catch((err) => console.log(err));
        }
        getUserDoc();
      }
    });
  }, []);

  const addContribution = async () => {
    // console.log(contrText);
    // {c.user, c.text};
    const userName = user.name;

    await updateDoc(doc(fs, "projects", projectId), {
      contributions: arrayUnion({ userName, contrText }),
    });
    fetchProject();
    Swal.fire({
      title: "Your contribution successfully added",

      icon: "success",
    });
    setContrText("");
  };
  return (
    <div className=" m-4">
      <div className="card lg:card-side bg-base-100   min-h-screen">
        <div className=" p-4 grid justify-center items-start grid-cols-1 md:grid-cols-2 ">
          <div>
            <figure>
              {project.photoUrl && (
                <div className="avatar ">
                  <div className="rounded-xl w-[500px]  h-[500px]">
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
              <h2 className=" card-title text-2xl">{project.title}</h2>
              <p>
                <span className="font-bold">Location: </span> {project.location}
              </p>
              <h3 className="mt-4 font-bold">Description:</h3>
              <p className="p-0 ">{project.description}</p>
              <div className="mt-4 p-2 border border-green-800 rounded">
                <h4>
                  <span className=" font-semibold">
                    Add your contributions:
                  </span>{" "}
                  If you have contributed in this project, please add what you
                  have done so far. So that others can be benefited by knowing
                  the progress of this project.
                </h4>
                <textarea
                  onChange={(event) => setContrText(event.target.value)}
                  cols="40"
                  rows="2"
                  className="mt-2 bg-slate-200"
                ></textarea>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => addContribution()}
                >
                  Add contribution
                </button>
              </div>
              <h3 className="mt-4 font-bold">Contributions so far:</h3>
              {/* map through project.contributions to show all contributions */}
              <div className="my-2 p-1 border border-amber-400 rounded">
                {project.contributions?.map((contribution) => (
                  <div className="p-1 border border-b-slate-700">
                    <h4 className=" font-semibold">{contribution.userName}:</h4>
                    <p>{contribution.contrText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
