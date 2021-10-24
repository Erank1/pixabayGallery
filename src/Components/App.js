import SearchBar from "./SearchBar";
import ImagePage from "./ImagePage"
import SavedList from "./SavedList";
import { useState, useEffect } from "react";

function App() {
    const [search_term, setSearchTerm] = useState('');
    const [fetched, setFetched] = useState([]);
    const [savedList, setSavedList] = useState([]);

    const setTerm = ((search)=>{
        setSearchTerm(search);
    });
    const setFetch = ((ob)=>{
        setFetched(ob);
    });
    const setSaved = ((term)=>{
        if(!savedList.includes(term))
            setSavedList([...savedList, term]);
    });
    // const initializeSaved = (()=>{
    //     setSavedList([]);
    //     localStorage.removeItem('savedList');
    // });

    useEffect(()=>{
        const fetchPictures = (async ()=>{
            const URL = `https://pixabay.com/api/?key=23970323-d5496006ab582936ac74a116c&q=
        ${encodeURIComponent(search_term)}&image_type=photo&pretty=true`;
            const response = await fetch (URL);
            if(!response.ok)
                throw response.status;
            const ob = await response.json();
            setFetch(ob.hits);
        });
        if(search_term !== '')
            fetchPictures()
                .then(r => r)
                .catch(e => console.log(`Error while fetching: ${e}`));
        else{
            setFetch([])
        }
    }, [search_term],[setSavedList]);

    useEffect(()=>{
        if(savedList.length !== 0)
        localStorage.setItem('savedList', savedList.toString());
    }, [savedList]);

    useEffect(()=>{
        if(localStorage.getItem('savedList') !== null)
            setSavedList(localStorage.getItem('savedList').split(','));
    }, []);

    return (
    <div className="App">
      <header className="accordion-header">
       <div className="container-fluid col-12 text-center bg-light p-5">
           <h1 className="text-primary display-1">Image Gallery</h1>
           <SearchBar search_term ={search_term} setSearchTerm={setTerm} setSaved={setSaved} />
           <SavedList savedList={savedList} setSearchTerm = {setTerm} initializeSaved={initializeSaved} />
       </div>
      </header>
        <main>
            <div className="container-fluid align-content-center w-100" id="ResultsBlock">
                <ImagePage imagesList={fetched} />
            </div>
        </main>
    </div>
  );
}

export default App;
