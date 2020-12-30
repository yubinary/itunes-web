import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export default function Bar({ duration, currTime, onTimeUpdate }) {
  const curPercentage = (currTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar-progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar-time">{formatDuration(currTime)}</span>
      <div
        className="bar-progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <span
          className="bar-progress-knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar-time">{formatDuration(duration)}</span>
    </div>
  );
}
