import React from 'react';
import { BsPlus, BsPlayFill } from 'react-icons/bs';

export default function Song({ songs, cropParagraph, handleClick, playlist, setPlaylist }) {

  // helper function that converts milliseconds to minutes
  function convertToMin(ms) {
    let min = Math.floor(ms / 60000);
    let sec = (ms % 60000) + "";
    return min + ":" + sec.substring(0, 2);
  }

  // add clicked song to the playlist
  function handleAdd(event, song) {
    event.stopPropagation();
    setPlaylist([...playlist, song]);
  }

  // display songs
  function displaySong(songs) {
    let result = [];
    if (songs.length === 0) {
      result.push(
        <div className="song">
          <p>no result</p>
        </div>
      )
    } else {
      for (let i = 0; i < songs.length; i += 2) {
        let songl = songs[i];
        let songr = songs[i + 1];
        result.push(
          <div className="row">
            <div key={i} className="song" onClick={() => handleClick(songl)}>
              <img src={songl.artworkUrl100} alt={songl.artworkUrl100} />
              <div className="song-info">
                <h1>{cropParagraph(songl.trackCensoredName, 30)}</h1>
                <p>{songl.artistName}</p>
              </div>
              <div className="song-control">
                <p>{convertToMin(songl.trackTimeMillis)}</p>
                <BsPlus className="plus" onClick={(event) => handleAdd(event, songl)} />
              </div>
            </div >
            <div key={i + 1} className="song" onClick={() => handleClick(songr)}>
              <img src={songr.artworkUrl100} alt={songr.artworkUrl100} />
              <div className="song-info">
                <h1>{cropParagraph(songr.trackCensoredName, 30)}</h1>
                <p>{songr.artistName}</p>
              </div>
              <div className="song-control">
                <p>{convertToMin(songr.trackTimeMillis)}</p>
                <BsPlus className="plus" onClick={(event) => handleAdd(event, songr)} />
              </div>
            </div >
          </div>
        )
      }
    }
    return result;
  }


  return (
    <div>
      <h2>Songs</h2>
      <div className="song-list">
        {displaySong(songs)}
      </div>
    </div>
  )
}