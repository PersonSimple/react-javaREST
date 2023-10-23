import React from "react";
import SideBar from "../Component/SideBar";
import { Outlet } from "react-router-dom";
export default function RootLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}