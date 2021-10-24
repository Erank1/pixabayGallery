import keygen from "./KeyGenerator";
import {Dropdown} from "react-bootstrap";
import {useState} from "react";

/**
 * This is the search term saved list component, that returning the list from "savedList" state, and
 * use to change the search term by choosing object from the list.
 * @param savedList
 * @param setSearchTerm
 * @returns {JSX.Element}
 * @constructor
 */
const SavedList = ({savedList, setSearchTerm})=>{
    const [toRender] = useState(new Set())
    const savedHandler = (e)=>{
        setSearchTerm(e.target.getAttribute('value'));
    }

    function buildSavedList(){
        toRender.clear();
        for(let i of savedList){
            toRender.add(<Dropdown.Item value={i} key={keygen.getUniqueKey()} onClick={savedHandler}>{i}</Dropdown.Item>)
        }
    }

    buildSavedList();

    return(
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="primary">
                    Saved search
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {toRender}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );

}
export default SavedList;