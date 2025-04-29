import React from 'react'
import TopSection from '../../../components/TopSection/TopSection'
import { useGetFaqsQuery, useDeleteFaqMutation } from "../../../tools/services/faqApi";
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar'
import '../List.scss'
import Preloader from '../../../components/Preloader/Preloader';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const FaqList = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { data: faqs, isLoading } = useGetFaqsQuery();
  const [deleteFaq] = useDeleteFaqMutation();



  if (isLoading) {
    return <Preloader />;
  }


  const handleDelete = async (id) => {
    try {
      await deleteFaq(id).unwrap();
      Swal.fire({
        icon: 'success',
        title: i18n.language === 'az' ? 'Uğurlu!' : 'Success!',
        text: i18n.language === 'az' ? 'Uğurla silindi!' : 'Successfully deleted!',
        timer: 2000,
        showConfirmButton: true
      });
    } catch (err) {
      console.error("Silinmə xətası:", err);
      Swal.fire({
        icon: 'error',
        title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
        text: i18n.language === 'az' ? 'Silinmə zamanı problem yaranıb.' : 'There was a problem during deletion.',
        timer: 2000,
        showConfirmButton: true
      });
    }
  };


  return (
    <>
      <TopSection title={i18n.language === 'az' ? 'Tez-tez verilən suallar siyahısı' : 'Faq List'} currentPage={i18n.language === 'az' ? 'Tez-tez verilən suallar siyahısı' : 'Faq List'} />

      <section style={{ width: "100%", height: "auto", padding: "5% 20px" }} className="list-container">
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

                  <div className='list'>
                    <h1>{i18n.language === 'az' ? 'Tez-tez verilən suallar siyahısı' : 'Faq List'}</h1>
                    <Link to="/dashboard/add-faq">
                      <button>+{i18n.language === 'az' ? 'Yeni Faq Elave Et' : 'Add New Faq'}</button>
                    </Link>
                  </div>

                  <table className="table">
                    <thead className='head-table'>
                      <tr>

                        <th scope="col">{t('faqs.QuestionEn')}</th>
                        <th scope="col">{t('faqs.AnswerAz')}</th>
                        <th scope="col">{t('faqs.AnswerEn')}</th>
                        <th scope="col">{t('dashboard-activity.edit')}</th>
                        <th scope="col">{t('dashboard-activity.delete')}</th>
                      </tr>
                    </thead>

                    {faqs?.map((faq) => (
                      <tbody className='body-table' key={faq._id}>
                        <tr>

                          <td>{faq.questionEn.slice(0, 15)}...</td>
                          <td>{faq.answerAz.slice(0, 15)}...</td>
                          <td>{faq.answerEn.slice(0, 15)}...</td>
                          <td><Link to={`/dashboard/edit-faq/${faq._id}`}>
                            <button className='edit-btn'>{t('dashboard-activity.edit')}</button>
                          </Link></td>
                          <td><button className='delete-btn' onClick={() => handleDelete(faq._id)}>{t('dashboard-activity.delete')}</button></td>
                        </tr>
                      </tbody>
                    ))}
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqList;
