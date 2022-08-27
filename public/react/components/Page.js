import React, {useEffect, useState} from 'react';
import apiURL from '../api';

export const Page = ({changeBackground ,setCurrentViewPoint, setPageView, page}) => {

  const [author, setAuthor] = useState({})
  const [tags, setTags] = useState([])
  const [date, setDate] = useState('')
  

  const clickHandler = () => {
		//setIsPageView(false)
    setPageView({})
    setCurrentViewPoint('PageList')

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

		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchContent();
	}, []);

  return <>
      <br/>
      <h2><u>{page.title}</u></h2>
      <p><b>Author:</b> {author.name} </p>
      <p><b>Published:</b> {date} </p>
      <br/>
      <p> <u><b>Content</b></u></p>
      <p>{page.content}</p>
      <br/>
      {tags.map(i => i.map(j => <p>#{j.name}</p>))}
      <br/>
      <button onMouseOver={e => changeBackground(e, 'grey')} onMouseLeave={e => changeBackground(e, '')} onClick={() => clickHandler()}>Return To Home Page</button>
  </>
} 
	