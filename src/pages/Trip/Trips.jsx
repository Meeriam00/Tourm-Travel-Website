import React, { useState } from 'react'
import TopSection from '../../components/TopSection/TopSection'
import '../Trip/Trips.scss'
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { FaAppStoreIos, FaHeart } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { Menu, Slider } from 'antd'
import { MdDirectionsBike, MdOutlineTravelExplore, MdPriceCheck } from 'react-icons/md'
import { RxActivityLog } from 'react-icons/rx'
import { GiDuration } from 'react-icons/gi'
import { ul } from 'motion/react-client'
import { GoClock } from 'react-icons/go'
import { IoMdPeople } from 'react-icons/io'
import { useGetDestinationsQuery } from '../../tools/services/destinationApi'
import { useGetActivitiesQuery } from '../../tools/services/activityApi'
import { useGetTourQuery } from '../../tools/services/tripApi'
import { useNavigate } from 'react-router'
import slugify from 'slugify'
import Preloader from '../../components/Preloader/Preloader'
import { useCart } from '../../Context/CartContext'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'







const Trips = () => {


  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 4;


  const { data: trips, isLoading } = useGetTourQuery();
  const { data: destinations } = useGetDestinationsQuery();
  const { data: activities } = useGetActivitiesQuery();


  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [durationRange, setDurationRange] = useState([1, 10]);




  if (isLoading) {
    return <Preloader />;
  }





  // Pagination
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips?.slice(indexOfFirstTrip, indexOfLastTrip);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);






  //  Filter trips for activity and destinations
  const filteredTrips = currentTrips?.filter((trip) => {
    const matchesActivity = selectedActivity ? trip.activity.some((act) => act._id === selectedActivity) : true;
    const matchesDestination = selectedDestination ? trip.destination.some((dest) => dest._id === selectedDestination) : true;
    const matchesPrice = trip.tripInfo.discount > 0
      ? trip.tripInfo.discountedprice >= priceRange[0] && trip.tripInfo.discountedprice <= priceRange[1]
      : trip.tripInfo.originalprice >= priceRange[0] && trip.tripInfo.originalprice <= priceRange[1];
    const matchesDuration = trip.duration >= durationRange[0] && trip.duration <= durationRange[1];

    return matchesActivity && matchesDestination && matchesPrice && matchesDuration;
  });





  return (
    <>

      {/*------------------------------------------------------------Top of Page------------------------------------------------*/}
      <TopSection title={t('header.trip')} currentPage={t('header.trip')} />







      {/*-------------------------------------------------------------Trips-----------------------------------------------------*/}
      <section className="trips-container">
        <div className="container">
          <div className="row">


            <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="categories">
                <h4>Criteria</h4>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDestination" aria-expanded="true" aria-controls="collapseDestination">
                      {t('header.destination')}
                    </button>
                  </h2>
                  <div id="collapseDestination" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <ul>
                        {destinations?.map((destination) => (
                          <li key={destination.id}>
                            <input
                              type="checkbox"
                              checked={selectedDestination === destination._id}
                              onChange={() =>
                                setSelectedDestination(
                                  selectedDestination === destination._id ? null : destination._id
                                )
                              }
                            />{' '}
                            {i18n.language === 'az' ? destination.destTitleAz : destination.destTitleEn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>




                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseActivities" aria-expanded="true" aria-controls="collapseActivities">
                      {t('header.activity')}
                    </button>
                  </h2>
                  <div id="collapseActivities" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <ul>
                        {activities?.map((activity) => (
                          <li key={activity._id}>
                            <input
                              type="checkbox"
                              checked={selectedActivity === activity._id}
                              onChange={() =>
                                setSelectedActivity(
                                  selectedActivity === activity._id
                                    ? null
                                    : activity._id
                                )
                              }
                            />{' '}
                            {i18n.language === 'az' ? activity.actTitleAz : activity.actTitleEn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>




                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrice" aria-expanded="true" aria-controls="collapsePrice">
                      {t('home.price')}
                    </button>
                  </h2>
                  <div id="collapsePrice" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <Slider
                        range
                        min={0}
                        max={3000}
                        defaultValue={priceRange}
                        onChange={(value) => setPriceRange(value)}
                        tooltip={{ formatter: (value) => `$${value}` }}
                      />
                      <div className='range' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>

                    </div>
                  </div>
                </div>




                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDuration" aria-expanded="true" aria-controls="collapseDuration">
                      {t('home.duration')}
                    </button>
                  </h2>
                  <div id="collapseDuration" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <Slider
                        range
                        min={1}
                        max={10}
                        defaultValue={durationRange}
                        onChange={(value) => setDurationRange(value)}
                        tooltip={{ formatter: (value) => `${value} day(s)` }}
                      />
                      <div className='range' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                        <span>{durationRange[0]} {t('home.days')} </span>
                        <span>{durationRange[1]} {t('home.days')}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>





            <div className="col-12 col-lg-8 col-md-12 col-sm-12 col-xs-12 d-flex flex-column align-items-start">
              <div className="trips">
                {filteredTrips.length > 0 ? (
                  filteredTrips?.map((trip) => (
                    <div className="col-12 col-lg-6 col-md-6 col-sm-12 col-xs-12 pe-4">
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
                            <p>
                              <FaHeart
                                onClick={() => {
                                  const user = JSON.parse(localStorage.getItem("loggedInUser"));
                                  if (!user) {
                                    Swal.fire({
                                      icon: "warning",
                                      title: i18n.language === 'az' ? "Zəhmət olmasa, daxil olun" : "Please Login",
                                      text: i18n.language === 'az'
                                        ? "İstək siyahısına əlavə etmək üçün daxil olmalısınız!"
                                        : "You need to log in to add to wishlist!",
                                      confirmButtonText: i18n.language === 'az' ? "OK" : "OK",
                                      confirmButtonColor: "#1ca8cb",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        navigate("/login");
                                      }
                                    });
                                    return;
                                  }
                                  toggleWishlist(trip);
                                }}
                                style={{
                                  color: wishlist.some((item) => item._id === trip._id) ? "#1ca8cb" : "#c6c6c6",
                                  cursor: "pointer"
                                }}
                                className="icon"
                              />
                            </p>

                          </div>
                          <div className="holiday-text">
                            <p><IoMdPeople className='icon' />{i18n.language === 'az' ? trip.tripInfo.accommodationAz : trip.tripInfo.accommodationEn}</p>
                            <p><GoClock className='icon' />{trip.duration} {t('home.days')}</p>
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

                          <div className="buttons">
                            <button className='details' onClick={() => navigate(`/trip/${slugify(trip.titleEn, { lower: true })}`)}>{t('home.view-details')}</button>
                          </div>


                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className='no-item'>
                      <h1>{i18n.language === 'en' ? "Ohhh...No such trip found." : "Ohhh...Belə bir səyahət tapılmadı."}</h1>
                      <p>{i18n.language === 'en' ? "There is currently no such trip on our page." : "Hazırda səhifəmizdə belə bir səyahət yoxdur."}</p>
                    </div>
                  </div>
                )}






              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(trips?.length / tripsPerPage) }, (_, index) => (
                  <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                    {index + 1}
                  </button>
                ))}
              </div>

            </div>







          </div>
        </div>
      </section>












    </>
  )
}

export default Trips