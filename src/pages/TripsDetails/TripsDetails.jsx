import { Link, useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import { useGetTourQuery } from "../../tools/services/tripApi";
import TopSection from "../../components/TopSection/TopSection";
import '../../pages/TripsDetails/TripsDetails.scss'
import { MdMapsHomeWork, MdNoMealsOuline, MdOutlineEmojiTransportation, MdOutlineEventAvailable } from "react-icons/md";
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import { LuSunMoon } from "react-icons/lu";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoLanguageSharp, IoPeople } from "react-icons/io5";
import { Ri24HoursLine, RiFindReplaceLine } from "react-icons/ri";
import { FaPerson } from "react-icons/fa6";
import { RxActivityLog } from "react-icons/rx";
import { useState } from "react";
import { BsPersonWalking } from "react-icons/bs";
import { useCart } from "../../Context/CartContext";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Preloader from "../../components/Preloader/Preloader";


const TripsDetails = () => {

    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const { data: trips, isLoading } = useGetTourQuery();
    const { addToBasket } = useCart();

    if (isLoading) {
        return <Preloader />;
    }

    const trip = trips?.find(t => slugify(t.titleEn, { lower: true }) === slug);


    const handleAddToBasket = () => {
        try {
            addToBasket(trip);
            Swal.fire({
                title: i18n.language === 'az' ? "Uğurla əlavə olundu!" : "Added successfully!",
                text: i18n.language === 'az'
                  ? `${trip.titleAz} səbətə əlavə olundu.`
                  : `${trip.titleEn} has been added to cart.`,
                icon: "success",
                confirmButtonText: "OK",
                timer: 3000,
                timerProgressBar: true,
              });
              navigate('/trips/basket');
            } catch (error) {
              Swal.fire({
                title: i18n.language === 'az' ? "Əlavə olunmadı!" : "Could not be added!",
                text: i18n.language === 'az'
                  ? "Bu səyahət səbətə əlavə oluna bilmədi."
                  : "This trip could not be added to the cart.",
                icon: "error",
                confirmButtonText: "OK",
              });
        }
    };


    const [activeTab, setActiveTab] = useState("overview");








    const tabContent = trip
        ? {
            overview: {
                title: i18n.language === 'az' ? trip.overview?.titleAz : trip.overview?.titleEn || "No Title",
                description: i18n.language === 'az' ? trip.overview?.descriptionAz : trip.overview?.descriptionEn || "No Description",
            },
            itinerary: {
                title: i18n.language === 'az' ? trip.itinerary?.titleAz : trip.itinerary?.titleEn || "No Title",
                days: [
                    { en: trip.itinerary?.dayOneEn, az: trip.itinerary?.dayOneAz },
                    { en: trip.itinerary?.dayTwoEn, az: trip.itinerary?.dayTwoAz },
                    { en: trip.itinerary?.dayThreeEn, az: trip.itinerary?.dayThreeAz },
                    { en: trip.itinerary?.dayFourEn, az: trip.itinerary?.dayFourAz },
                    { en: trip.itinerary?.dayFiveEn, az: trip.itinerary?.dayFiveAz },
                    { en: trip.itinerary?.daySixEn, az: trip.itinerary?.daySixAz },
                    { en: trip.itinerary?.daySevenEn, az: trip.itinerary?.daySevenAz },
                ].map((day, index) => ({
                    dayNumber: `Day ${index + 1}`,
                    en: day.en || "No description",
                    az: day.az || "No description",
                })),
            },
            cost: {
                title: i18n.language === 'az' ? trip.cost?.titleAz : trip.cost?.titleEn || "No Title",
                description: i18n.language === 'az' ? trip.cost?.descriptionAz : trip.cost?.descriptionEn || "No Description",
            },
        }
        : { overview: { title: "No Title", description: "No Description" } };





    if (!trip) {
        return <h2>Trip not found</h2>;
    }






    return (
        <>
            {/*------------------------------------------------------------Top of Page------------------------------------------------*/}
            <TopSection title={i18n.language === 'az' ? trip.titleAz : trip.titleEn} currentPage={i18n.language === 'az' ? trip.titleAz : trip.titleEn} />






            {/*--------------------------------------------------------Trips Details Images------------------------------------------*/}
            <section className="images">
                <div className="left-image">
                    <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[0].replace(/\\/g, '/')}`} alt={trip.titleEn} />
                </div>

                <div className="right-image">
                    <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[1].replace(/\\/g, '/')}`} alt={trip.titleEn} />
                    <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[2].replace(/\\/g, '/')}`} alt={trip.titleEn} />
                </div>
            </section>










            {/*------------------------------------------------------------Trips Details--------------------------------------------*/}
            <section className="info-trips">
                <div className="container">
                    <div className="row">


                        <div className="col-12 col-md-8 col-sm-12 col-xs-12">


                            <div className="title">
                                <h2>{i18n.language === 'az' ? trip.titleAz : trip.titleEn}</h2>

                                <div className="card">
                                    <div className="top">{trip.duration}</div>
                                    <div className="bottom">Days</div>
                                </div>

                            </div>



                            <div className="all-info">
                                <ul>
                                    <li><span><MdMapsHomeWork className="icon" />{t('tripdetails.accommodation')}</span>{i18n.language === 'az' ? trip.tripInfo.accommodationAz : trip.tripInfo.accommodationEn}</li>
                                    <li><span><TbPlaneDeparture className="icon" />{t('tripdetails.departure')}</span>{i18n.language === 'az' ? trip.tripInfo.departureCityAz : trip.tripInfo.departureCityEn}</li>
                                    <li><span><TbPlaneArrival className="icon" />{t('tripdetails.arrival')}</span>{i18n.language === 'az' ? trip.tripInfo.arrivalCityAz : trip.tripInfo.arrivalCityEn}</li>
                                    <li><span><AiOutlineFileProtect className="icon" />{t('tripdetails.guide')}</span>{i18n.language === 'az' ? trip.tripInfo.guideAz : trip.tripInfo.guideEn}</li>
                                </ul>

                                <ul>
                                    <li><span><LuSunMoon className="icon" />{t('tripdetails.season')}</span>{i18n.language === 'az' ? trip.tripInfo.bestSeasonAz : trip.tripInfo.bestSeasonEn}</li>
                                    <li><span><AiOutlineFileProtect className="icon" />{t('tripdetails.guide')}</span>{i18n.language === 'az' ? trip.tripInfo.guideAz : trip.tripInfo.guideEn}</li>
                                    <li><span><IoLanguageSharp className="icon" />{t('tripdetails.language')}</span>{trip.tripInfo.language}</li>
                                    <li><span><MdNoMealsOuline className="icon" />{t('tripdetails.meals')}</span>{i18n.language === 'az' ? trip.tripInfo.mealsEn : trip.tripInfo.mealsEn}</li>
                                </ul>


                                <ul>
                                    <li><span><MdOutlineEventAvailable className="icon" />{t('tripdetails.availability')}</span>{i18n.language === 'az' ? trip.tripInfo.tourAvailabilityAz : trip.tripInfo.tourAvailabilityEn}</li>
                                    <li><span><MdOutlineEmojiTransportation className="icon" />{t('tripdetails.transpotation')}</span>{i18n.language === 'az' ? trip.tripInfo.transportationAz : trip.tripInfo.transportationEn}</li>
                                    <li><span><Ri24HoursLine className="icon" />{t('tripdetails.walking')}</span>{i18n.language === 'az' ? trip.tripInfo.walkingHoursAz : trip.tripInfo.walkingHoursEn}</li>
                                    <li><span><FaPerson className="icon" />{t('tripdetails.minimum')}</span>{trip.tripInfo.minimumAge}</li>
                                </ul>


                                <ul>
                                    <li><span><FaPerson className="icon" />{t('tripdetails.maximum')}</span>{trip.tripInfo.maximumAge}</li>
                                    <li><span><RiFindReplaceLine className="icon" />{t('tripdetails.destination')}</span>
                                        {trip && trip.destination && trip.destination[0] ?
                                            (i18n.language === 'az' ? trip.destination[0].destTitleAz : trip.destination[0].destTitleEn)
                                            : (i18n.language=== 'az' ? "Yerli məlumat yoxdur" : "No local information")}
                                    </li>
                                    <li><span><RxActivityLog className="icon" />{t('tripdetails.activity')}</span>{i18n.language === 'az' ? trip.activity[0].actTitleAz : trip.activity[0].actTitleEn}</li>
                                    <li><span><BsPersonWalking className="icon" />{t('tripdetails.trip-type')}</span>{i18n.language === 'az' ? trip.tripInfo.tripTypeAz : trip.tripInfo.tripTypeEn}</li>
                                </ul>

                            </div>



                            <div className="tab-container">
                                <div className="tab-buttons">
                                    {Object.keys(tabContent).map((tab) => (
                                        <button
                                            key={tab}
                                            className={activeTab === tab ? "active" : ""}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)} |
                                        </button>
                                    ))}
                                </div>

                                <div className="tab-content">
                                    <h2>{tabContent[activeTab]?.title || "No Title"}</h2>
                                    {activeTab !== "itinerary" && (
                                        <p>{tabContent[activeTab]?.description || "No Description"}</p>
                                    )}

                                    {activeTab === "itinerary" && (
                                        <div>
                                            {tabContent.itinerary.days.map((day, index) => (
                                                <div className="itinerary" key={index}>
                                                    <h3>{day.dayNumber}:</h3>
                                                    <p>{i18n.language === 'az' ? day.az : day.en}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>



                        <div className="col-12 col-md-4 col-sm-12 col-xs-12">
                            <div className="price-card">
                                {trip.tripInfo.discount > 0 && (
                                    <span className="discount">{trip.tripInfo.discount}% Off</span>
                                )}
                                <div className="price-container">
                                    {trip.tripInfo.discount > 0 && (
                                        <p className="old-price">{i18n.language === 'az' ? "" : "From"} <span><del>${trip.tripInfo.originalprice}</del></span></p>
                                    )}
                                    <p className="real-price"><span>${trip.tripInfo.discountedprice}</span>{i18n.language === 'az' ? "/Nəfər" : "/Person"}</p>
                                </div>
                                <button className="btn"
                                    onClick={() => {
                                        const user = JSON.parse(localStorage.getItem("loggedInUser"));
                                        if (!user) {
                                            Swal.fire({
                                                icon: "warning",
                                                title: i18n.language === 'az' ? "Zəhmət olmasa, daxil olun" : "Please Login",
                                                text: i18n.language === 'az'
                                                  ? "Səbətə əlavə etmək üçün daxil olmalısınız!"
                                                  : "You need to log in to add to basket!",
                                                confirmButtonText: "OK",
                                                confirmButtonColor: "#1ca8cb",
                                              }).then((result) => {
                                                if (result.isConfirmed) {
                                                  navigate("/login");
                                                }
                                              });
                                            return;
                                        }
                                        handleAddToBasket();
                                    }} >
                                    {t('tripdetails.addbasket')}
                                </button>
                                <p className="help">{t('tripdetails.help')}<Link to={'/contact-us'} >{t('tripdetails.sendmessage')}</Link></p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TripsDetails;
