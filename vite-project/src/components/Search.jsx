import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const resetInputField = () => {
    setSearchValue("");
  };
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField;
  };
  return (
    <div>
      <form className="search">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <input type="submit" value="Search" onClick={callSearchFunction} />
      </form>
    </div>
  );
};

export default Search;
