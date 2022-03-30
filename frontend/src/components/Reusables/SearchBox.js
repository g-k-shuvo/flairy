import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="search-form">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="search-input"
        autoComplete="off"
      />
      <button type="submit" className="search-submit">
        <BiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
