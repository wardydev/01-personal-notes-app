import React, { useState, useEffect, useContext } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useNavigate, Navigate } from "react-router-dom";

import Card from "../../components/Card";
import CircleButton from "../../components/CircleButton";
import Layout from "../../components/Layout";
import { SearchContext } from "../../context/SearchProvider";
import Alert from "../../components/Alert";
import { getAccessToken, getActiveNotes } from "../../utils/network-data";
import { PropTypes } from "prop-types";
import Loading from "../../components/Loading";
import { getThemeStatus } from "../../utils/functions";

const Home = ({ heading }) => {
  const [activeNotes, setActiveNotes] = useState([]);
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNotesClick = () => {
    navigate("/notes/new");
  };

  const getActiveNotesData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const res = await getActiveNotes();
      filteredNotes(res.data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const filteredNotes = (notes) => {
    if (searchValue) {
      const valueLowerCase = searchValue.toLowerCase();
      const filteredNotes = notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(valueLowerCase) ||
          note.body.toLowerCase().includes(valueLowerCase)
        );
      });
      setActiveNotes(filteredNotes);
    } else {
      setActiveNotes(notes);
    }
  };

  useEffect(() => {
    getActiveNotesData();
  }, [searchValue]);

  useEffect(() => {
    if (getAccessToken()) {
      <Navigate to="/" replace={true} />;
    }
  }, []);

  if (getAccessToken() === null) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Layout isActiveSearchBar={true}>
      <div>
        <div className="row mt-5">
          <h2
            className={`mb-3 ${
              getThemeStatus() === "true" ? "text-light" : "text-dark"
            }`}
          >
            {heading}
          </h2>
          {activeNotes?.length === 0 && <Alert message="Tidak ada catatan" />}
          {isLoading ? (
            <Loading />
          ) : (
            activeNotes &&
            activeNotes.map((note) => {
              return (
                <div className="col-3 mb-4" key={note.id}>
                  <Card note={note} />
                </div>
              );
            })
          )}
        </div>
        <CircleButton
          onClicked={handleAddNotesClick}
          icon={
            <IoAddSharp
              size={30}
              color={`${getThemeStatus() === "true" ? "black" : "white"}`}
            />
          }
        />
      </div>
    </Layout>
  );
};

Home.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Home;
