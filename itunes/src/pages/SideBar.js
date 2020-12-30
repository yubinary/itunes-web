import React, { useState, useEffect } from 'react';

import { BsPlay, BsPause } from 'react-icons/bs';
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

  function handleClick() {
    if (!isPlay) {
      audio.play();
      setIsPlay(true);
    } else {
      audio.pause();
      setIsPlay(false);
    }
  }

  console.log(isPlay)

  function displayButton() {
    if (isPlay) {
      return (
        <button onClick={handleClick}><BsPause /></button>
      )
    } else {
      return (
        <button onClick={handleClick}><BsPlay /></button>
      )
    }
  }

  return (
    <div className="side-bar">
      <div className="player">
        <div className="disk">
          <img src={song.artworkUrl100} alt={song.trackId} />
          {displayButton()}
        </div>
        <h1>{song.trackCensoredName}</h1>
        <p>{song.artistName}</p>
      </div>
    </div>
  )
}