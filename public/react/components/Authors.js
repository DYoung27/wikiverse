import React, {useState, useEffect} from "react";
import apiURL from '../api';

export const Authors = ({setCurrentViewPoint}) => {

    const [tag, setTag] = useState('')
    const [found, setFound] = useState([])

    const clickHandler = async (e) => {
        const res = await fetch(`${apiURL}/wiki/search?search=${tag}`) 
    }
    const onChangeHandler = (e) => {
        setTag(e.target.value)
        console.log(tag)
    }

    return <>
        <form id='searchTag' onSubmit={clickHandler}>
            <input id='searchBar' name='searchBar' value={formInputs[i]} onChange={onChangeHandler} placeholder={i}></input>
            <br/>
            <button className='button' form="searchTag">Search</button>
            <button className='button' type="button" onClick={() => setCurrentViewPoint('PageList')}>Return Home Page</button>
        </form>
    </>
}