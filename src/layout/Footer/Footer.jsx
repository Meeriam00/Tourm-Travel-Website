import '../Footer/Footer.scss'
import { VscSend } from "react-icons/vsc";
import logo from '../../assets/Images/logo-white.svg'
import React, { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import popular1 from '../../assets/Images/popular_1_1.jpg'
import popular2 from '../../assets/Images/popular_1_2.jpg'
import popular3 from '../../assets/Images/popular_1_3.jpeg'
import popular4 from '../../assets/Images/popular_1_4.jpg'
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const {t}=useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (email.trim() === "") return;

   
    setTimeout(() => {
      setSubmitted(true);
      setEmail(""); 
      setTimeout(() => setSubmitted(false), 3000); 
    }, 500);
  };

  const currentYear = new Date().getFullYear();

  return (
   <>
<footer>


<div className="footer-top">
  <h1>{t('footer.footertitle')}</h1>
  <form onSubmit={handleSubmit}>
      <label htmlFor="email"></label>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">
      {t('footer.subscribe')} <VscSend className="send-icon" />
      </button>

      {submitted && <p style={{ color: "green", marginTop: "10px",fontFamily:"Inter,sans-serif",fontWeight:"500" }}>{t('footer.subssuccess')}</p>}
    </form>
</div>

<div className='linear'></div>




<div className="footer-area">
  <div className="container">
    <div className="row">

      <div className='col-12 col-lg-3 col-md-6 col-sm-6 col-xs-6'>
        <div className="general-info">
        <img src={logo} alt="logo" />
        <p>{t('footer.logotitle')}</p>
       <div className="social-media">
                    <div className="social-icon"><a target="_blank" href='https://tr-tr.facebook.com/login/device-based/regular/login'><FaFacebookF id='facebook' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://www.instagram.com/accounts/login/"><FaInstagram id='instagram' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://www.linkedin.com/company/login/"><FaLinkedinIn id='linkedin' /></a></div>
                    <div className="social-icon"><a target="_blank" href="https://x.com/i/flow/login"><FaTwitter id='twitter' /></a></div>
                  </div>
        </div>
      </div>


      <div className='col-12 col-lg-3 col-md-6 col-sm-6 col-xs-6'>
        <div className="pages-link">
        <h3>{t('footer.links')}</h3>
        <ul>
          <li><Link to={'/'} className="nav-link" aria-current="page" href="#"><FaAngleRight />{t('header.home')}</Link></li>
          <li><Link to={'/about-us'} className="nav-link" aria-current="page" href="#"><FaAngleRight />{t('header.about')}</Link></li>
          <li><Link to={'/destinations'} className="nav-link" aria-current="page" href="#"><FaAngleRight />{t('header.destination')}</Link></li>
          <li><Link to={'/activity'} className="nav-link" aria-current="page" href="#"><FaAngleRight />{t('header.activity')}</Link></li>
          <li><Link to={'/contact-us'} className="nav-link" aria-current="page" href="#"><FaAngleRight />{t('header.contact-us')}</Link></li>
          
        </ul>
        </div>
      </div>






      <div className='col-12 col-lg-3 col-md-6 col-sm-6 col-xs-6'>
         <div className="contact-area">
         <h3>{t('footer.contactarea')}</h3>


         <div className="contact">
         <div className="contact-icon">
         <FaPhoneVolume id='phonenumber'/>
         </div>
         <div className="text">
          <p>+01 234 567 890</p>
          <p>+09 876 543 210</p>
         </div>
         </div>


         <div className="contact">
         <div className="contact-icon">
         <FaRegEnvelope id='envelope'/>
         </div>
         <div className="text">
         <p>mailinfo00@tourm.com</p>
         <p>support24@tourm.com</p>
         </div>
          </div>


          <div className="contact">
          <div className="contact-icon">
          <IoLocationOutline id='location'/>
          </div>
          <div className="text">
          <p>789 Inner Lane</p>
          <p>California,USA</p>
          </div>
          </div>



         </div>
      </div>





      <div className='col-12 col-lg-3 col-md-6 col-sm-6 col-xs-6'>
        <div className="posts">
        <h3>{t('footer.instagram-post')}</h3>
         <div className="images">
          <img src={popular1} alt="popular-destination" />
          <img src={popular2} alt="popular-destination" />
          <img src={popular3} alt="popular-destination" />
          <img src={popular4} alt="popular-destination" />
         </div>
        </div>
      </div>




    </div>
  </div>
</div>

<div className='linear'></div>


<div className="footer-bottom">
  <p>Copyright © {new Date().getFullYear()} Tourm. All Rights Reserved.</p>
</div>



</footer>


   </>
  )
}

export default Footer