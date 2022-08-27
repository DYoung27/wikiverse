import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { AddPage } from './AddPage';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	//const [pages, setPages] = useState([]);
	const [pagesCollection, setPagesCollection] = useState([]);
	const [pageView, setPageView] = useState({});
	const [currentViewPoint, setCurrentViewPoint] = useState('PageList')

	const changeBackground = (e, color) => {
		e.target.style.background =  color;
	  }

	const viewPoints = {
		PageList: <PagesList setPageView = {setPageView} setCurrentViewPoint = {setCurrentViewPoint} changeBackground={changeBackground} pages={pagesCollection} />,
		
		AddPage: <AddPage setCurrentViewPoint = {setCurrentViewPoint} />,
		
		Page: <Page page={pageView} changeBackground={changeBackground} setCurrentViewPoint = {setCurrentViewPoint} setPageView={setPageView}/>
	}

	async function fetchPages(){
		try {
			const res = await fetch(`${apiURL}/wiki`);
			const pagesData = await res.json();
			setPagesCollection(pagesData);
		} 
		catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
      <h1>WikiVerse</h1>
	  {
		viewPoints[currentViewPoint]
	  }
		</main>
	)
}