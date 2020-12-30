import { useState, useEffect } from "react";

export default function useAudioPlayer() {
  const [duration, setDuration] = useState();
  const [currTime, setCurrTime] = useState();
  const [playing, setPlaying] = useState(true);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("audio");
    console.log(audio)

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrTime(audio.currentTime);
    }

    const setAudioTime = () => setCurrTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== currTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    currTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  }
}
