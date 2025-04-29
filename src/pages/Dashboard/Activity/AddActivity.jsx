import React, { useState } from 'react'
import { useAddActivityMutation } from '../../../tools/services/activityApi';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Add.scss'
import { useTranslation } from 'react-i18next';
const AddActivity = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const navigate = useNavigate();
  const [addActivity] = useAddActivityMutation();
  const [formData, setFormData] = useState({
    actTitleAz: '',
    actTitleEn: '',
    tripCount: '',
    actImg: null,
  });


  const [preview, setPreview] = useState(null); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({
            ...formData,
            actImg: file,
        });
        setPreview(URL.createObjectURL(file)); 
    }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('actTitleAz', formData.actTitleAz);
    data.append('actTitleEn', formData.actTitleEn);
    data.append('tripCount', formData.tripCount);
    if (formData.actImg) {
      data.append('actImg', formData.actImg);
    }

    try {
      await addActivity(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: t('dashboard-activity.successTitle'),
        text: i18n.language === 'az' ? 'Fəaliyyət uğurla əlavə edildi!':'Activity successfully added!',
      });
      navigate('/dashboard/activity-list');
    } catch (error) {
      console.error("Əlavə olunmadı:", error);
      Swal.fire({
        icon: 'error',
        title: t('dashboard-activity.errorTitle'),
        text: i18n.language === 'az' ? 'Əlavə etmək mümkün olmadı!':'Could not add!',
      });
    }
  };




  return (
    <>
      <TopSection title={i18n.language ==='az' ? "Fəaliyyət əlavə edin":"Add Activity"} currentPage={i18n.language ==='az' ? "Fəaliyyət əlavə edin":"Add Activity"} />
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
                  <div className='add-part'>
                    <h1>{t('dashboard-activity.addNewActivity1')}</h1>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="actImg">{t('dashboard-activity.activityImage')}:</label>
                        <input className='form-control' type='file' name="actImg" id="actImg" onChange={handleFileChange} required />
                        {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: '200px', borderRadius: '10px' }} />}
                      </div>

                      <div className="form-group">
                        <label htmlFor="actTitleEn">{t('dashboard-activity.activityTitleEn')}:</label>
                        <input type='text' name="actTitleEn" id="actTitleEn" value={formData.actTitleEn} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="actTitleAz">{t('dashboard-activity.activityTitleAz')}:</label>
                        <input  type='text' name="actTitleAz" id="actTitleAz" value={formData.actTitleAz} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="tripCount">{t('dashboard-activity.tripCount')}:</label>
                        <input type='number' name="tripCount" id="tripCount" value={formData.tripCount} onChange={handleChange} required />
                      </div>

                      <button type="submit">{t('dashboard-activity.addNewActivity1')}</button>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddActivity;
