import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fs } from "../../../Firebase/firebase.config";
import { getAuth } from "firebase/auth";
import ProjectDescription from "../../ProjectDescription/ProjectDescription";
import { useNavigate } from "react-router-dom";
const auth = getAuth();
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleDetails = (project) => {
    navigate(`/volunteer/projects/${project.id}`, {
      state: { project: project },
    });
  };

  async function checkInterested(pid) {
    const docRef = doc(fs, "projects", pid, "InterestedUsers", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }

  const fetchProjects = async () => {
    if (user === null) {
      const uid = auth.currentUser.uid;
      const docRef = doc(fs, "volunteers", uid);
      await getDoc(docRef).then((doc) => {
        const u = {
          uid: doc.data().uid,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
        };
        setUser(u);
      });
    }
    if (user) {
      // console.log(user);
      const ps = [];
      const querySnapshot = await getDocs(collection(fs, "projects"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const project = doc.data();
        project.id = doc.id;

        ps.push(project);
      });
      ps.forEach(async (p) => {
        p.interested = await checkInterested(p.id);
        // console.log(p);
        setProjects(ps);
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const interestHandler = (project) => {
    const docRef = doc(fs, "projects", project.id, "InterestedUsers", user.uid);
    if (project.interested) {
      //remove interest
      deleteDoc(docRef);
      alert(
        "You are removed from the list of interested volunteers in this project."
      );
      fetchProjects();
    } else {
      //set interest
      setDoc(docRef, user);
      alert(
        "Congratulations! You are listed as an interested volunteer in this project. We will contact you when needed."
      );
      fetchProjects();
    }
  };

  return (
    <div>
      <div>
        <h1 className="h1 text-center text-gray-700 p-4">Current Projects</h1>
      </div>

      <div className="min-h-screen grid grid-cols-3 gap-3 m-3 items-start">
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
                  <button
                    onClick={() => handleDetails(project)}
                    className="btn btn-sm btn-outline"
                  >
                    Details
                  </button>

                  <button
                    className={`btn btn-sm btn-outline text-white ${
                      project.interested ? " bg-amber-300" : " bg-lime-300"
                    } `}
                    onClick={() => interestHandler(project)}
                  >
                    {`${project.interested ? "Not" : ""} Interested?`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/**
      <div className="py-5 grid grid-cols-3 min-h-screen">
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
                    <button className="btn">Description</button>
                  </p>
                </div>
                <div className="card-actions justify-end ">
                  <button
                    className={`btn btn-wide text-white ${
                      project.interested ? "bg-secondary" : "bg-primary"
                    } `}
                    onClick={() => interestHandler(project)}
                  >
                    {`${project.interested ? "Not" : ""} Interested?`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
