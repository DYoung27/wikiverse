import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';
import { AddPage } from './AddPage';
import { Authors } from './Authors';


// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	//const [pages, setPages] = useState([]);
	const [pagesCollection, setPagesCollection] = useState([]);
	const [pageView, setPageView] = useState({});
	const [currentViewPoint, setCurrentViewPoint] = useState('PageList')

	const viewPoints = {
		PageList: <PagesList setPageView = {setPageView} setCurrentViewPoint = {setCurrentViewPoint} pages={pagesCollection} setPagesCollection={setPagesCollection} fetchPages={fetchPages}/>,
		
		AddPage: <AddPage setCurrentViewPoint = {setCurrentViewPoint} />,
		
		Page: <Page page={pageView} setCurrentViewPoint = {setCurrentViewPoint} setPageView={setPageView}/>,

		//Authors : <Authors setCurrentViewPoint= {setCurrentViewPoint}/>
	}

	async function fetchPages(){

		try {
			const res = await fetch(`${apiURL}/wiki`);
			const pagesData = await res.json();
			//console.log(pagesData)
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
      <h1><u>WikiVerse</u></h1>
	  {
		viewPoints[currentViewPoint]
	  }
		</main>
	)
}