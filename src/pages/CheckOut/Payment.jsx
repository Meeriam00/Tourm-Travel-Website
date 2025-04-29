import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const {t}=useTranslation();
  const [cardData, setCardData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        focused={cardData.focus}
        name={cardData.name}
        number={cardData.number}
      />
      
      <form className="payment-form">
        <div style={{marginTop:"20px"}} className="input-group">
          <label>{t('checkout.cardNumber')}<span>*</span></label>
          <input
            type="tel"
            name="number"
            placeholder={t('checkout.cardNumber')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>

        <div className="input-group">
          <label>{t('checkout.nameOnCard')}<span>*</span></label>
          <input
            type="text"
            name="name"
            placeholder={t('checkout.fullName')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>

        <div className="input-group">
          <label>{t('checkout.expiryDate')}<span>*</span></label>
          <input
            type="text"
            name="expiry"
            placeholder={t('checkout.expiryDate')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>

        <div className="input-group">
          <label>CVC<span>*</span></label>
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Payment;
