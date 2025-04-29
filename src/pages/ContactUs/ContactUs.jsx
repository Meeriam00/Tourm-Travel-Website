import React from 'react'
import TopSection from '../../components/TopSection/TopSection'
import { IoLocationOutline } from 'react-icons/io5'
import '../ContactUs/ContactUs.scss'
import { FaPhone, FaRegEnvelope } from 'react-icons/fa'
import { VscSend } from 'react-icons/vsc'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { useGetDestinationsQuery } from '../../tools/services/destinationApi'
import Preloader from '../../components/Preloader/Preloader'
import { useTranslation } from 'react-i18next'



const ContactUs = () => {

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const form=useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      "service_tlsl2gf",  
      "template_dr7pfuh", 
      form.current,
      "34Fd6ZenmSzGBOZf3"
    )
    .then(() => {
       Swal.fire({
                title: i18n.language === 'az' ? "Mesaj uğurla göndərildi!" : "Message sent successfully!",
                icon: "success"
              });
              
             
              Swal.fire({
                title: i18n.language === 'az' ? "Xəta baş verdi!" : "An error occurred!",
                icon: "error",
                text: i18n.language === 'az'
                  ? "Mesaj göndərilərkən problem baş verdi. Zəhmət olmasa, yenidən cəhd edin."
                  : "There was a problem sending your message. Please try again."
              });
    });
    
    e.target.reset(); 
  };

  const { data: destinations, isLoading } = useGetDestinationsQuery();
    if (isLoading) {
      return <Preloader />;
    }
  


  return (
    <>



{/*--------------------------------------------------------------Top Of Contact Us---------------------------------------------------*/}
<TopSection title={t('header.contact-us')} currentPage={t('header.contact-us')}/>










{/*-------------------------------------------------------------General Information--------------------------------------------------*/}
<section className="general-information">
<p>{t('contactpage.get_in_touch')}</p>
<h1>{t('contactpage.our_contact_information')}</h1>


        <div className="contact-information">
          <div className="container">
            <div className="row">

              <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="contact-item">
                  <div className="contact-icon">
                    <IoLocationOutline id='location'/>
                  </div>
                  <div className="contact-info">
                    <h3>{t('contactpage.our_location')}</h3>
                    <p>{t('contactpage.location_address1')}</p>
                    <p>{t('contactpage.location_address2')}</p>
                  </div>
                </div>
              </div>


              <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="contact-item">
                  <div className="contact-icon">
                  <FaPhone  id="phone"/>
                  </div>
                  <div className="contact-info">
                    <h3>{t('contactpage.phone_number')}</h3>
                    <p>{t('contactpage.phone_number1')}</p>
                    <p>{t('contactpage.phone_number2')}</p>
                  </div>
                </div>
              </div>


              <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="contact-item">
                  <div className="contact-icon">
                  <FaRegEnvelope id="envelope"/>
                  </div>
                  <div className="contact-info">
                    <h3>{t('contactpage.email_address')}</h3>
                    <p>{t('contactpage.email1')}</p>
                    <p>{t('contactpage.email2')}</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
</section>







{/*-----------------------------------------------------------Send Message------------------------------------------------------------------*/}
<section className='send-message'>



<video autoPlay loop muted>
  <source src="https://www.dropbox.com/scl/fi/lmlpe4pmvkt8bdrmmff5e/video3.mp4?rlkey=mr12i600vv5zc2pd8z8fash2b&st=rsyrgb9w&raw=1" type="video/mp4" />
</video>


<div className="info-container">
        <p>{t('contact.get_in_touch')}</p>
        <h1>{t('contact.say_hello')}</h1>
        <p>{t('contact.description')}</p>
      </div>

      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <input type="text" className="form-control" name="first_name" placeholder={t('contact.first_name')} required />
          </div>

          <div className="form-group">
            <input type="email" className="form-control" name="user_email" placeholder={t('contact.your_email')} required />
          </div>

          <div className="form-group">
            <select name="selected_option" className="form-select" required>
              {destinations?.map((destination) => (
                <option key={destination.id}>{destination.destTitleEn}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <textarea name="message" className="form-control" placeholder={t('contact.message_placeholder')} rows="10" required></textarea>
          </div>

          <button type="submit">{t('contact.send_message')} <VscSend className='send-icon' /></button>
        </form>
      </div>


</section>








{/*-----------------------------------------------------------------Google Maps--------------------------------------------------------------*/}
<section className="maps">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509467!2d144.96305761531598!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df2b1d65f%3A0x5045675218ce720!2zTWVsYm91cm5lIFZJDQo!5e0!3m2!1sen!2s!4v1633802241551"  
style={{border: 0}} 
allowFullScreen loading="lazy">
</iframe>
</section>











</>
  )
}

export default ContactUs