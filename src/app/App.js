import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import Spotify from '../utils/Spotify.js';

function App() {

  // create state hooks that manages the characteristics of our application
  const [searchResults, setsearchResults] = useState([]);
  const [playListName, setplayListName] = useState("Create New Playlist");
  const [playListTracks, setplayListTracks] = useState([]);

  // at the start of this app component, provide default values for searchResults (lifecycle hook)
  useEffect(() => {

    const token = Spotify.getAccessToken();

    setsearchResults([
      // {
      //   id: 1,
      //   name: "Track 1",
      //   artist: "Track 1 Artist",
      //   album: "Track 1 Album"
      // },
      // {
      //   id: 2,
      //   name: "Track 2",
      //   artist: "Track 2 Artist",
      //   album: "Track 2 Album"
      // },
      // {
      //   id: 3,
      //   name: "Track 3",
      //   artist: "Track 3 Artist",
      //   album: "Track 3 Album"
      // },
    ]);
  }, []);

  // function addTrack will be passed to component SearchResults
  function addTrack(track) {
    // check whether track passed in is found in state playListTracks
    const existTrack = playListTracks.find((currentTrack) => track.id === currentTrack.id);
    // store track is only track is NOT found in state playListTracks

    if (!existTrack)
      setplayListTracks([track, ...playListTracks]);

    return;
  }

  function removeTrack(track) {
    const filteredTrack = playListTracks.filter((currentTrack) => track.id !== currentTrack.id);
    setplayListTracks(filteredTrack);
  }

  // stores a new play list name
  function updatePlayListName(name) {
    // store the name in playListName
    setplayListName(name);
  }

  function savePlaylist() {
    const trackURIs = playListTracks.map((track) => track.uri);
    console.log(trackURIs);
    // updatePlayListName("Create New Playlist");
    // setplayListTracks([]);

    Spotify.savePlaylist(playListName, trackURIs).then(() => {
      updatePlayListName("Create New Playlist");
      setplayListTracks([]);
    })
  }

  function search(term) {
    Spotify.search(term).then((result) => setsearchResults(result));
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist onSave={savePlaylist} playListName={playListName} playListTracks={playListTracks} onRemove={removeTrack} onNameChange={updatePlayListName} />
        </div>
      </div>
    </div>
  );
}

export default App;