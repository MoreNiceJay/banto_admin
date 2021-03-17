import "./styles.css";
import React from "react";
import LeftMenu from "./components/LeftMenu.js";
import MiddleList from "./components/MiddleList.js";
import RightContents from "./components/RightContents.js";

export default function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%"
        }}
      >
        <LeftMenu></LeftMenu>
        <MiddleList></MiddleList>
        <RightContents></RightContents>
      </div>
    </>
  );
}
