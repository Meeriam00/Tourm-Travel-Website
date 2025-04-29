import React, { useState } from 'react';
import TopSection from '../../components/TopSection/TopSection';
import '../Basket/Basket.scss';
import { useCart } from '../../Context/CartContext';
import { FaRegTrashCan } from 'react-icons/fa6';
import slugify from 'slugify';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Basket = () => {
  const navigate = useNavigate();
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const { basket, removeFromBasket } = useCart();
  const [personCounts, setPersonCounts] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [openCalendars, setOpenCalendars] = useState({});





  const handleCountChange = (tripId, action) => {
    setPersonCounts((prevCounts) => {
      const currentCount = prevCounts[tripId] || 1;
      const newCount = action === 'increase' ? Math.min(9, currentCount + 1) : Math.max(1, currentCount - 1);
      return { ...prevCounts, [tripId]: newCount };
    });
  };




  const handleDateChange = (tripId, date) => {
    setSelectedDates((prevDates) => ({ ...prevDates, [tripId]: date }));
    setOpenCalendars((prev) => ({ ...prev, [tripId]: false }));
  };





  // Calculate total price
  const totalAmount = basket.reduce((total, trip) => {
    const count = personCounts[trip._id] || 1;
    return total + count * trip.tripInfo.discountedprice;
  }, 0);





  return (
    <>
      {/*--------------------------------------------TopSection Basket----------------------------------------------*/}
      <TopSection title={i18n.language === 'az' ? "Səyahət səbəti" : "Trips Basket"} currentPage={i18n.language === 'az' ? "Səyahət səbəti" : "Trips Basket"} />









      {/*-------------------------------------------Basket Container------------------------------------------------*/}
      <section className="basket-container">
        {basket.length === 0 ? (
          <div className='no-item'>
          <h1>{i18n.language === 'az' ? "Ohhh... Səbətiniz Boşdur" : "Ohhh... Your Basket is Empty"}</h1>
          <p>{i18n.language === 'az' ? "Amma belə olmamalıdır." : "But it doesn't have to be."}</p>
          <button onClick={()=>navigate('/trips')}>{i18n.language === 'az' ? "Səyahətləri araşdırın" : "Explore trips"}</button>
          </div> 
        ) : (


          <div className="container">
            <div className="row">




              {/*-------------------------Basket Title-----------------------*/}
              <div className="basket-title">
                <h2>{i18n.language === 'az' ? "Mənim Səbətim" : "My Basket"}</h2>
                <div className="linear"></div>
              </div>





              {/*-------------------------Basket Information-----------------*/}
              <div className="col-12 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                {basket.map((trip) => (
                  <div key={trip._id} className="col-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="basket-item">


                      {/*-------------------Item Image--------------------*/}
                      <div className="item-img">
                        <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[0].replace(/\\/g, '/')}`} alt={trip.titleEn} width="100" />
                      </div>







                      {/*-----------------------Basket Info-------------------*/}
                      <div className="basket-info">
                        <h3 onClick={() => navigate(`/trip/${slugify(trip.titleEn, { lower: true })}`)}>{i18n.language === 'az' ? trip.titleAz : trip.titleEn}</h3>
                        <p>{i18n.language === 'az' ? trip.overview.descriptionAz.slice(0, 30) : trip.overview.descriptionEn.slice(0, 30)}...</p>
                        <p id="price">
                        {i18n.language === 'az' ? "Ümumi qiymət:" : "Total Price:"} <span>${(personCounts[trip._id] || 1) * trip.tripInfo.discountedprice}</span>
                        </p>
                        {selectedDates[trip._id] && <p id="date">{i18n.language === 'az' ? "Tarix:" : "Date:"} {selectedDates[trip._id].toLocaleDateString()}</p>}
                      </div>






                      {/*--------------------Quantity Controls---------------*/}
                      <div className="quantity-controls">
                        <button onClick={() => handleCountChange(trip._id, 'decrease')}>-</button>
                        <span>{personCounts[trip._id] || 1}</span>
                        <button onClick={() => handleCountChange(trip._id, 'increase')}>+</button>
                        <div className="calendar-container">
                          <FaRegCalendar className="calendar-icon" onClick={() => setOpenCalendars((prev) => ({ ...prev, [trip._id]: !prev[trip._id] }))} />
                          {openCalendars[trip._id] && (
                            <DatePicker
                              selected={selectedDates[trip._id] || null}
                              onChange={(date) => handleDateChange(trip._id, date)}
                              onClickOutside={() => setOpenCalendars((prev) => ({ ...prev, [trip._id]: false }))}
                              placeholderText="Select Date"
                              inline
                            />
                          )}
                        </div>
                        <button className="remove-item" onClick={() => removeFromBasket(trip._id)}>
                          <FaRegTrashCan />
                        </button>
                      </div>





                    </div>
                  </div>
                ))}
              </div>







              {/*----------------------------Booking Summary-----------------*/}
              <div className="col-12 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="summary">
                  <h3>{i18n.language === 'az' ? "Rezervasiya xülasəsi" : "Booking Summary"}</h3>
                  


                  <div className='summary-container'>
                    {basket.map((trip) => (
                      <div className='summary-item' key={trip._id}>
                        <h4>{i18n.language === 'az' ? trip.titleAz : trip.titleEn}</h4>
                        <p>{i18n.language === 'az' ? "Tarix:" : "Date:"} {selectedDates[trip._id] ? selectedDates[trip._id].toLocaleDateString() : i18n.language === 'az' ? "Seçilməyib" : "No Selected"}</p> 
                        <p>{i18n.language === 'az' ? "Insanlar:" : "Persons:"} {personCounts[trip._id] || 1}</p> 
                        <p>{i18n.language === 'az' ? "Qiymət:" : "Price:"} ${(personCounts[trip._id] || 1) * trip.tripInfo.discountedprice}</p>
                      </div>
                    ))}
                  </div>



                  {/*---------------Total Amount-------------*/}
                  <div className="total-amount">
                    <div className="linear"></div>
                    <h4>{i18n.language === 'az' ? "Ümumi məbləğ:" : "Total Amount:"} <span>${totalAmount}</span></h4>
                      <button onClick={() => {
                       localStorage.setItem('checkoutData', JSON.stringify({ basket, selectedDates, personCounts }));
                        navigate('/trips/checkout');
                      }}>
                        {i18n.language === 'az' ? "Ödənişə davam edin:" : "Proceed To Checkout:"}
                      </button>
                  </div>


                </div>

              </div>






            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Basket;
