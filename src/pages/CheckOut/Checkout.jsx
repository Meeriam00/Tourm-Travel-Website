import React, { useEffect, useState } from "react";
import TopSection from "../../components/TopSection/TopSection";
import "../../pages/CheckOut/Checkout.scss";
import Payment from "./Payment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const navigate=useNavigate();
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const [checkoutData, setCheckoutData] = useState({
    basket: [],
    selectedDates: {},
    personCounts: {},
  });



  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    country: "",
  });




  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsedData = JSON.parse(data);
      const fixedDates = Object.fromEntries(
        Object.entries(parsedData.selectedDates).map(([tripId, date]) => [
          tripId,
          new Date(date),
        ])
      );



      setCheckoutData({
        basket: parsedData.basket,
        selectedDates: fixedDates,
        personCounts: parsedData.personCounts,
      });
    }
  }, []);




  const { basket, selectedDates, personCounts } = checkoutData;

  const totalAmount = basket.reduce((total, trip) => {
    const count = personCounts[trip._id] || 1;
    return total + count * trip.tripInfo.discountedprice;
  }, 0);




  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { fname, lname, email, city, country } = formData;
      if (!fname || !lname || !email || !city || !country) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t('checkout.fill_required_fields'),
        })
      }
      Swal.fire({
        icon: "success",
        title: t('checkout.payment_success'),
        text: t('checkout.payment_success_text'),
      })
      localStorage.removeItem("basket");
        navigate('/trips/recommended'); 
       
    } 
    catch (error) {
      console.error("Error during form submission:", error);
      Swal.fire({
        icon: "error",
        title:t('checkout.payment_error_title'),
        text:t('checkout.payment_error_text'),
      });
    }
  };
  


  
  return (
    <>
      <TopSection title={i18n.language === 'az' ? "Səyahətlərin Yoxlanılması" : "Trips Checkout"} currentPage={i18n.language === 'az' ? "Səyahətlərin Yoxlanılması" : "Trips Checkout"} />

      <section className="checkout-container">
        <div className="container">
          <div className="row">
            <div className="checkout-title">
              <h2>{t('checkout.checkout_title')}</h2>
              <div className="linear"></div>
            </div>

            <div className="col-12 col-lg-7 col-sm-12 col-xs-12">
              <form className="person-details" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="fname">
                    {t('checkout.first_name')}<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="fname"
                    placeholder={t('checkout.first_name')}
                    value={formData.fname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lname">
                  {t('checkout.last_name')}<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="lname"
                    placeholder={t('checkout.last_name')}
                    value={formData.lname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                  {t('checkout.email')}<span>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t('checkout.email')}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

             

                <div className="input-group">
                  <label htmlFor="city">
                  {t('checkout.city')}<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder={t('checkout.city')}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="country">
                  {t('checkout.country')}<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    placeholder={t('checkout.country')}
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="payment-section">
                  <Payment />
                </div>

                <button type="submit">{t('checkout.pay_now')}</button>
              </form>
            </div>

            <div className="col-12 col-lg-5 col-md-5 col-sm12 col-xs-12">
              <div className="summary">
                <h3>{t('checkout.booking_summary')}</h3>
                <div className="summary-container">
                  {basket.map((trip) => (
                    <div className="summary-item" key={trip._id}>
                      <h4>{trip.titleEn}</h4>
                      <p>
                      {t('checkout.date')}:{" "}
                        {selectedDates[trip._id]
                          ? selectedDates[trip._id].toLocaleDateString()
                          :t('checkout.not_selected')}
                      </p>
                      <p>{t('checkout.persons')}: {personCounts[trip._id] || 1}</p>
                      <p>
                      {t('checkout.price')}: $
                        {(personCounts[trip._id] || 1) *
                          trip.tripInfo.discountedprice}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="total-amount">
                  <div className="linear"></div>
                  <h4>
                  {t('checkout.total_payable')}: <span>${totalAmount}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
