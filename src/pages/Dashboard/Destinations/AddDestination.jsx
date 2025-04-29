import React, { useState } from 'react';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom'; 
import { useAddDestinationMutation } from '../../../tools/services/destinationApi';
import Swal from 'sweetalert2'; 
import '../Add.scss'
import { useTranslation } from 'react-i18next';

const AddDestination = () => {
    const {t}=useTranslation();
    const navigate = useNavigate(); 
    const [addDestination] = useAddDestinationMutation();
    const [formData, setFormData] = useState({
        id: '',
        destTitleAz: '',
        destTitleEn: '',
        destCount: '',
        destImg: null,
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
                destImg: file,
            });
            setPreview(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('destTitleAz', formData.destTitleAz);
        data.append('destTitleEn', formData.destTitleEn);
        data.append('destCount', formData.destCount);
        data.append('id', formData.id);
        data.append('destImg', formData.destImg);

        try {
            await addDestination(data).unwrap();
            Swal.fire({
                icon: 'success',
                title: t('dashdestinations.success'),
                text: t('dashdestinations.destinationAdded'),
            });
            navigate('/dashboard/destination-list'); 
        } catch (error) {
            console.error("Əlavə olunmadı:", error);
            Swal.fire({
                icon: 'error',
                title: t('dashdestinations.error'),
                text: t('dashdestinations.destinationNotAdded'),
            });
        }
    };

    return (
        <>
            <TopSection title={t('dashdestinations.addDestination')}  currentPage={t('dashdestinations.addDestination')}/>
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
                                        <h1>{t('dashdestinations.addNewDestination')}</h1>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="id">{t('dashdestinations.destinationID')}:</label>
                                                <input type='number' name="id" id="id" value={formData.id} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destImg">{t('dashdestinations.destinationImage')}:</label>
                                                <input className='form-control' type='file' name="destImg" id="destImg" onChange={handleFileChange} required />
                                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: '200px', borderRadius: '10px' }} />}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destTitleEn">{t('dashdestinations.destinationTitleEn')}:</label>
                                                <input type='text' name="destTitleEn" id="destTitleEn" value={formData.destTitleEn} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destTitleAz">{t('dashdestinations.destinationTitleAz')}:</label>
                                                <input type='text' name="destTitleAz" id="destTitleAz" value={formData.destTitleAz} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="destCount">{t('dashdestinations.tripCount')}:</label>
                                                <input type='number' name="destCount" id="destCount" value={formData.destCount} onChange={handleChange} required />
                                            </div>

                                            <button type="submit">{t('dashdestinations.addNewDestination')}</button>
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

export default AddDestination;
