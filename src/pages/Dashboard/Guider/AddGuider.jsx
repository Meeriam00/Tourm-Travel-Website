import React, { useState } from 'react';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 
import { useAddGuidersMutation } from '../../../tools/services/guiderApi';
import '../Add.scss'
import { useTranslation } from 'react-i18next';


const AddGuider = () => {
    const {t}=useTranslation();
    const {i18n}=useTranslation();
    const navigate = useNavigate(); 
    const [addGuider] = useAddGuidersMutation();

    const [formData, setFormData] = useState({
        id: '',
        fullname:'',
        positionAz: '',
        positionEn: '',
        aboutMeAz: '',
        aboutMeEn: '',
        experiencesAz: '',
        experiencesEn: '',
        totalGuide: '',
        totalServices: '',
        awardwon: '',
        totalevent: '',
        avatar: null,
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
            avatar: file,
        });
        setPreview(URL.createObjectURL(file)); 
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('id', formData.id);
        data.append('fullname', formData.fullname);
        data.append('positionAz', formData.positionAz);
        data.append('positionEn', formData.positionEn);
        data.append('aboutMeAz', formData.aboutMeAz);
        data.append('aboutMeEn', formData.aboutMeEn);
        data.append('experiencesAz', formData.experiencesAz);
        data.append('experiencesEn', formData.experiencesEn);
        data.append('totalGuide', formData.totalGuide);
        data.append('totalServices', formData.totalServices);
        data.append('awardwon', formData.awardwon);
        data.append('totalevent', formData.totalevent);
        data.append('avatar', formData.avatar);


        try {
            await addGuider(data).unwrap();
            Swal.fire({
                icon: 'success',
                title: i18n.language === 'az' ? 'Uğurla Əlavə Edildi!' : 'Success!',
                text: i18n.language === 'az' ? 'Guider uğurla əlavə edildi!' : 'Guider successfully added!',
            });
            navigate('/dashboard/guider-list'); 
        } catch (error) {
            console.error("Əlavə olunmadı:", error);
            Swal.fire({
                icon: 'error',
                title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
                text: i18n.language === 'az' ? 'Əlavə etmək mümkün olmadı!' : 'Could not add!',
            });
        }
    };

    return (
        <>
            <TopSection title={i18n.language === 'az' ? 'Bələdçi əlavə edin':"Add Guider"} currentPage={i18n.language === 'az' ? 'Bələdçi əlavə edin':"Add Guider"}/>
            <section style={{width:"100%", height:"auto", padding:"5% 20px"}} className="add-container">
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
                                        <h1>{t('guiders.addNewGuider')}</h1>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="id">{t('guiders.guiderId')}</label>
                                                <input type='number' name="id" id="id" value={formData.id} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="avatar">{t('guiders.guiderImage')}</label>
                                                <input className='form-control' type='file' name="avatar" id="avatar" onChange={handleFileChange} required />
                                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: '200px', borderRadius: '10px' }} />}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="fullname">{t('guiders.guiderFullName')}</label>
                                                <input type='text' name="fullname" id="fullname" value={formData.fullname} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="positionAz">{t('guiders.guiderPositionAz')}</label>
                                                <input type='text' name="positionAz" id="positionAz" value={formData.positionAz} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="positionEn">{t('guiders.guiderPositionEn')}</label>
                                                <input type='text' name="positionEn" id="positionEn" value={formData.positionEn} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="aboutMeAz">{t('guiders.guiderInfoAz')}</label>
                                                <input type='text' name="aboutMeAz" id="aboutMeAz" value={formData.aboutMeAz} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="aboutMeEn">{t('guiders.guiderInfoEn')}</label>
                                                <input type='text' name="aboutMeEn" id="aboutMeEn" value={formData.aboutMeEn} onChange={handleChange} required />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="experiencesAz">{t('guiders.guiderExperiencesAz')}</label>
                                                <input type='text' name="experiencesAz" id="experiencesAz" value={formData.experiencesAz} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="experiencesEn">{t('guiders.guiderExperiencesEn')}</label>
                                                <input type='text' name="experiencesEn" id="experiencesEn" value={formData.experiencesEn} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="totalGuide">{t('guiders.totalGuide')}</label>
                                                <input type='number' name="totalGuide" id="totalGuide" value={formData.totalGuide} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="awardwon">{t('guiders.awardWon')}</label>
                                                <input type='number' name="awardwon" id="awardwon" value={formData.awardWon} onChange={handleChange} required />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="totalevent">{t('guiders.totalEvent')}</label>
                                                <input type='number' name="totalevent" id="totalevent" value={formData.totalevent} onChange={handleChange} required />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="totalServices">{t('guiders.totalServices')}</label>
                                                <input type='number' name="totalServices" id="totalServices" value={formData.totalServices} onChange={handleChange} required />
                                            </div>

                                            <button type="submit">{t('guiders.addNewGuider')}</button>
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
}

export default AddGuider;
