import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
// import { getArchivedNotes } from "../../utils/local-data";
import { SearchContext } from "../../context/SearchProvider";
import Alert from "../../components/Alert";
import { getArchivedNotes } from "../../utils/network-data";
import { PropTypes } from "prop-types";
import Loading from "../../components/Loading";

const Archive = ({ heading }) => {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const { searchValue } = useContext(SearchContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      getArchivedNotes().then((data) => {
        return setArchiveNotes(data.data);
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

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
