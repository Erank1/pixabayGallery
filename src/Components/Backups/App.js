//import logo from './logo.svg';
import './App.css';
import SearchBar from "../SearchBar";

function App() {
  return (
    <div className="App">
      <header className="accordion-header">
       <div className="container-fluid col-12 text-center bg-light p-5">
           <h1 className="text-primary display-1">Image Gallery</h1>
           <SearchBar />
       </div>
      </header>
        <main>
            <div className="container-fluid align-content-center w-100" id="ResultsBlock">
            </div>
        </main>
    </div>
  );
}

export default App;
