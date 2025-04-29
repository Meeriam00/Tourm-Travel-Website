import React, { useState } from 'react'
import '../FAQ/FAQ.scss'
import TopSection from '../../components/TopSection/TopSection'
import { useGetFaqsQuery } from "../../tools/services/faqApi";import axios from 'axios';
import Preloader from '../../components/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
;
const FAQ = () => {

  
  
 const { t } = useTranslation();
    const { i18n } = useTranslation();
  const { data: faqs, isLoading } = useGetFaqsQuery();

  if (isLoading) {
    return <Preloader />; 
  }




  
  
  return (
    <>



{/*-------------------------------------------------------------------------TopOfFaq-----------------------------------------------------*/}
<TopSection title={t('header.faq')} currentPage={t('header.faq')} />




{/*--------------------------------------------------------------------Questions & Answers---------------------------------------------------*/}
<section className="questions">
<h1>{t('faq.frequently_ask_questions')}</h1>
<p>{t('faq.have_questions')}</p>




  <div className="accordion" id="accordionExample">
    {faqs?.map((faq) => (
      <div className="accordion-item" key={faq._id}>

        <h2 className="accordion-header">
          <button className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${faq._id}`}
            aria-expanded="false"
            aria-controls={`collapse${faq._id}`}
          >
            FAQ{faq.id}. {i18n.language === 'az' ? faq.questionAz : faq.questionEn}
          </button>
        </h2>

        <div
          id={`collapse${faq._id}`}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{i18n.language === 'az' ? faq.answerAz : faq.answerEn}</div>
        </div>

      </div>
    ))}
  </div>







</section>












    </>
  )
}

export default FAQ