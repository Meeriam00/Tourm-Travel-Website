import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../../components/Guider/GuiderDetails.scss';
import TopSection from '../TopSection/TopSection';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 
import { useGetGuidersQuery } from '../../tools/services/guiderApi';
import Preloader from '../Preloader/Preloader'
import { useTranslation } from 'react-i18next';
const GuiderDetails = () => {
  
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const { id } = useParams(); 
  const { data: guiders, isLoading } = useGetGuidersQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 130,  
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  if (isLoading) {
    return <Preloader />; 
  }



  
  const guider = guiders.find((g) => g.id.toString() === id);


  if (!guider) return <p>Guider tapılmadı!</p>;

  return (
    <>
  <TopSection title={guider.fullname} currentPage={i18n.language === 'az' ? "Bələdçi Məlumatları" : "Guider Details"} />


      <section className="guider-details">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4 col-md-12">
              <div data-aos="zoom-in" className="guider">
                <img src={`https://tourm-travel-backend-2.onrender.com/${guider.avatar.replace(/\\/g, '/')}`} alt={guider.fullname} />
                <div className="hover-container">
                  <h3>{guider.fullname}</h3>
                  <p>{i18n.language === 'az' ? guider.positionAz : guider.positionEn}</p>
                  <div className="social-media">
                    <div className="social-icon"><a target="_blank" href='https://tr-tr.facebook.com/login/device-based/regular/login'><FaFacebookF id='facebook' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://www.instagram.com/accounts/login/"><FaInstagram id='instagram' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://www.linkedin.com/company/login/"><FaLinkedinIn id='linkedin' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://x.com/i/flow/login"><FaTwitter id='twitter' /></a></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 col-md-12">
              <div data-aos="zoom-in" className="details-item">
                <h1>{t('guider.guiderabout')}</h1>
                <p>{i18n.language === 'az' ? guider.aboutMeAz : guider.aboutMeEn}</p>
                <h4>{t('guider.experineces')}</h4>
                <p>{i18n.language === 'az' ? guider.experiencesAz : guider.experiencesEn}</p>

                <div className="boxes">
                  <div className="counter-box">
                    <h4>{guider.totalGuide}+</h4>
                    <p>{t('guider.totalguide')}</p>
                  </div>

                  <div className="counter-box">
                    <h4>{guider.totalServices}+</h4>
                    <p>{t('guider.services')}</p>
                  </div>

                  <div className="counter-box">
                    <h4>{guider.awardwon}+</h4>
                    <p>{t('guider.award')}</p>
                  </div>

                  <div className="counter-box">
                    <h4>{guider.totalevent}+</h4>
                    <p>{t('guider.event')}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default GuiderDetails;
