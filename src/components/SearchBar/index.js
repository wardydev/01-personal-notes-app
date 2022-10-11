import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchProvider";
import { getThemeStatus } from "../../utils/functions";

const SearchBar = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className={`form-control form-control-lg ${
          getThemeStatus() === "true"
            ? "bg-dark text-light"
            : "bg-light text-dark"
        }`}
        placeholder="Cari Catatan"
        aria-label="Cari Catatan"
        aria-describedby="button-addon2"
        onChange={handleOnChange}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
