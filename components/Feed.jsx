"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchResults([]);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = getSearchResults();
        setSearchResults(searchResults);
      }, 1000)
    );
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  const getSearchResults = () => {
    const regex = new RegExp(searchText, "i");
    const searchResults = posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
    return searchResults;
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-col flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <PromptCardList
          data={searchText !== "" ? searchResults : posts}
          handleTagClick={() => {}}
        />
      </form>
    </section>
  );
};

export default Feed;
