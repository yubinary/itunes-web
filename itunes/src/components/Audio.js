import React from "react";

import Song from "./Song.js";
import Play from "./Play.js";
import Pause from "./Pause.js";
import Bar from "./Bar.js";

import useAudioPlayer from './useAudioPlayer';

export default function Audio(song) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="player">
      <audio id="audio">
        <source src={song.previewUrl} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={song.trackCensoredName} songArtist={song.artistName} />
      <div className="controls">
        {playing ?
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
      </div>
    </div>
  );
}

