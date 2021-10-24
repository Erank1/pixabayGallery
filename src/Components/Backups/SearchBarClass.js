import React, { Component } from 'react';
import ImagePage from "./ImagePage";
import ReactDOM from "react-dom";
export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: '',
            to_save: new Set(),
        }
    }
    inputHandler = (e)=>{
        this.setState({search_term: e.target.value});
        this.fetchPictures().then(r => r)
            .catch(e => console.log(`Error while fetching: ${e}`));
    }
    saveSearchHandler = ()=>{
        if(this.state.search_term !== '')
            this.state.to_save.add(this.state.search_term);
        // setTimeout(
        //     ()=>{console.log(this.state)}, 1000
        // )
    }
     fetchPictures = async ()=>{
        const URL = `https://pixabay.com/api/?key=23970323-d5496006ab582936ac74a116c&q=
        ${encodeURIComponent(this.state.search_term)}&image_type=photo&pretty=true`;
        const response = await fetch (URL);
        if(!response.ok)
            throw response.status;
        const ob = await response.json();
        console.log(ob.hits);
         ReactDOM.render(<ImagePage imagesList={ob.hits} />,
             document.querySelector('#ResultsBlock'));
    }

    render(){
        return(
            <div className="input-group mb-3">
                <span className="input-group-text" id="AddToList"
                      data-bs-toggle="tooltip" data-bs-placement="bottom" title="To save your search term"
                      onClick={this.saveSearchHandler}>+</span>
                <input type="text" className="form-control" placeholder="Search any picture"
                       value={this.state.search_term} onChange={this.inputHandler}
                       aria-label="Search" aria-describedby="basic-addon1" />
            </div>
        );
    }
}