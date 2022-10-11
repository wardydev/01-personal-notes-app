import React, { useEffect, useState, useContext } from "react";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import SearchProvider, { SearchContext } from "../../context/SearchProvider";
import Alert from "../../components/Alert";
import { getArchivedNotes } from "../../utils/network-data";
import { PropTypes } from "prop-types";
import Loading from "../../components/Loading";

const Archive = ({ heading }) => {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchValue } = useContext(SearchContext);

  const getArchiveNotesData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const notes = await getArchivedNotes();
      filterDataBySearch(notes.data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getArchiveNotesData();
  }, [searchValue]);

  const filterDataBySearch = (notes) => {
    if (searchValue) {
      const valueLowerCase = searchValue.toLowerCase();
      const filtered = notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(valueLowerCase) ||
          note.body.toLowerCase().includes(valueLowerCase)
        );
      });
      setArchiveNotes(filtered);
    } else {
      setArchiveNotes(notes);
    }
  };

  return (
    <Layout isActiveSearchBar={true}>
      <div>
        <div className="row mt-5">
          <h2 className="mb-3">{heading}</h2>
          {archiveNotes?.length === 0 && <Alert message="Tidak ada catatan!" />}
          {isLoading ? (
            <Loading />
          ) : (
            archiveNotes &&
            archiveNotes.map((note) => {
              return (
                <div className="col-3 mb-4" key={note.id}>
                  <Card note={note} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

Archive.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Archive;
