import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, getuser, removeFromBookmark } from "../Redux/action";
import "../Styles/UserTab.css";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import throttle from "lodash/throttle";

const UserTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  const bookmarkedUsers = useSelector((state) => state.bookmarkedUsers);
  useEffect(() => {
    dispatch(getuser);
  }, []);

  const handleThrottledSearch = throttle((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  const handleBookmark = (item) => {
    if (bookmarkedUsers.some((user) => user.id === item.id)) {
      dispatch(removeFromBookmark(item.id));
    } else {
      dispatch(addToBookmark(item));

      toast({
        title: "Bookmarked successfully.",
        description: "User Bookmarked,Go to bookmarked section.",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredUsers = userData.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = 0;
  const endIndex = showAll ? filteredUsers.length : currentPage * 10;

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <div className="user-tab-container">
      <h1>Users Tab</h1>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => handleThrottledSearch(e.target.value)}
        />
      </div>

      <div className="user-card-container">
        {displayedUsers.length > 0 &&
          displayedUsers.map((data) => {
            const isBookmarked = bookmarkedUsers.some(
              (user) => user.id === data.id
            );
            return (
              <div key={data.id} className="user-card">
                <img
                  alt="img"
                  className="avatar"
                  height="100px"
                  src={data.avatar_url}
                />
                <div className="username">{data.login} </div>
                <button
                  className="bookmark-button"
                  onClick={() => handleBookmark(data)}
                >
                  <BsBookmarkStarFill style={{ marginRight: "10px" }} />
                  <span>{isBookmarked ? "Unbookmark" : "Bookmark"}</span>
                </button>
              </div>
            );
          })}
      </div>

      {!showAll && filteredUsers.length > currentPage * 10 && (
        <div className="button_ctr_div">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
          <span>
            <FaCloudDownloadAlt />{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserTab;
