import React, { useState } from "react";
import { useAddFaqMutation } from "../../../tools/services/faqApi";
import { useNavigate } from "react-router-dom";
import TopSection from "../../../components/TopSection/TopSection";
import Sidebar from "../Sidebar";
import '../Add.scss'
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const AddFaq = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const [addFaq] = useAddFaqMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    questionAz: "",
    questionEn: "",
    answerAz: "",
    answerEn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFaq(formData).unwrap();
      Swal.fire({
        icon: 'success',
        title: t('faqs.Success'), 
        text: t('faqs.FaqAdded'),
      });
      navigate("/dashboard/faq-list");
    } catch (error) {
      console.error("Əlavə olunmadı:", error);
      Swal.fire({
        icon: 'error',
        title: t('faqs.Error'), 
        text: t('faqs.CouldNotAdd'), 
      });
    }


  };

  return (
    <>
      <TopSection title={t('faqs.AddFaq')} currentPage={t('faqs.AddFaq')} />

      <section style={{ width: "100%", height: "auto", padding: "5% 20px" }} className="add-container">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="left-part-main">
                <div className="left-part-body">
                  <Sidebar />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="right-part-main">
                <div className="right-part-body">
                  <div className="add-part">
                  <h1>{t('faqs.AddFaq')}</h1>

                    <form onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label htmlFor="questionAz">{t('faqs.QuestionAz')}</label>
                        <input
                          name="questionAz"
                          id="questionAz"
                          value={formData.questionAz}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="questionEn">{t('faqs.QuestionEn')}</label>
                        <input
                          name="questionEn"
                          id="questionEn"
                          value={formData.questionEn}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="answerAz">{t('faqs.AnswerAz')}</label>
                        <input
                          name="answerAz"
                          id="answerAz"
                          value={formData.answerAz}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="answerEn">{t('faqs.AnswerEn')}</label>
                        <input
                          name="answerEn"
                          id="answerEn"
                          value={formData.answerEn}
                          onChange={handleChange}
                        />
                      </div>

                      <button type="submit">{t('faqs.AddFaqButton')}</button>
                    </form>

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

export default AddFaq;
