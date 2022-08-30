import React from 'react';
import apiURL from '../api';

export const PagesList = ({pages, setCurrentViewPoint, setPageView, setPagesCollection, fetchPages}) => {

	const clickHandler = (page) => {
		setPageView(page)
		setCurrentViewPoint('Page')
	}

	const errorText = (text, bt) => {
		const error = document.getElementById('error')
		error.innerText = text
		error.style.borderTop = bt
	}

    const findHandler = async (e) => {   
		e.preventDefault()
		const error = document.getElementById('error')
		if (e.target.value) {
            try {
				const res = await fetch(`${apiURL}/wiki/search?search=${e.target.value}`)
                const pagesData = await res.json()
				setPagesCollection(pagesData)
				console.log(pagesData)
				if (!pagesData.length) {
					const res2 = await fetch(`${apiURL}/wiki/search2?search=${e.target.value}`)
					const pagesData2 = await res2.json()
					setPagesCollection(pagesData2)
					if (!pagesData2.length) {
						errorText('No Pages Found','3px solid')
					}
				}
            }
            catch (err) {console.log(err)}
		}
		else {
			fetchPages()
			errorText('', '')
		}
    }

	const clearText = () => {
		const searchBar = document.getElementById('searchBar')
		if (searchBar.value){
			searchBar.value = ''
			fetchPages()
			errorText('', '')
		}
	}
	

	return <>
		
		<br/>
		<h2 className='pageHeads'><b>Functions</b></h2>
		<h3 className='pages' onClick={() => setCurrentViewPoint('AddPage')} >Add a page</h3>
		<h3 className='pages' onClick={() => setCurrentViewPoint('SearchPage')} >Search a page</h3>
		<br/>
		<h2 className='pageHeads'><b>Pages</b></h2>
		{
			pages.map((page, idx) => {
				return <> 
					<h3 className='pages' key={idx} onClick={() => clickHandler(page)}>{page.title}</h3> 
				</>
			})
		}
		<h3 id='error'></h3> 
		<div id='searchTag'>
            <input id='searchBar' name='searchBar' onChange={findHandler} placeholder='Search by Author or Tag'></input>
            <br/>
            <button id= 'searchButton' className='button' onClick={() => clearText()}>Clear Text</button>
        </div>
	</>
} 
