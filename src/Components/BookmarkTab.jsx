import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBookmark } from "../Redux/action";
import throttle from "lodash/throttle";
import { useNavigate } from "react-router-dom";
import "../Styles/UserTab.css";
import { BiArrowToTop } from "react-icons/bi";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../Redux/store";
import { BsBookmarkStarFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
const BookmarkTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarkedUsers = useSelector((state) => state.bookmarkedUsers);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const handleThrottledSearch = throttle((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  const handleUnBookmark = (itemId) => {
    dispatch(removeFromBookmark(itemId));

    toast({
      title: "UnBookmarked.",
      description: "Removed from BookMarked.",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });

    navigate("/");
  };

  const filteredUsers = bookmarkedUsers.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = 0;
  const endIndex = showAll ? filteredUsers.length : currentPage * 10;

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <PersistGate loading={null} persistor={persistor}>
      {" "}
      <div className="user-tab-container">
        <h1>Bookmark Page</h1>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => handleThrottledSearch(e.target.value)}
          />
        </div>
        <div className="user-card-container">
          {displayedUsers.map((item) => (
            <div key={item.id} className="user-card">
              <img
                alt="img"
                className="avatar"
                height="100px"
                src={item.avatar_url}
              />
              <div className="username">{item.login}</div>
              <button
                className="bookmark-button"
                onClick={() => handleUnBookmark(item.id)}
              >
                <BsBookmarkStarFill /> Unbookmarked
              </button>
            </div>
          ))}
        </div>

        {!showAll && filteredUsers.length > currentPage * 10 && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </PersistGate>
  );
};

export default BookmarkTab;
