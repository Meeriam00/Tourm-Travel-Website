import React from 'react'
import '../NotFoundPage/NotFound.scss'
import TopSection from '../../components/TopSection/TopSection'

const NotFoundPage = () => {
  return (
    <>

{/* <TopSection title="The page you are looking for doesn't exist." currentPage="404 Not Found" /> */}


 <div className="not-found-container">
  <img src="https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif" alt="not-found-page" />
 </div>
    </>
  )
}

export default NotFoundPage