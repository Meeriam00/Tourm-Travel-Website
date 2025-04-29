import React from 'react'
import '../Activity/Activity.scss'
import { FaArrowRight } from 'react-icons/fa'
import TopSection from '../../components/TopSection/TopSection'
import { useGetActivitiesQuery } from '../../tools/services/activityApi'
import Preloader from '../../components/Preloader/Preloader'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'



const Activity = () => {
  const { t } = useTranslation();
    const { i18n } = useTranslation();
  const navigate=useNavigate();
  const { data: activities, isLoading } =useGetActivitiesQuery();
  
  if (isLoading) {
    return <Preloader/>; 
  }




// const activities=[
//   {
//     id:1,
//     trip_count:"5 Trips",
//     title:"Hiking",
//     image:activity1,
//   },
//   {
//     id:2,
//     trip_count:"3 Trips",
//     title:"Jungle Safari",
//     image:activity2,
//   },
//   {
//     id:3,
//     trip_count:"3 Trips",
//     title:"Kayaking",
//     image:activity3,
//   },
//   {
//     id:4,
//     trip_count:"2 Trips",
//     title:"Paragliding",
//     image:activity4,
//   },
//   {
//     id:5,
//     trip_count:"4 Trips",
//     title:"Peak Climbing",
//     image:activity6,
//   },
//   {
//     id:6,
//     trip_count:"4 Trips",
//     title:"Road Cycling",
//     image:activity5,
//   },
// ]
// // Activities





  return (
<>
{/*-------------------------------------------------------------------TOP-OF-PAGE------------------------------------------------------------*/}
<TopSection title={t('header.activity')} currentPage={t('header.activity')}  />




{/*-------------------------------------------------------------------Activity----------------------------------------------------------------*/}
<section className="activities">
<div className="container">
    <div className="row">
                      {activities?.map((activity) => (
                          <div key={activity._id} className='col-12 col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                              <div className="activity-item">
                                <div className="activity-image">
                                <img src={`https://tourm-travel-backend-2.onrender.com/${activity.actImg.replace(/\\/g, '/')}`} alt={activity.actTitleEn} />
                                </div>
                                <span>({activity.tripCount}) {t('header.trip')}</span>
                                <button onClick={()=>navigate('/trips')}>{i18n.language === 'az' ? activity.actTitleAz : activity.actTitleEn}<FaArrowRight className='right-icon' /></button>
                              </div>
                          </div>
                      ))}
    </div>
</div>
</section>







   </>
  )
}

export default Activity