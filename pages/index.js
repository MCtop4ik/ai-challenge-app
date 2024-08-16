import React from "react";
import RealCropper from "./components/cropper/cropper.component";
import Header from "./components/header/header.component";
import Buttons from "./components/buttons/buttons.component";
import Separator from "./components/separator/separator.component";
import History from "./components/history/history.component";

export default function Home() {
  return (
    <>
      <Header />
      <Separator />
      <Buttons />
      <Separator />
      <History />
      {/* <RealCropper /> */}
    </>
  );
}