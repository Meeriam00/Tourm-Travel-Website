import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useEditDestinationMutation, useGetDestinationsQuery } from '../../../tools/services/destinationApi';
import Swal from 'sweetalert2';
import '../Edit.scss'
import { useTranslation } from 'react-i18next';


const EditDestination = () => {
    const {t}=useTranslation();
    const {i18n}=useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: destinations } = useGetDestinationsQuery();
    const [editDestination] = useEditDestinationMutation();
    
    const [formData, setFormData] = useState({
        destTitleAz: '',
        destTitleEn: '',
        destCount: '',
        destImg: null,
    });


    useEffect(() => {
        if (destinations) {
            const destination = destinations.find(destination => destination._id === id);
            if (destination) {
                setFormData({
                    destTitleAz: destination.destTitleAz,
                    destTitleEn: destination.destTitleEn,
                    destCount: destination.destCount,
                    destImg: null,
                });
            }
        }
    }, [destinations, id]);




    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            destImg: e.target.files[0],
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('destTitleAz', formData.destTitleAz);
        data.append('destTitleEn', formData.destTitleEn);
        data.append('destCount', formData.destCount);
        if (formData.destImg) {
            data.append('destImg', formData.destImg);
        }

        try {
            await editDestination({ id, formData: data }).unwrap();
            Swal.fire({
                icon: 'success',
                title: i18n.language === 'az' ? 'Uğurlu!' : 'Success!',
                text: i18n.language === 'az' ? 'Təyinat uğurla yeniləndi.' : 'Destination successfully updated.',
                confirmButtonText: i18n.language === 'az' ? 'Tamam' : 'OK'
            }).then(() => {
                navigate('/dashboard/destination-list'); 
            });
        } catch (err) {
            console.error("Update xətası:", err);
            Swal.fire({
                icon: 'error',
                title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
                text: i18n.language === 'az' ? 'Təyinat yenilənmədi, zəhmət olmasa yenidən yoxlayın.' : 'The destination was not updated, please check again.',
                confirmButtonText: i18n.language === 'az' ? 'Tamam' : 'OK'
            });
        }
    };

    return (
        <>
            <TopSection title={i18n.language === 'az' ? "Təyinatı Redaktə Edin" : "Edit Destination"} currentPage={i18n.language === 'az' ? "Təyinatı Redaktə Edin" : "Edit Destination"} />
            
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
                                        <h1>{i18n.language === 'az' ? "Təyinatı Redaktə Edin" : "Edit Destination"}</h1>
                                        <form onSubmit={handleSubmit}>

                                            <div className="form-group">
                                                <label htmlFor="destImg">{t('dashdestinations.destinationImage')}:</label>
                                                <input className='form-control' type='file' name="destImg" id="destImg" onChange={handleFileChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destTitleEn">{t('dashdestinations.destinationTitleEn')}:</label>
                                                <input type='text' name="destTitleEn" id="destTitleEn" value={formData.destTitleEn} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destTitleAz">{t('dashdestinations.destinationTitleAz')}:</label>
                                                <input type='text' name="destTitleAz" id="destTitleAz" value={formData.destTitleAz} onChange={handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destCount">{t('dashdestinations.tripCount')}:</label>
                                                <input type='number' name="destCount" id="destCount" value={formData.destCount} onChange={handleChange} />
                                            </div>

                                            <button type="submit">{i18n.language === 'az' ? "Təyinatı Redaktə Edin" : "Edit Destination"}</button>
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

export default EditDestination;
