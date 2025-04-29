import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import '../Guider/Guider.scss';
import { useGetGuidersQuery } from '../../tools/services/guiderApi';
import Preloader from '../Preloader/Preloader';
import { useTranslation } from 'react-i18next';

const Guider = () => {
  const { data: guiders, isLoading } = useGetGuidersQuery();
   const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  if (isLoading) {
    return <Preloader />; 
  }


  console.log(guiders)

  return (
    <section className="team-guider">
      <p>{t('team.meet_with_guide')}</p>
      <h1>{t('team.tour_guide')}</h1>

      <div className="guider-container">
        <div className="container-fluid">
          <div className="row">
            {guiders?.map((guider) => (
              <div key={guider.id} className="col-12 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="guider" onClick={() => navigate(`/guider/${guider.id}`)}>
                  <img src={`https://tourm-travel-backend-2.onrender.com/${guider.avatar.replace(/\\/g, '/')}`} alt="" />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guider;
