import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { fs, storage } from "../../../Firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
export default function NewProject() {
  const [inputError, setInputError] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  const navigate = useNavigate();
  emailjs.init("II3RUPGmEY_7oiHEQ");

  useEffect(() => {
    onSnapshot(query(collection(fs, "volunteers")), (querySnapshot) => {
      const usersInfo = [];
      querySnapshot.forEach((doc) => {
        const userInfo = {
          email: doc.data().email,
          name: doc.data().name,
        };

        usersInfo.push(userInfo);
        setVolunteers(usersInfo);
      });
    });
  }, []);

  const handleAddProject = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const starts = form.starts.value;
    const ends = form.ends.value;
    const description = form.description.value;
    const photoUrl = null;

    //regex for validation
    const pattern = /^[\w., ]+$/;

    if (
      !title.match(pattern) ||
      !location.match(pattern) ||
      !description.match(pattern)
    ) {
      setInputError(
        "Only alphabets, digits, whitespaces, dot(.) and comma(,) are allowed in the input field!!"
      );
      return;
    } else {
      const data = { title, location, starts, ends, description, photoUrl };

      try {
        const docRef = await addDoc(collection(fs, "projects"), data);
        // console.log("Document written with ID: ", docRef.id);

        if (form.img.files[0]) {
          const storageRef = ref(storage, `/images/projectImages/${docRef.id}`);
          uploadBytes(storageRef, form.img.files[0])
            .then(() => {
              // console.log("Uploaded the img file!");
              getDownloadURL(storageRef)
                .then((photoUrl) => {
                  data.photoUrl = photoUrl;
                  setDoc(doc(fs, "projects", docRef.id), {
                    ...data,
                  });
                  let message = `A new project titled '${title}' has been created by Hands of blessings. Please check it !!`;

                  if (volunteers.length > 0) {
                    volunteers.forEach((volunteer) => {
                      emailjs.send("service_mvv1e0g", "template_r2a2wyh", {
                        message: message,
                        to_email: volunteer.email,
                        from_name: "Hands of Blessings Team",
                        to_name: volunteer.name,
                      });
                    });
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch(() => console.log("error uploading image file"));
        }
        // console.log("project added!");
        navigate("/admin/projects");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="flex justify-center p-5">
      <form
        onSubmit={handleAddProject}
        className="form-control w-full max-w-md px-5 py-4"
      >
        <p className="h3">Project Detail Form:</p>
        <label className="label">
          <span className="label-text">Project Title:</span>
        </label>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full max-w-"
          required
        />

        <label className="label">
          <span className="label-text">Project Location:</span>
        </label>
        <input
          type="text"
          name="location"
          className="input input-bordered w-full max-w-md"
          required
        />

        <label className="label">
          <span className="label-text">Project starts:</span>
        </label>
        <input
          type="date"
          name="starts"
          className="input input-bordered w-full max-w-md"
          required
        />

        <label className="label">
          <span className="label-text">Project ends:</span>
        </label>
        <input
          type="date"
          name="ends"
          className="input input-bordered w-full max-w-md"
          required
        />

        <label className="label">
          <span className="label-text">Project Description:</span>
        </label>
        <textarea
          type="text"
          name="description"
          multiline
          className="input input-bordered w-full max-w-md"
          required
        />

        <label className="label">
          <span className="label-text">Project Image:</span>
        </label>
        <input
          type="file"
          name="img"
          accept="image/jpg,image/png,image/jpeg"
          className="py-2 input input-bordered w-full max-w-md"
        />

        <p className=" text-red-600 m-2 mt-3">{inputError}</p>

        <input
          type="submit"
          className="my-3 btn bg-sky-950 text-white"
          value="Add Project"
        />
      </form>
    </div>
  );
}
