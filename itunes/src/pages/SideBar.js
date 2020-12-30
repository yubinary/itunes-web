import React from 'react';
import "../styles/SideBar.css";

import Play from "../components/Play.js";
import Pause from "../components/Pause.js";
import Bar from "../components/Bar.js";
import useAudioPlayer from '../components/useAudioPlayer';

export default function SideBar({ song }) {
  const { currTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
  console.log(song)
  return (
    <div className="side-bar">
      <div className="player">
        <img src={song.artworkUrl100} alt={song.trackId} />
        {playing ?
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }
        <h1>{song.trackCensoredName}</h1>
        <p>{song.artistName}</p>
        <audio id="audio">
          <source src={song.previewUrl} />
        </audio>
        <div className="controls">
          <Bar currTime={currTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
        </div>
      </div>
    </div>
  )
}