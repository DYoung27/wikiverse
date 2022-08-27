import React, {useState, useEffect} from "react";
import apiURL from '../api';


export const AddPage = ({setCurrentViewPoint}) => {

    const [formInputs, setFormInputs] = useState({})

    async function submitHandler (e) {
        e.preventDefault()
        try {
            const response = await fetch(`${apiURL}/wiki`, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "accept" : "application/json",
                    },
                body: JSON.stringify(formInputs)
                
            })
            const data = await response.json()
            console.log(data)
            
            setFormInputs({})
            e.target.reset()
        
        } 
        catch (err) {
            console.log(err)
        }
    }
    
    function onChangeHandler (e) {
        let formData = formInputs
        formData[e.target.name] = e.target.value
        setFormInputs(formData)
        console.log(formInputs)
    }

    function runner () {
        location.reload()
        setCurrentViewPoint('PageList')
    }

    const arr = ['title', 'slug', 'content', 'name', 'email', 'tags']

    return <div>
        <form id="newPage" onSubmit={submitHandler}>
            {arr.map(i => {return <div>
                <label htmlFor={i} >{i}: </label>
                <input name={i} value={formInputs[i]} onChange={onChangeHandler}></input>
             </div>})}

            <button form="newPage">Submit</button>
            <button type="button" onClick={()=> runner()}>Back</button>

        </form>
    </div>
}