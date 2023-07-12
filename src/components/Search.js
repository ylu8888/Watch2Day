import React from 'react';

//search component takes in two props, search and setSearch, to render an input field in search
const Search = (props) => {
    return(

        <div className="col col-sm-4">
            <input className="form-control" 
            value={props.value}
            onChange={(e)=> props.setSearch(e.target.value)}
             placeholder="Search for any movie!"></input>

        </div>
      
    )
}

export default Search;