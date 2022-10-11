import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { IoArchiveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import CircleButton from "../../components/CircleButton";
import Layout from "../../components/Layout";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../../utils/network-data";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { getThemeStatus } from "../../utils/functions";

const DetailNotes = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      getNote(noteId).then((data) => {
        return setNote(data.data);
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [noteId]);

  const removeNoteFromDetailNote = async () => {
    await deleteNote(noteId);
    navigate("/");
  };
  const archiveNoteFromDetailNote = async () => {
    await archiveNote(noteId);
    navigate("/archive");
  };
  const unArchiveNoteFromDetailNote = async () => {
    await unarchiveNote(noteId);
    navigate("/");
  };

  return (
    <Layout isActiveSearchBar={false}>
      <div>
        {isLoading ? <Loading /> : <Card note={note} isActiveLink={false} />}

        <CircleButton
          icon={
            <IoTrashOutline
              size={30}
              color={getThemeStatus() === "true" ? "black" : "white"}
            />
          }
          onClicked={removeNoteFromDetailNote}
        />
        {note.archived ? (
          <CircleButton
            icon={
              <IoArchiveOutline
                size={30}
                color={getThemeStatus() === "true" ? "black" : "white"}
              />
            }
            isRight={true}
            onClicked={unArchiveNoteFromDetailNote}
          />
        ) : (
          <CircleButton
            icon={
              <IoArchiveOutline
                size={30}
                color={getThemeStatus() === "true" ? "black" : "white"}
              />
            }
            isRight={true}
            onClicked={archiveNoteFromDetailNote}
          />
        )}
      </div>
    </Layout>
  );
};

export default DetailNotes;
