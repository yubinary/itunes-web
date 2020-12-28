import React, { useState } from 'react';
import axios from 'axios';
import "../styles/MainContent.css";
import { BiSearch } from 'react-icons/bi';

export default function MainContent() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // make get request to Apple Music API
  function makeUrl() {
    let url = "https://itunes.apple.com/search?term=" + searchTerm + "&limit=25.";
    axios.get(url)
      .then(result => {
        setSongs(result.data.results);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    makeUrl();
  }

  console.log(songs)

  function displaySong(songs) {
    let result = [];
    if (songs === []) {
      result.push(
        <div>
          <p>no result</p>
        </div>
      )
    } else {
      for (let i = 0; i < 5; i++) {
        let song = songs[i];
        result.push(
          <div key={i} className="song">
            <img src={song.artworkUrl100} alt={song.artworkUrl100} />
            <div className="song-info">
              <h1>{song.trackCensoredName}</h1>
              <p>{song.artistName}</p>
            </div>
          </div>
        )
      }
    }
    return result;
  }


  return (
    <div className="main-content">
      <div className="header">
        <h1>Explore Songs</h1>
        <form className="input"
          onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Find song"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit"><BiSearch className="search-icon" /></button>
        </form>
      </div>
      {displaySong(songs)}
    </div>
  )
} 