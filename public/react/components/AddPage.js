import React, {useState, useEffect} from "react";
import apiURL from '../api';


export const AddPage = ({setCurrentViewPoint}) => {

    const [formInputs, setFormInputs] = useState({})

    async function submitHandler (e) {
        e.preventDefault()
        if(Object.values(formInputs).length == 6) {
            try {
                const res = await fetch(`${apiURL}/wiki`, {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        "accept" : "application/json",
                        },
                    body: JSON.stringify(formInputs)
                    
                })
                const data = await res.json()
                console.log(formInputs)
                
                setFormInputs({})
                e.target.reset()
            
            } 
            catch (err) {
                console.log(err)
            }
        }
        else {alert('All fields must be filled')}
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
        <br/>
        <form id="newPage" onSubmit={submitHandler}>
            {arr.map(i => {return <div>
                <input className='input' name={i} value={formInputs[i]} onChange={onChangeHandler} placeholder={i}></input>
             </div>})}
            <br/>
            <button className='button' form="newPage">Create Page</button>
            <button className='button' type="button" onClick={()=> runner()}>Return Home Page</button>
        </form>
    </div>
}