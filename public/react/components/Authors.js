import React, {useState, useEffect} from "react";
import apiURL from '../api';

export const Authors = ({setCurrentViewPoint}) => {

    const [authorInputs, setAuthorInputs] = useState({})

    async function submitHandler (e) {
        e.preventDefault()
        if(Object.values(authorInputs).length == 2) {
            try {
                const res = await fetch(`${apiURL}/wiki/author`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        "accept" : "application/json",
                        },
                    body: JSON.stringify(authorInputs)
                    
                })
                const data = await res.json()
                console.log(authorInputs)
                
                setAuthorInputs({})
                e.target.reset()
            
            } 
            catch (err) {
                console.log(err)
            }
        }
        else {alert('All fields must be filled')}
    }
    
    function onChangeHandler (e) {
        let formData = authorInputs
        formData[e.target.name] = e.target.value
        setAuthorInputs(formData)
        console.log(authorInputs)
    }

    function runner () {
        location.reload()
        setCurrentViewPoint('PageList')
    }

    const arr = ['name', 'email']

    return <div>
        <br/><h2 className="pageHeads"><u>Create New Author:</u></h2>
        <form id="newPage" classNamwonSubmit={submitHandler}>
            {arr.map(i => {return <div>
                <input className='input' name={i} value={authorInputs[i]} onChange={onChangeHandler} placeholder={i}></input>
             </div>})}
            <br/>
            <button className='button' form="newPage">Create Author</button>
            <button className='button' type="button" onClick={()=> runner()}>Return Home Page</button>
        </form>
    </div>
}