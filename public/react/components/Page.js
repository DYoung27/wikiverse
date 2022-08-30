import React, {useEffect, useState} from 'react';
import apiURL from '../api';

export const Page = ({setCurrentViewPoint, setPageView, page}) => {

  const [author, setAuthor] = useState({})
  const [tags, setTags] = useState([])
  const [date, setDate] = useState('')
  const [edit, setEdit] = useState(false)

  const clickHandler = () => {
    setPageView({})
    setCurrentViewPoint('PageList')
    location.reload()

	}

  const deleteHandler = async () => {
    if (confirm("Confirm Page Deletion")) {
      try {
        const res = await fetch(`${apiURL}/wiki/${page.slug}`, {
          method: 'Delete',
        });
        const pagesData = await res.json();
        clickHandler()
      } 
      catch (err) {
        console.log("Oh no an error! ", err)
      }
    }
  }

  const fetchContent = async () => {
		try {
			const res = await fetch(`${apiURL}/wiki/${page.slug}`);
			const pagesData = await res.json();
      const time = new Date(page.createdAt)
      const formattedDate = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
      setDate(formattedDate)
			setAuthor(pagesData.author);
      setTags([pagesData.tags]);

		} 
    catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchContent();
	}, []);

  const showContent = () => {
    if (!edit) {return <>
    <p id='contentPara'>{page.content}</p><br/>
    <button id='updateBtn' onClick={() => setEdit(!edit)}>update content</button></>
    }
    return <>
      <textarea id='contentBox'>{page.content}</textarea><br/>
      <button id='confirmBtn' onClick={() => {confirmChange()}}>Confirm</button>
      <button id='cancelBtn' onClick={() => {cancelChange()}}>Cancel</button>
    </>
  }

  const cancelChange = () => {
    if(confirm('Confirm Cancel')) {setEdit(!edit)}
  }

  const confirmChange = async () => {
    console.log(page)
    if (confirm('Confirm Content Update')) {
      const text = document.getElementById('contentBox')
      if (page.content == text.value) {setEdit(!edit)}
      page.content = text.value

      try {
            const res = await fetch(`${apiURL}/wiki/${page.slug}`, {
                method: 'PUT',
                headers: {
                  "Content-Type" : "application/json",
                  "accept" : "application/json",
                },
                body: JSON.stringify(page)
                
            })
            const data = await res.json()
        } 
        catch (err) {
            console.log(err)
        }
      setEdit(!edit)
    }
  }

  return <>
      <br/>
      <h2><u>{page.title}</u></h2>
      <p><b>Author: </b> {author.name}</p>
      <p><b>Published: </b>{date}</p><br/>
      <p><u>Content</u></p>
      <div id='content'>
        {showContent()}
      </div>
      <p className='BnU'>Tags</p>
      {tags.map(i => i.map(j => <p style={{color:'blue'}}>#{j.name}</p>))}<br/>
      <button className='button' onClick={() => clickHandler()}>Return Home Page</button>
      <button className='button' onClick={() => deleteHandler()}>Delete Page</button>
  </>
} 
	