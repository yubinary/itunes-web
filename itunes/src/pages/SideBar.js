import React, { useState, useEffect } from 'react';
import Playlist from "../components/Playlist.js";

import { BsFillPauseFill, BsFillPlayFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import "../styles/SideBar.css";

export default function SideBar({ song, playlist, setPlaylist, cropParagraph }) {
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [rotate, setRotate] = useState(1);

  useEffect(() => {
    audio.src = song.previewUrl;
    setAudio(audio);
    setIsPlay(true);
    audio.play();
  }, [song, audio])

  // change state: pause music when playing, play music when paused
  function handleClick() {
    if (!isPlay) {
      audio.play();
      setIsPlay(true);
      setRotate(1);
    } else {
      audio.pause();
      setIsPlay(false);
      setRotate(0);
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
        <img src={song.artworkUrl100} alt={song.trackId} rotate={rotate} />
        <div className="player-info">
          <h1>{song.trackCensoredName}</h1>
          <p>{song.artistName}</p>
        </div>
        <div>
          <button className="skip">
            <BsFillSkipStartFill />
          </button>
          {displayButton()}
          <button className="skip">
            <BsFillSkipEndFill />
          </button>
        </div>
      </div>
      <Playlist
        playlist={playlist}
        setPlaylist={setPlaylist}
        cropParagraph={cropParagraph}
      />
    </div>
  )
}