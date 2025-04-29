import React, { useState, useEffect, useRef } from 'react';
import '../Homepage/Home.scss';
import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { GoClock } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { EffectCoverflow, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import category1 from '../../assets/Images/category1.jpg'
import category2 from '../../assets/Images/category2.jpg'
import category3 from '../../assets/Images/category3.jpg'
import category4 from '../../assets/Images/category4.jpg'
import category5 from '../../assets/Images/category5.jpg'
import popular1 from '../../assets/Images/Italy.jpeg'
import popular2 from '../../assets/Images/tokyo.jpeg'
import popular3 from '../../assets/Images/USA.jpeg'
import popular4 from '../../assets/Images/Thailand.jpeg'
import brand1 from '../../assets/Images/brand_1_1.svg'
import brand2 from '../../assets/Images/brand_1_2.svg'
import brand3 from '../../assets/Images/brand_1_3.svg'
import brand4 from '../../assets/Images/brand_1_4.svg'
import brand5 from '../../assets/Images/brand_1_5.svg'
import brand6 from '../../assets/Images/brand_1_6.svg'
import brand7 from '../../assets/Images/brand_1_7.svg'
import brand8 from '../../assets/Images/brand_1_8.svg'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { VscSend } from "react-icons/vsc";
import Slider from 'react-slick';
import Guider from '../../components/Guider/Guider';
import Feedback from '../../components/Feedback/Feedback';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import Preloader from '../../components/Preloader/Preloader';
import { useGetTourQuery } from '../../tools/services/tripApi';
import slugify from 'slugify';
import { MdDirectionsBike } from 'react-icons/md';
import { useGetDestinationsQuery } from '../../tools/services/destinationApi';
import { useTranslation } from 'react-i18next';





const Home = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 130,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);








  const form = useRef();
  const navigate = useNavigate();
  const { data: trips, isLoading } = useGetTourQuery();
  const { data: destinations, isLoadingDest } = useGetDestinationsQuery();

  if (isLoading || isLoadingDest) {
    return <Preloader />;
  }

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






  // Gallery images
  const galleryImages = {
    image1: "https://wordpress.themeholy.com/tourm/wp-content/uploads/2024/06/gallery_1_1.jpg",
    image2: "https://static.wixstatic.com/media/5256e5_2a9611cb8d10423480875983f437072e~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5256e5_2a9611cb8d10423480875983f437072e~mv2.jpg",
    image3: "https://ttgasia.2017.ttgasia.com/wp-content/uploads/sites/2/2019/03/paragliding.jpg",
    image4: "https://wordpress.themeholy.com/tourm/wp-content/uploads/2024/06/gallery_1_4.jpg",
    image5: "https://tripjive.com/wp-content/uploads/2024/02/How-can-I-learn-new-skills-and-push-my-limits-through-adventure-travel.jpg",
    image6: "https://www.bikehike.com/sites/default/files/Adventure%20Travel/Group%20hiking.jpg",
    image7: "https://media.cntraveler.com/photos/64879b50add73e0d14b17f9e/3:2/w_7950,h_5300,c_limit/Most-Adventurous-things-to-do-in-your-lifetime-(update)_timur-garifov-sisZWCDkmwA-unsplash.jpg",
  };
  // Gallery images






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





  return (
    <>



      {/*-----------------------------------------------------------HeroSection---------------------------------------------------------------------------*/}
      <section className="hero">
        <div data-aos="fade-right" className="text">
          <p>{t('home.title')}</p>
          <h1>{t('home.text')}</h1>
          <button onClick={() => navigate('/trips')}>
            {t('home.button')} <FaArrowRight className="right icon" />
          </button>
        </div>

        <div data-aos="fade-left" className="filtered">
          <p>{t('header.destination')}</p>
          <p>{t('home.trip-types')}</p>
          <p>{t('header.activity')}</p>
          <p>{t('home.duration')}</p>
          <p>{t('home.price')}</p>
        </div>
      </section>













      {/*-----------------------------------------------------------ActivitiesTravel------------------------------------------------------------------*/}
      <section className="travel-category">
        <p>{i18n.language === 'az' ? "Sizin Üçün Möcüzəvi Yerlər" : "Wonderful Place For You"}</p>
        <h1>{t('home.textAct')}</h1>

        <Swiper data-aos="zoom-in"
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={category1} />
            <h3>{t('home.airbirds')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide >

          <SwiperSlide>
            <img src={category2} />
            <h3>{t('home.wildlife')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category3} />
            <h3>{t('home.walking')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category4} />
            <h3>{t('home.hiking')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category1} />
            <h3>{t('home.airbirds')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category2} />
            <h3>{t('home.wildlife')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category3} />
            <h3>{t('home.walking')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>

          <SwiperSlide>
            <img src={category4} />
            <h3>{t('home.hiking')}</h3>
            <p><Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('home.see_more')}</Link></p>
          </SwiperSlide>
        </Swiper>
      </section>















      {/*----------------------------------------------------------Popular Destination--------------------------------------------------------------*/}
      <section className="popular-destinations">


        <div className="destination-text">
          <p>{t('destinations.title')}</p>
          <h1>{t('destinations.description')}</h1>
        </div>



        <div className="destinations">
          <div className="container-fluid">
            <div  className="row">
              {trips?.slice(0, 4).map((trip) => (
                <div   className="col-12 col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div data-aos="flip-left" className="destination-items">

                    <div className="item-img">
                      <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[0].replace(/\\/g, '/')}`} alt={trip.titleEn} />
                    </div>

                    <div className="destination-body">
                      <h3>{i18n.language === 'az' ? trip.titleAz : trip.titleEn}</h3>
                      <div className="destination-text">
                        <p>
                          <IoLocationOutline className='icon' />
                          {trip && trip.destination && trip.destination[0] ?
                            (i18n.language === 'az' ? trip.destination[0].destTitleAz : trip.destination[0].destTitleEn)
                            : (i18n.language=== 'az' ? "Yerli məlumat yoxdur" : "No local information")}
                        </p>
                        <p><GoClock className='icon' />{trip.duration} {t('home.days')}</p>
                      </div>
                      <p><MdDirectionsBike className='icon' />{i18n.language === 'az' ? trip.activity[0].actTitleAz : trip.activity[0].actTitleEn}</p>
                      <p>{i18n.language === 'az' ? trip.overview.descriptionAz.slice(0, 65) : trip.overview.descriptionEn.slice(0, 60)}...</p>
                    </div>

                    <div className="linear"></div>

                    <div className="destination-footer">
                      <p>${trip.tripInfo.discountedprice}</p>
                      <button onClick={() => navigate(`/trip/${slugify(trip.titleEn, { lower: true })}`)}>{t('home.view-details')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>













      {/*----------------------------------------------------------Gallery Section-----------------------------------------------------------------*/}
      <section className="gallery-places">
        <p>{t('home.titlegal')}</p>
        <h1>{t('home.descriptiongal')}</h1>

        <div className="gallery-area">
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6 col-lg-2">
                <div className="gallery-card">
                  <div data-aos="zoom-out-left" className="box-img">
                    <a href={galleryImages.image1} className="popup-image">
                      <img src={galleryImages.image1} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-2">
                <div className="gallery-card">
                  <div data-aos="zoom-out-left" className="box-img g-3">
                    <a href={galleryImages.image2} className="popup-image">
                      <img src={galleryImages.image2} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
                <div className="gallery-card">
                  <div data-aos="zoom-out-left" className="box-img">
                    <a href={galleryImages.image3} className="popup-image">
                      <img src={galleryImages.image3} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-2">
                <div className="gallery-card">
                  <div data-aos="zoom-in" className="box-img">
                    <a href={galleryImages.image4} className="popup-image">
                      <img src={galleryImages.image4} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-2">
                <div className="gallery-card">
                  <div data-aos="zoom-out-right" className="box-img">
                    <a href={galleryImages.image5} className="popup-image">
                      <img src={galleryImages.image5} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
                <div className="gallery-card">
                  <div data-aos="zoom-out-right" className="box-img">
                    <a href={galleryImages.image6} className="popup-image">
                      <img src={galleryImages.image6} alt={`gallery image`} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-2">
                <div className="gallery-card">
                  <div data-aos="zoom-out-right" className="box-img">
                    <a href={galleryImages.image7} className="popup-image">
                      <img src={galleryImages.image7} alt={`gallery image`} />
                    </a>
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









      {/*-----------------------------------------------------------Tour Guider-----------------------------------------------------------------------*/}
      <Guider />







      {/*--------------------------------------------------------------Client Comments----------------------------------------------------------------*/}
      <Feedback />








      {/*---------------------------------------------------------------Brand Box--------------------------------------------------------------------*/}
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
  );
};

export default Home;
