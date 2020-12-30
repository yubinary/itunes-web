import React from "react";
import { PauseCircleFilled } from "@material-ui/icons";

export default function Play({ handleClick }) {
  return (
    <button className="play-button" onClick={() => handleClick()}>
      <PauseCircleFilled />
    </button>
  );
}
