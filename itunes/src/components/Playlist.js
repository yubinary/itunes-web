import React from 'react';
import { BiMinus } from 'react-icons/bi';

export default function Playlist({ playlist, setPlaylist, cropParagraph }) {

  // remove the song when clicked
  function handleRemove(i) {
    let before = playlist.slice(0, i);
    let after = playlist.slice(i + 1);
    setPlaylist([...before, ...after])
  }

  // display playlist
  function displayPlaylist(playlists) {
    let result = [];
    // first element is the song playing
    for (let i = 1; i < playlists.length; i++) {
      let playlist = playlists[i];
      result.push(
        <div className="next-song">
          <p>{i}</p>
          <div className="info">
            <h1>{cropParagraph(playlist.trackCensoredName, 20)}</h1>
            <p>{cropParagraph(playlist.artistName, 40)}</p>
          </div>
          <BiMinus className="minus" onClick={() => handleRemove(i)} />
        </div>
      )
    } return result;
  }

  return (
    <div>
      <h3>Up Next</h3>
      {displayPlaylist(playlist)}
    </div>
  )
}