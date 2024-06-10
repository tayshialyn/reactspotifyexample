import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({ playListTracks, onRemove, playListName, onNameChange, onSave }) {

  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <input value={playListName} onChange={handleNameChange} />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist
        searchResults={playListTracks}
        onRemove={onRemove}
      />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist
