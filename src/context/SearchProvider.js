import React, { useState } from "react";
import PropTypes from "prop-types";

export const SearchContext = React.createContext();
export const ThemeContext = React.createContext();

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        {children}
      </ThemeContext.Provider>
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SearchProvider;
