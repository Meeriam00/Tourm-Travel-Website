import React, { useEffect, useState } from 'react'
import '../AboutUs/AboutUs.scss'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Guider from '../../components/Guider/Guider'
import Feedback from '../../components/Feedback/Feedback'

import brand1 from '../../assets/Images/brand_1_1.svg'
import brand2 from '../../assets/Images/brand_1_2.svg'
import brand3 from '../../assets/Images/brand_1_3.svg'
import brand4 from '../../assets/Images/brand_1_4.svg'
import brand5 from '../../assets/Images/brand_1_5.svg'
import brand6 from '../../assets/Images/brand_1_6.svg'
import brand7 from '../../assets/Images/brand_1_7.svg'
import brand8 from '../../assets/Images/brand_1_8.svg'
import Slider from 'react-slick'


import tour1 from '../../assets/Images/tour1.jpg'
import { MdOutlineSafetyDivider } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { CiSearch } from 'react-icons/ci'


import service1 from '../../assets/Images/service1.jpg'
import service2 from '../../assets/Images/services2.jpg'
import service3 from '../../assets/Images/service3.jpg'
import service4 from '../../assets/Images/service12.jpg'
import service5 from '../../assets/Images/service5.jpg'
import service6 from '../../assets/Images/service6.jpg'
import service7 from '../../assets/Images/service7.jpg'
import service8 from '../../assets/Images/service8.jpg'
import TopSection from '../../components/TopSection/TopSection'
import Aos from 'aos'
import { useTranslation } from 'react-i18next'


const AboutUs = () => {
  
  const { i18n } = useTranslation();
  const { t } = useTranslation(); 
  const navigate=useNavigate();



  

useEffect(() => {
    Aos.init({
      duration: 1200,
      once:true
    });
  }, []);


// Brand
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
// Brand






  // Services
  const services = [
    {
      id: 1,
      titleEn: "Photo Shoot",
      titleAz: "Fotoşəkil Çəkilişi",
      image: service1,
    },
    {
      id: 2,
      titleEn: "Tour Guide",
      titleAz: "Bələdçi",
      image: service2,
    },
    {
      id: 3,
      titleEn: "Cozy Event",
      titleAz: "Rahat Tədbir",
      image: service3,
    },
    {
      id: 4,
      titleEn: "Interesting Rest",
      titleAz: "Maraqlı İstirahət",
      image: service4,
    },
    {
      id: 5,
      titleEn: "Kayaking",
      titleAz: "Kayakla Səyahət",
      image: service5,
    },
    {
      id: 6,
      titleEn: "Safe Flight",
      titleAz: "Təhlükəsiz Uçuş",
      image: service6,
    },
    {
      id: 7,
      titleEn: "Entertainment",
      titleAz: "Əyləncə",
      image: service7,
    },
    {
      id: 8,
      titleEn: "Delicious Food",
      titleAz: "Ləzzətli Yeməklər",
      image: service8,
    },
  ];
  
  // Services









  return (
    <>


      {/*----------------------------------------------------------------------TOP-OF-PAGE------------------------------------------------------------*/}
       <TopSection title={t('header.about')} currentPage={t('header.about')}/>







      {/*--------------------------------------------------------------------Plan Your Trip-----------------------------------------------------------*/}
      <section className="planning-trip">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 col-md-12 col-sm-12 col-xs-12 order-1">
            <img src={tour1} alt="tour" />
          </div>

          <div className="col-12 col-lg-6 col-md-12 col-sm-12 col-xs-12 order-2">
            <div className="order-two">
              <span>{t('about-us.letsGo')}</span>
              <h1>{t('about-us.planTrip')}</h1>
              <p>{t('about-us.description')}</p>

              <div className="about-items">
                <div data-aos="fade-up" className="about-item">
                  <div className="about-icon">
                    <CiSearch id="explore" />
                  </div>
                  <div className="text">
                    <h3>{t('about-us.exclusiveTrip')}</h3>
                    <p>{t('about-us.exclusiveDescription')}</p>
                  </div>
                </div>

                <div data-aos="fade-up" className="about-item">
                  <div className="about-icon">
                    <MdOutlineSafetyDivider id="safety" />
                  </div>
                  <div className="text">
                    <h3>{t('about-us.safetyFirst')}</h3>
                    <p>{t('about-us.safetyDescription')}</p>
                  </div>
                </div>

                <div data-aos="fade-up" className="about-item">
                  <div className="about-icon">
                    <FaPerson id="guide" />
                  </div>
                  <div className="text">
                    <h3>{t('about-us.professionalGuide')}</h3>
                    <p>{t('about-us.guideDescription')}</p>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate('/contact-us')} id="learning">
                {t('about-us.learnMore')} <FaArrowRight className="right icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>











      {/*-------------------------------------------------------------------Our Amazing Services-------------------------------------------------*/}
      <section className="our-services">
        <p>Services Offer</p>
        <h1>Amazing services for tour</h1>



        <div className="container-fluid">
          <div className="row">
            {services.map((service) => (

              <div key={service.id} className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                <div   className="service-item">
                  <div className="card" style={{ width: '100%' }}>
                    <div className="card-img-top" >
                      <img src={service.image} alt={service.titleEn} />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{i18n.language === 'az' ? service.titleAz : service.titleEn}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>








      </section>












      {/*-------------------------------------------------------------------Guider------------------------------------------------------------*/}
      <Guider />









      {/*-------------------------------------------------------------------Client FeedBack---------------------------------------------------*/}
      <Feedback />










      {/*------------------------------------------------------------------------Brand------------------------------------------------------------*/}
      <section className="brand">
        <Slider {...settings}>
          <div>
            <img src={brand1} alt="brand_one" />
          </div>
          <div>
            <img src={brand2} alt="brand_two" />
          </div>
          <div>
            <img src={brand3} alt="brand_three" />
          </div>
          <div>
            <img src={brand4} alt="brand_four" />
          </div>
          <div>
            <img src={brand5} alt="brand_five" />
          </div>
          <div>
            <img src={brand6} alt="brand_six" />
          </div>
          <div>
            <img src={brand7} alt="brand_seven" />
          </div>
          <div>
            <img src={brand8} alt="brand_eight" />
          </div>
        </Slider>
      </section>





    </>
  )
}

export default AboutUs