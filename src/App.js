import React from "react";
import Navbar from "./Components/Navbar";
import MainRoutes from "./Routes/MainRoutes";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <ChakraProvider>
        <Navbar />
        <MainRoutes />
      </ChakraProvider>
    </div>
  );
};

export default App;
