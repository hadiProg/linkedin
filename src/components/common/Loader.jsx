import React from "react";
import { Spin } from "antd";

export default function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap:"30px",
        color:"#333333",
      }}
    >
      Loading...please Wait.
      <Spin size="large" />
    </div>
  );
}
