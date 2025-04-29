import React from 'react'
import '../Destinations/Destinations.scss'
import { FaArrowRight } from 'react-icons/fa'



import destinations1 from '../../assets/Images/destinations1.webp'
import destinations2 from '../../assets/Images/destinations2.webp'
import destinations3 from '../../assets/Images/destinations3.webp'
import destinations4 from '../../assets/Images/destinations4.webp'
import destinations5 from '../../assets/Images/destinations5.webp'
import destinations6 from '../../assets/Images/destinations6.webp'
import { Link, useNavigate } from 'react-router-dom'

import best_holiday_1 from '../../assets/Images/best_holiday1.webp'
import best_holiday_3 from '../../assets/Images/best_holiday3.webp'
import { IoLocationOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { IoMdPeople } from "react-icons/io";
import TopSection from '../../components/TopSection/TopSection'
import { useGetDestinationsQuery } from '../../tools/services/destinationApi'
import Preloader from '../../components/Preloader/Preloader'
import { useGetTourQuery } from '../../tools/services/tripApi'
import { MdDirectionsBike } from 'react-icons/md'
import slugify from 'slugify'
import { useTranslation } from 'react-i18next'

const Destinations = () => {

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: destinations, isLoading } = useGetDestinationsQuery();
  const { data: trips, isLoadingtrip } = useGetTourQuery();



  if (isLoading || isLoadingtrip) {
    return <Preloader />;
  }





  return (
    <>
      {/*-------------------------------------------------------------------TOP-OF-PAGE------------------------------------------------------------*/}
      <TopSection title={t('header.destination')} currentPage={t('header.destination')} />






      {/*-------------------------------------------------------------------Destinations-------------------------------------------------------------*/}
      <section className="destinationss">
        <div className="container">
          <div className="row">
            {destinations?.map((destination) => (

              <div key={destination.id} className='col-12 col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                <div className="destinations-item">
                  <div className="destination-image">
                    <img src={`https://tourm-travel-backend-2.onrender.com/${destination.destImg.replace(/\\/g, '/')}`} alt={destination.destTitleEn} />
                  </div>
                  <span>({destination.destCount}) {t('header.trip')}</span>
                  <button onClick={() => navigate('/trips')}>{i18n.language === 'az' ? destination.destTitleAz : destination.destTitleEn}<FaArrowRight className='right-icon' /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>








      {/*-----------------------------------------------------------------Best Holiday Package----------------------------------------------*/}
      <section className="best-holidays-package">

        <div className="best-holiday-text">
          <p>Awesome Tours</p>
          <h1>Best Holiday Package</h1>
        </div>


        <div className="best-holiday">
          <div className="container">
            <div className="row">
              {trips?.slice(0, 3).map((trip) => (
                <div className="col-12 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="best-holiday-items">

                    <div className="item-img">
                      <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[0].replace(/\\/g, '/')}`} alt={trip.titleEn} />
                    </div>

                    <span
                      style={{
                        opacity: trip.tripInfo.discount > 0 ? 1 : 0,
                        pointerEvents: trip.tripInfo.discount > 0 ? 'auto' : 'none'
                      }}
                    >
                      {trip.tripInfo.discount}% Off
                    </span>

                    <div className="holiday-body">
                      <h3>{i18n.language === 'az' ? trip.titleAz : trip.titleEn}</h3>
                      <div className="holiday-text">
                        <p>
                          <IoLocationOutline className='icon' />
                          {trip && trip.destination && trip.destination[0] ?
                            (i18n.language === 'az' ? trip.destination[0].destTitleAz : trip.destination[0].destTitleEn)
                            : (i18n.language=== 'az' ? "Yerli məlumat yoxdur" : "No local information")}
                        </p>
                        <p><GoClock className='icon' />{trip.duration}  {t('home.days')}</p>
                      </div>
                      <p><MdDirectionsBike className='icon' />{i18n.language === 'az' ? trip.activity[0].actTitleAz : trip.activity[0].actTitleEn}</p>
                      <p>{i18n.language === 'az' ? trip.overview.descriptionAz.slice(0, 110) : trip.overview.descriptionEn.slice(0, 110)}...</p>
                    </div>

                    <div className="linear"></div>

                    <div className="holiday-footer">
                      <div className="price">
                        {trip.tripInfo.discount > 0 ? (
                          <>
                            <p id='original-price'><del>${trip.tripInfo.originalprice}</del></p>
                            <p id='discounted-price'>${trip.tripInfo.discountedprice}</p>
                          </>
                        ) : (
                          <p id='original-price-without-discount'>${trip.tripInfo.originalprice}</p>
                        )}
                      </div>
                      <button onClick={() => navigate(`/trip/${slugify(trip.titleEn, { lower: true })}`)} >{t('home.view-details')}</button>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>




























    </>
  )
}

export default Destinations