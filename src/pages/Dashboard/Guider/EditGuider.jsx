import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useEditGuidersMutation, useGetGuidersQuery } from '../../../tools/services/guiderApi';
import '../Edit.scss'
import { useTranslation } from 'react-i18next';


const EditGuider = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: guiders } = useGetGuidersQuery();
    const [editGuider] = useEditGuidersMutation();

    const [formData, setFormData] = useState({
        id: '',
        fullname: '',
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

    useEffect(() => {
        if (guiders) {
            const guider = guiders.find(guider => guider._id === id);
            if (guider) {
                setFormData({
                    id: guider.id,
                    fullname: guider.fullname,
                    positionAz: guider.positionAz,
                    positionEn: guider.positionEn,
                    aboutMeAz: guider.aboutMeAz,
                    aboutMeEn: guider.aboutMeEn,
                    experiencesAz: guider.experiencesAz,
                    experiencesEn: guider.experiencesEn,
                    totalGuide: guider.totalGuide,
                    totalServices: guider.totalServices,
                    awardwon: guider.awardwon,
                    totalevent: guider.totalevent,
                    avatar: null,
                });
            }
        }
    }, [guiders, id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0],
        });
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

        if (formData.avatar) {
            data.append('avatar', formData.avatar);
        }

        try {
            await editGuider({ id, formData: data }).unwrap();
            Swal.fire({
                icon: 'success',
                title: i18n.language === 'az' ? 'Uğurla Yeniləndi!' : 'Success!',
                text: i18n.language === 'az' ? 'Guider uğurla yeniləndi.' : 'Guider successfully updated.',
                confirmButtonText: i18n.language === 'az' ? 'OK' : 'OK'
            }).then(() => {
                navigate('/dashboard/guider-list');
            });

        } catch (err) {
            console.error("Update xətası:", err);
            Swal.fire({
                icon: 'error',
                title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
                text: i18n.language === 'az' ? 'Guider yenilənmədi, zəhmət olmasa yenidən yoxlayın.' : 'The Guider was not updated, please check again.',
                confirmButtonText: i18n.language === 'az' ? 'OK' : 'OK'
            });
        }
    };

    return (
        <>
            <TopSection title={i18n.language === 'az' ? 'Redaktə Bələdçisi' : 'Edit Guider'} currentPage={i18n.language === 'az' ? 'Redaktə Bələdçisi' : 'Edit Guider'} />


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
                                    <div className='edit-part'>
                                        <h1>{i18n.language === 'az' ? 'Redaktə Bələdçisi' : 'Edit Guider'}</h1>

                                        <form onSubmit={handleSubmit}>

                                            <div className="form-group">
                                                <label htmlFor="id">ID:</label>
                                                <input type='number' name="id" id="id" value={formData.id} onChange={handleChange}  />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="avatar">{t('guiders.guiderImage')}</label>
                                                <input className='form-control' type='file' name="avatar" id="avatar" onChange={handleFileChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="fullname">{t('guiders.guiderFullName')}</label>
                                                <input type='text' name="fullname" id="fullname" value={formData.fullname} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="positionAz">{t('guiders.guiderPositionAz')}</label>
                                                <input type='text' name="positionAz" id="positionAz" value={formData.positionAz} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="positionEn">{t('guiders.guiderPositionEn')}</label>
                                                <input type='text' name="positionEn" id="positionEn" value={formData.positionEn} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="aboutMeAz">{t('guiders.guiderInfoAz')}</label>
                                                <input type='text' name="aboutMeAz" id="aboutMeAz" value={formData.aboutMeAz} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="aboutMeEn">{t('guiders.guiderInfoEn')}</label>
                                                <input type='text' name="aboutMeEn" id="aboutMeEn" value={formData.aboutMeEn} onChange={handleChange}  />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="experiencesAz">{t('guiders.guiderExperiencesAz')}</label>
                                                <input type='text' name="experiencesAz" id="experiencesAz" value={formData.experiencesAz} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="experiencesEn">{t('guiders.guiderExperiencesEn')}</label>
                                                <input type='text' name="experiencesEn" id="experiencesEn" value={formData.experiencesEn} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="totalGuide">{t('guiders.totalGuide')}</label>
                                                <input type='number' name="totalGuide" id="totalGuide" value={formData.totalGuide} onChange={handleChange}  />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="awardwon">{t('guiders.awardWon')}</label>
                                                <input type='number' name="awardwon" id="awardwon" value={formData.awardwon} onChange={handleChange}  />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="totalevent">{t('guiders.totalEvent')}</label>
                                                <input type='number' name="totalevent" id="totalevent" value={formData.totalevent} onChange={handleChange}  />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="totalServices">{t('guiders.totalServices')}</label>
                                                <input type='number' name="totalServices" id="totalServices" value={formData.totalServices} onChange={handleChange}  />
                                            </div>

                                            <button type="submit">{i18n.language === 'az' ? 'Redaktə Bələdçisi' : 'Edit Guider'}</button>
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

export default EditGuider;
