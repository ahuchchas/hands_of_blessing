import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fs, storage } from "../../../Firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditProject = () => {
  const [inputError, setInputError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location.state);
  const doc_id = location.state.id;
  const handleEditProject = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const location = form.location.value;
    const starts = form.starts.value;
    const ends = form.ends.value;
    const description = form.description.value;
    const photoUrl = form.photoUrl.value;

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
      //   console.log(data);
      //   console.log(doc_id);
      try {
        setDoc(doc(fs, "projects", doc_id), data);

        if (form.img.files[0]) {
          const storageRef = ref(storage, `/images/projectImages/${doc_id}`);
          uploadBytes(storageRef, form.img.files[0])
            .then(() => {
              console.log("Uploaded the img file!");
              getDownloadURL(storageRef)
                .then((photoUrl) => {
                  data.photoUrl = photoUrl;
                  setDoc(doc(fs, "projects", doc_id), data);
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch(() => console.log("error uploading image file"));
        }
        // console.log("project updated!");
        navigate("/admin/projects");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="flex justify-center p-5">
      <form
        onSubmit={handleEditProject}
        className="form-control w-full max-w-md px-5 py-4"
      >
        <p className="h3">Edit Project Detail:</p>
        <label className="label">
          <span className="label-text">Project Title:</span>
        </label>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full max-w-"
          required
          defaultValue={location.state.title}
        />

        <label className="label">
          <span className="label-text">Project Location:</span>
        </label>
        <input
          type="text"
          name="location"
          className="input input-bordered w-full max-w-md"
          required
          defaultValue={location.state.location}
        />

        <label className="label">
          <span className="label-text">Project starts:</span>
        </label>
        <input
          type="date"
          name="starts"
          className="input input-bordered w-full max-w-md"
          required
          defaultValue={location.state.starts}
        />

        <label className="label">
          <span className="label-text">Project ends:</span>
        </label>
        <input
          type="date"
          name="ends"
          className="input input-bordered w-full max-w-md"
          required
          defaultValue={location.state.ends}
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
          defaultValue={location.state.description}
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

        <input
          type="hidden"
          name="photoUrl"
          defaultValue={location.state.photoUrl}
        />

        <p className=" text-red-600 m-2 mt-3">{inputError}</p>

        <input
          type="submit"
          className="my-3 btn bg-sky-950 text-white"
          value="Save edits"
        />
      </form>
    </div>
  );
};

export default EditProject;
