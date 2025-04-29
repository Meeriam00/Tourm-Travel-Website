import React from 'react'
import TopSection from '../../components/TopSection/TopSection'
import { useGetTourQuery } from '../../tools/services/tripApi';
import Preloader from '../../components/Preloader/Preloader';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdPeople } from 'react-icons/io';
import { GoClock } from 'react-icons/go';
import { MdDirectionsBike } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext';
import slugify from 'slugify';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import '../Recomended/Recomended.scss'
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const Recomended = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { data: trips, isLoading } = useGetTourQuery();
  const { wishlist, toggleWishlist } = useCart();

  if (isLoading) {
    return <Preloader />;
  }


  return (
    <>
      {/*------------------------------------------Top Section Recommended Page-----------------------------------*/}
      <TopSection title={i18n.language === 'az' ? "Rezerv etdiyiniz üçün təşəkkür edirik!" : "Thank You for Booking!"} currentPage={i18n.language === 'az' ? "Təşəkkür edirəm" : "Thank You"} />




      {/*----------------------------------------------Recommended Trips-------------------------------------------*/}
      <section className="recommended-trips">
        <div className="container">
          <div className="row">

            {/*-------------------------Basket Title-----------------------*/}
            <div className="recommended-title">
              <h2>{i18n.language === 'az' ? "Daha çox səyahətlərə baxın" : "See More Trips"}<span id='arrow-right'><FaArrowRight onClick={() => navigate('/trips')} /></span></h2>
              <div className="linear"></div>
            </div>

            {trips?.slice(0, 3).map((trip) => (
              <div className="col-12 col-lg-4 col-md-4 col-sm-12 col-xs-12 pe-4">
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
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Recomended