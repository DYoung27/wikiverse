import React from 'react';

export const PagesList = ({pages, changeBackground, setCurrentViewPoint, setPageView}) => {
	const clickHandler = (page) => {
		setPageView(page)
		setCurrentViewPoint('Page')
	}

	return <>
		<h2><b>An interesting Book</b></h2>
		<br/>
		<h3 className='pages' onMouseOver={e => changeBackground(e, 'grey')} onMouseLeave={e => changeBackground(e, '')} onClick={() => setCurrentViewPoint('AddPage')} >Add a page</h3>
		{
			pages.map((page, idx) => {
				return <> 
					<h3 className='pages' key={idx} onMouseOver={e => changeBackground(e, 'grey')} onMouseLeave={e => changeBackground(e, '')} onClick={() => clickHandler(page)}>{page.title}</h3> 
				</>
			})
		}
	</>
} 
