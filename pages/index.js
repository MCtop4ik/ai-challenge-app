import React from "react";
import RealCropper from "./components/cropper/cropper.component";
import Header from "./components/header/header.component";

export default function Home() {
  return (
    <>
      <Header />
      <RealCropper />
    </>
  );
}