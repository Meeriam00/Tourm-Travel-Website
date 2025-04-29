import React from 'react';
import '../Feedback/Feedback.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import client1 from '../../assets/Images/client1.jpg';
import { useTranslation } from 'react-i18next';



const Feedback = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
    // Feedback
    const testimonials = [
      {
        id: 1,
        name: "Angelina Rose",
        textEn: "What I appreciated most was the tour program being both detailed and flexible. As a student, I found the prices very affordable. I made new friends and got to experience different regional cultures.",
        textAz: "Ən çox bəyəndiyim şey, tur proqramının həm ətraflı, həm də çevik olmasıdır. Tələbə olduğum üçün qiymətləri çox münasib tapdım. Yeni dostlar qazandım və fərqli bölgə mədəniyyətlərini yaşama imkanı əldə etdim.",
        avatar: client1
      },
      {
        id: 2,
        name: "Daniel Crawford",
        textEn: "Everything was organized perfectly! From the accommodation to the local tours, every detail was carefully planned. It was my first time visiting this region, and it left a lasting impression.",
        textAz: "Hər şey mükəmməl təşkil olunmuşdu! Mənzil-tur proqramlarından tutmuş yerli ekskursiyalara qədər hər bir detal diqqətlə planlaşdırılmışdı. Bu bölgəyə ilk dəfə gəldim və uzun müddət yaddaşımda qalacaq təəssüratlar buraxdı.",
        avatar: "https://photogov-com.akamaized.net/examples/original/US.webp"
      },
      {
        id: 3,
        name: "Sophia Bennett",
        textEn: "I was very pleased with this tour. The tour guide was always ready to help and the program was very interesting. I made new friends and returned with many wonderful memories.",
        textAz: "Bu turdan çox məmnun oldum. Bələdçi hər zaman kömək etməyə hazır idi və proqram çox maraqlı idi. Yeni dostlar qazandım və bir çox gözəl xatirələrlə geri döndüm.",
        avatar: "https://visafoto.com/img/passport-photo-original8.jpg"
      },
      {
        id: 4,
        name: "Marco Bianchi",
        textEn: "I truly enjoyed every moment of the tour. The guide was informative, the group was fun, and the destinations were breathtaking. Will definitely recommend it to my friends!",
        textAz: "Hər anından həqiqətən çox zövq aldım. Bələdçi məlumatlı idi, qrup əyləncəli idi və təyinatlar gözəldi. Əminəm ki, dostlarıma da mütləq tövsiyə edəcəyəm!",
        avatar: "https://visafoto.com/img/passport-photo-original7.jpg"
      }
      
    ];
    // Feedback
  return (
    <>







{/*---------------------------------------------------------------Comment----------------------------------------------*/}
<section className="comment">
<p>{t('feedback.testimonial')}</p>
<h1>{t('feedback.our_clients_feedback')}</h1>

<Swiper
  pagination={true}
  autoplay={{
    delay: 7000,             
    disableOnInteraction: false,
  }}
  modules={[Pagination,Autoplay,EffectFade]}
  className="mySwiper"
>
  {testimonials.map((feedback) => (
    <SwiperSlide  key={feedback.id}>
      <div data-aos="zoom-in" className='comment-container'>
        <img src={feedback.avatar} alt="" />
        <div className='comments'>
          <p>"{i18n.language === 'az' ? feedback.textAz : feedback.textEn}"</p>
        </div>
        <h5>{feedback.name}</h5>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</section>




</>
  )
}

export default Feedback