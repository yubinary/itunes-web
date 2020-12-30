import React from "react";
import { PlayCircleFilled } from "@material-ui/icons";

export default function Play({ handleClick }) {
  return (
    <button className="play-button" onClick={() => handleClick()}>
      <PlayCircleFilled />
    </button>
  );
}
