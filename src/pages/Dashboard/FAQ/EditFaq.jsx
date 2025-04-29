import React, { useState, useEffect } from "react";
import { useEditFaqMutation, useGetFaqsQuery } from "../../../tools/services/faqApi";
import { useParams, useNavigate } from "react-router-dom";
import TopSection from "../../../components/TopSection/TopSection";
import Sidebar from "../Sidebar";
import '../Edit.scss'
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const EditFaq = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: faqs } = useGetFaqsQuery();
  const [editFaq] = useEditFaqMutation();

  const [formData, setFormData] = useState({
    questionAz: "",
    questionEn: "",
    answerAz: "",
    answerEn: "",
  });

  useEffect(() => {
    if (faqs) {
      const existingFaq = faqs.find((faq) => faq._id === id); 
      if (existingFaq) {
        setFormData({ 
          questionAz: existingFaq.questionAz || "",
          questionEn: existingFaq.questionEn || "",
          answerAz: existingFaq.answerAz || "",
          answerEn: existingFaq.answerEn || "",
        });
      }



    }
  }, [faqs, id]);





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
                await editFaq({ id, ...formData }).unwrap();
                Swal.fire({
                  icon: 'success',
                  title: i18n.language === 'az' ? 'Uğurlu!' : 'Success!',
                  text: i18n.language === 'az' ? 'FAQ uğurla yeniləndi.' : 'FAQ successfully updated.',
                  confirmButtonText: i18n.language === 'az' ? 'Tamam' : 'OK'
              }).then(() => {
                  navigate('/dashboard/faq-list');
              });
          } catch (err) {
              console.error("Update xətası:", err);
              Swal.fire({
                  icon: 'error',
                  title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
                  text: i18n.language === 'az' ? 'FAQ yenilənmədi, xahiş edirik yenidən yoxlayın.' : 'The FAQ was not updated, please check again.',
                  confirmButtonText: i18n.language === 'az' ? 'Tamam' : 'OK'
              });
            }
  };




  return (
    <>
      <TopSection title={i18n.language === 'az' ? 'Faq Redaktə et!' : 'Edit Faq!'} currentPage={i18n.language === 'az' ? 'Faq Redaktə et!' : 'Edit Faq!'} />
      <section style={{ width: "100%", height: "auto", padding: "5% 20px" }} className="edit-container">
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
                  <div className="edit-part">
                    <h1>{i18n.language === 'az' ? 'Faq Redaktə et!' : 'Edit Faq!'}</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="questionAz">{t('faqs.QuestionAz')}</label>
                        <input
                          type="text"
                          name="questionAz"
                          id="questionAz"
                          value={formData.questionAz}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="questionEn">{t('faqs.QuestionEn')}</label>
                        <input
                          type="text"
                          name="questionEn"
                          id="questionEn"
                          value={formData.questionEn}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="answerAz">{t('faqs.AnswerAz')}</label>
                        <input
                          type="text"
                          name="answerAz"
                          id="answerAz"
                          value={formData.answerAz}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="answerEn">{t('faqs.AnswerEn')}</label>
                        <input
                          type="text"
                          name="answerEn"
                          id="answerEn"
                          value={formData.answerEn}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button type="submit">{i18n.language === 'az' ? 'Faq Redaktə et!' : 'Edit Faq!'}</button>
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

export default EditFaq;
