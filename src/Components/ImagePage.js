import React from "react";
import keygen from "./KeyGenerator";

/**
 * Class Image is for creating object for each image.
 */
class Image{
    constructor(img) {
        this.imgSRC = img;
        this.imgElement = this.createImageElementToDiv();
        this.key = keygen.getUniqueKey();
    }
    createImageElementToDiv(){
        return React.createElement('img', {
             src: this.imgSRC,
             className: "rounded float-end w-100 pt-3",
         });
    }
}

/**
 * This function handling the build of the ImagesPage by rows and cols.
 * @param imagesList
 * @returns {*[]}
 * @constructor
 */
const CraftingImagesPage = ({imagesList})=> {

    /**
     * Creating imagesElement from imagesList
     * @returns {*[]}
     */
    function craftingImagesPage() {
        const imagesElements = [];
        for (let i of imagesList) {
            const img = new Image(i.webformatURL);
            imagesElements.push(img);
        }
        return imagesElements.reverse();
    }

    const imagesElements = craftingImagesPage();

    /**
     * returning only four cols each call, so each row gets 4 cols.
     * @returns {*[]}
     */
    function fourColsGen() {
        const result = [];
        for (let i = 0; i < 4 && imagesElements.length > 0; i++) {
            let item = imagesElements.pop();
            if (item === undefined)
                break;
            result.push(<div key={item.key} className="col-12 col-sm-6 col-lg-3">{item.imgElement}</div>);
        }
        return result;
    }
    const rows = [];

    /**
     * Generating rows list.
     */
    while (imagesElements.length > 0) {
        rows.push(<div key={keygen.getUniqueKey()} className="row justify-content-center h-25">{fourColsGen()}</div>)
    }
    return rows;
}
/**
 * returning the Component with the complete rows.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ImagePage = (props)=>{
    const rows = CraftingImagesPage(props)
    return(
        <>
            {rows}
        </>
    )

}
export default ImagePage;