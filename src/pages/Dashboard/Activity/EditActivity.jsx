import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditActivityMutation, useGetActivitiesQuery } from '../../../tools/services/activityApi';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import '../Edit.scss'
import { useTranslation } from 'react-i18next';
const EditActivity = () => {
    const {t}=useTranslation();
    const {i18n}=useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: activities } = useGetActivitiesQuery();
    const [editActivity] = useEditActivityMutation();
    const [formData, setFormData] = useState({
        actTitleAz: '',
        actTitleEn: '',
        tripCount: '',
        actImg: null,
    });

    useEffect(() => {
        if (activities) {
            const activity = activities.find(activity => activity._id === id);
            if (activity) {
                setFormData({
                    actTitleAz: activity.actTitleAz,
                    actTitleEn: activity.actTitleEn,
                    tripCount: activity.tripCount,
                    actImg: null,
                });
            }
        }
    }, [activities, id]);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            actImg: e.target.files[0],
        });
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
            await editActivity({ id, formData: data }).unwrap();
            Swal.fire({
                icon: 'success',
                title: t('dashboard-activity.successTitle'),
                text: i18n.language ==='az' ? 'Fəaliyyət uğurla yeniləndi.':'Activity successfully updated.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/dashboard/activity-list');
            });
        } catch (err) {
            console.error("Update xətası:", err);
            Swal.fire({
                icon: 'error',
                title: t('dashboard-activity.errorTitle'),
                text:  i18n.language ==='az' ? 'Fəaliyyəti yeniləmək mümkün olmadı, zəhmət olmasa, bir daha cəhd edin.':'The Activity was not updated, please check again.',
                confirmButtonText: 'OK'
            });
        }
    };









    return (
        <>
            <TopSection title={i18n.language ==='az' ? "Fəaliyyəti Redaktə Edin":"Edit Activity"} currentPage={i18n.language ==='az' ? "Fəaliyyəti Redaktə Edin":"Edit Activity"} />


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
                                        <h1>{i18n.language ==='az' ? "Fəaliyyəti Redaktə Edin":"Edit Activity"}</h1>
                                        <form onSubmit={handleSubmit}>

                                            <div className="form-group">
                                                <label htmlFor="actImg">{t('dashboard-activity.activityImage')}:</label>
                                                <input className='form-control' type='file' name="actImg" id="actImg" onChange={handleFileChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="actTitleEn">{t('dashboard-activity.activityTitleEn')}:</label>
                                                <input type='text' name="actTitleEn" id="actTitleEn" value={formData.actTitleEn} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="actTitleAz">{t('dashboard-activity.activityTitleAz')}:</label>
                                                <input type='text' name="actTitleAz" id="actTitleAz" value={formData.actTitleAz} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="tripCount">{t('dashboard-activity.tripCount')}:</label>
                                                <input type='number' name="tripCount" id="tripCount" value={formData.tripCount} onChange={handleChange} />
                                            </div>

                                            <button type="submit">{i18n.language ==='az' ? "Fəaliyyəti Redaktə Edin":"Edit Activity"}</button>
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

export default EditActivity;
