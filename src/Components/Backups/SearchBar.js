import React, { Component } from 'react';
import ImagePage from "./ImagePage";
import ReactDOM from "react-dom";
import {useState, useEffect} from "react";




const SearchBar = (props)=>{
    const [search_term, setSearchTerm] = useState('');
    const [savedList, setSavedList] = useState(new Set());
    const [fetched, setFetched] = useState({});

    function inputHandler(e){
        setSearchTerm(e.target.value);
        fetchPictures().then(r => r)
        .catch(e => console.log(`Error while fetching: ${e}`));
    }
    function saveSearchHandler(){
        if(search_term !== '')
            savedList.add(search_term);
    }

    async function fetchPictures(){
        const URL = `https://pixabay.com/api/?key=23970323-d5496006ab582936ac74a116c&q=
        ${encodeURIComponent(search_term)}&image_type=photo&pretty=true`;
        const response = await fetch (URL);
        if(!response.ok)
            throw response.status;
        const ob = await response.json();
        setFetched(ob.hits);
    }
    const renderImagePage = ()=>{
        ReactDOM.render(<ImagePage imagesList={fetched} />,
        document.querySelector('#ResultsBlock'));
    };

    useEffect(()=>{
        //console.log(fetched);
        renderImagePage();
        return () => {renderImagePage()};


    },[fetched]);

    return(
        <div className="input-group mb-3">
                <span className="input-group-text" id="AddToList"
                      data-bs-toggle="tooltip" data-bs-placement="bottom" title="To save your search term"
                      onClick={saveSearchHandler}>+</span>
            <input type="text" className="form-control" placeholder="Search any picture"
                   value={search_term} onChange={inputHandler}
                   aria-label="Search" aria-describedby="basic-addon1" />
        </div>
    );

}
export default SearchBar;