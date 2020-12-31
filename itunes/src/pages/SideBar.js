import React, { useState, useEffect } from 'react';

import { BsFillPauseFill, BsFillPlayFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import "../styles/SideBar.css";

export default function SideBar({ song, playlist }) {
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

  // display playlist
  function displayPlaylist(playlists) {
    let result = [];
    for (let i = 0; i < playlists.length; i++) {
      let playlist = playlists[i];
      result.push(
        <div>
          <p>{playlist.trackCensoredName}</p>
        </div>
      )
    } return result;
  }


  return (
    <div className="side-bar">
      <div className="player">
        <img src={song.artworkUrl100} alt={song.trackId} rotate={rotate} />
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
      {displayPlaylist(playlist)}
    </div>
  )
}