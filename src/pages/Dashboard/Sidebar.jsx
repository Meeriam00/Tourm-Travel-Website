import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../pages/Dashboard/Sidebar.scss'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const navigate = useNavigate()
  const {t}=useTranslation();

  return (
    <section className="sidebar">
      <h3>Tourm Travel</h3>
      <div className="linear"></div>
      <ul>
        <li onClick={() => navigate('/dashboard/destination-list')}>{t('header.destination')}</li>
        <li onClick={() => navigate('/dashboard/guider-list')}>{t('header.guider')}</li>
        <li onClick={() => navigate('/dashboard/activity-list')}>{t('header.activity')}</li>
        <li onClick={() => navigate('/dashboard/faq-list')}>{t('header.faq')}</li>
        <li onClick={() => navigate('/dashboard/blog-category-list')}>{t('header.blogcat')}</li>
        <li onClick={() => navigate('/dashboard/blog-list')}>{t('header.blog')}</li>
        {/* <li onClick={() => navigate('/dashboard/trip-list')}>{t('header.trips')}</li> */}
      </ul>
    </section>
  )
}

export default Sidebar
