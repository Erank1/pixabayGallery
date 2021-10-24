/**
 * This is SearchBar component, that returning the search bar and it's elements.
 * Its updating "search_term" state and adding to the saveList state elements if called by handler.
 * @param search_term
 * @param setSearchTerm
 * @param setSaved
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = ({search_term ,setSearchTerm, setSaved})=>{

    function inputHandler(e){
        setSearchTerm(e.target.value);
    }
    function saveSearchHandler(){
        if(search_term !== '')
            setSaved(search_term);
    }

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