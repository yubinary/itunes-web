import React, { useState } from 'react';
import axios from 'axios';
import SideBar from "./SideBar.js";

import "../styles/MainContent.css";
import { BiSearch } from 'react-icons/bi';
import { FiGithub } from 'react-icons/fi';
import { BsPlus, BsPlayFill } from 'react-icons/bs';

export default function MainContent() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);

  // make get song request to Apple Music API
  function fetchEntity(entity, limit, setFunction) {
    // entity list: musicArtist, album, song
    let url = "https://itunes.apple.com/search?term=" + searchTerm + "&limit=" + limit + "&entity" + entity;
    axios.get(url)
      .then(result => {
        setFunction(result.data.results);
      })
      .catch(error => {
        console.error(error);
      })
  }

  // pass song prop when song clicked
  function handleClick(song) {
    setSongToPlay(song)
  }

  // add clicked song to the playlist
  function handleAdd(song) {
    setPlaylist([...playlist, song]);
  }
  console.log(playlist);

  // fetch search term to when button clicked
  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    fetchEntity("song", 20, setSongs);
    fetchEntity("album", 40, setAlbums);
  }

  // helper function that converts milliseconds to minutes
  function convertToMin(ms) {
    let min = Math.floor(ms / 60000);
    let sec = (ms % 60000) + "";
    return min + ":" + sec.substring(0, 2);
  }

  // helper function that crops paragraph by given length
  function cropParagraph(p, len) {
    let crop = "";
    if (p && p.length > len) {
      crop = p.substring(0, len - 2) + "..."
    } else {
      crop = p;
    } return crop;
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
                <BsPlus className="plus" onClick={() => handleAdd(songl)} />
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
                <BsPlus className="plus" onClick={() => handleAdd(songr)} />
              </div>
            </div >
          </div>
        )
      }
    }
    return result;
  }

  // display albums
  function displayAlbum(albums) {
    let result = [];
    if (albums.length === 0) {
      result.push(
        <div className="album">
          <p>no result</p>
        </div>
      )
    } else {
      let names = [];
      for (let i = 0; i < albums.length; i++) {
        let album = albums[i];
        if (names.includes(album.collectionCensoredName)) {
          continue;
        } else {
          names.push(album.collectionCensoredName);
          result.push(
            <div key={i} className="album" onClick={() => handleClick(album)}>
              <img src={album.artworkUrl100} alt={album.artworkUrl100} />
              <div className="album-info">
                <h1>{cropParagraph(album.collectionCensoredName, 18)}</h1>
                <p>{cropParagraph(album.artistName, 20)}</p>
              </div>
            </div >
          )
        }
        if (result.length === 5) return result;
      }
    }
    return result;
  }

  return (
    <div className="body">
      <div className="main-content">
        <div className="header">
          <FiGithub className="github" />
          <form className="input"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="find" type="submit"><BiSearch className="search-icon" /></button>
          </form>
        </div>
        <div className="results">
          <h2>Albums</h2>
          <div className="album-list">
            {displayAlbum(albums)}
          </div>
          <h2>Songs</h2>
          {displaySong(songs)}
        </div>
      </div>
      <SideBar song={songToPlay} playlist={playlist} />
    </div>
  )
} 