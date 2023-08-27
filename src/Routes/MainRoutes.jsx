import React from "react";
import { Route, Routes } from "react-router-dom";
import UserTab from "../Components/UserTab";
import BookmarkTab from "../Components/BookmarkTab";


const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserTab />} />
        <Route path="/bookmark" element={<BookmarkTab />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
