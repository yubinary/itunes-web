import React, { useState, useEffect } from 'react';

import { BsFillPauseFill, BsFillPlayFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import "../styles/SideBar.css";

export default function SideBar({ song }) {
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    audio.src = song.previewUrl;
    setAudio(audio);
    setIsPlay(true);
    audio.play();
  }, [song])

  // change state: pause music when playing, play music when paused
  function handleClick() {
    if (!isPlay) {
      audio.play();
      setIsPlay(true);
    } else {
      audio.pause();
      setIsPlay(false);
    }
  }

  // show pause button when playing, play button when paused
  function displayButton() {
    if (isPlay) {
      return (
        <button className="play" onClick={handleClick}><BsFillPauseFill /></button>
      )
    } else {
      return (
        <button className="play" onClick={handleClick}><BsFillPlayFill /></button>
      )
    }
  }

  return (
    <div className="side-bar">
      <div className="player">
        <img src={song.artworkUrl100} alt={song.trackId} />
        <div className="info">
          <h1>{song.trackCensoredName}</h1>
          <p>{song.artistName}</p>
        </div>
        <div>
          <button className="skip"><BsFillSkipStartFill /></button>
          {displayButton()}
          <button className="skip"><BsFillSkipEndFill /></button>
        </div>
      </div>
    </div>
  )
}