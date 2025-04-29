import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../TopSection/TopSection.scss'

const TopSection = ({title,currentPage}) => {
  const {t}=useTranslation();
  return (
    <>


{/*----------------------------------------------------------------------TOP-OF-PAGE------------------------------------------------------------*/}
<section className="top_of_page">
            <h1>{title}</h1>
            <ul>
              <li><Link to={'/'}>{t('header.home')}</Link></li>
              <li><FaArrowRight className='right-icon' /></li>
              <li>{currentPage}</li>
            </ul>
</section>



    </>
  )
}

export default TopSection