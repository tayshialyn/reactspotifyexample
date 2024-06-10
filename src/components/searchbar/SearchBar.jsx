import {useState} from 'react'
import "./SearchBar.css"
function SearchBar({onSearch}) {

  const [searchedTerm, setsearchedTerm] = useState("");

  function handleSearch(event) {
    onSearch(searchedTerm);
  }

  // function that passes the value from the input to onSearch
  function handleSearchChange(event) {
    setsearchedTerm(event.target.value);
  }
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchChange} />
      <button className="SearchButton" onClick={handleSearch} >SEARCH INFO.</button>
    </div>
  )
}

export default SearchBar