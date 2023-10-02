import '../../style/installablepackage.css';
import {useState} from "react";
import {Button} from "@mui/material";
import React from 'react';

import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";


const InstallablePackagesData = (props) => {


  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  /*
  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}} { Make the file input element invisible }
      />
    </>
  );
  */

    const content =
        <div className="main">
            <span>
                <div> 
                    <h1>Name: </h1> <p>{props.name}</p>
                    <BsFillEyeFill />
                    <AiFillEdit />
                    <BsFillTrashFill />
                    <h2>Context: </h2> <p>{props.context}</p>
                </div>
            </span>
            <span>
                <h2>Description: </h2> <p>{props.description}</p>
                <h2>Description Language: </h2> <p>{props.cultureCode}</p>
            </span>
            <span>
                <h2>StartPath: </h2> <p>{ props.startPath }</p>
                <h2>StartArguments: </h2> <p>{ props.startArguments }</p>
            </span>
            <span>
                <h2>ReleaseNotes: </h2> <p>{props.releaseNotes}</p>
                <h2>SortOrder: </h2> <p>{props.sortOrder}</p>
            </span>
            <span>
                <h2>IconURL: </h2>  <p>{props.iconUrl}</p>
                <p>IconFile: <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} /> </p>
                <Button onClick={handleClick}>Upload a file</Button>
            </span>
        </div>
        
    return (
        <div>
            {content}
        </div>
    )
}

export default InstallablePackagesData;