import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

import CircleButton from "../../components/CircleButton";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../utils/network-data";
import { getThemeStatus } from "../../utils/functions";

const AddNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState({
    id: +new Date(),
    title: "",
    body: "",
    archived: "",
    createdAt: "",
  });

  const inputChangeNotes = (e) => {
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNotes = () => {
    const { title, body } = notes;
    try {
      addNote({ title, body });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout isActiveSearchBar={false}>
      <div>
        <div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                getThemeStatus() === "true" ? "bg-dark text-light" : "bg-light"
              }`}
              id="floatingInput"
              placeholder="Write personal notes"
              onChange={inputChangeNotes}
              value={notes.title}
              name="title"
            />
            <label htmlFor="floatingInput">Judul Catatan</label>
          </div>
          <div className="form-floating">
            <textarea
              className={`form-control ${
                getThemeStatus() === "true" ? "bg-dark text-light" : "bg-light"
              }`}
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: 200 }}
              onChange={inputChangeNotes}
              value={notes.body}
              name="body"
            ></textarea>
            <label htmlFor="floatingTextarea2">Catatan</label>
          </div>
        </div>
        <CircleButton
          icon={
            <IoCheckmarkSharp
              size={30}
              color={getThemeStatus() === "true" ? "black" : "white"}
            />
          }
          onClicked={handleSubmitNotes}
        />
      </div>
    </Layout>
  );
};

export default AddNotes;
