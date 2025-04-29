import React from 'react';
import { Link } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useDeleteGuidersMutation, useGetGuidersQuery } from '../../../tools/services/guiderApi';
import Preloader from '../../../components/Preloader/Preloader';
import '../List.scss'
import { useTranslation } from 'react-i18next';

const GuiderList = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { data: guiders, isLoading } = useGetGuidersQuery();
    const [deleteGuiders] = useDeleteGuidersMutation();

    if (isLoading) {
        return <Preloader />;
    }

    const handleDelete = async (id) => {
        try {
            await deleteGuiders(id).unwrap();
            Swal.fire({
                icon: 'success',
                title: i18n.language === 'az' ? 'Uğur!' : 'Success!',
                text: i18n.language === 'az' ? 'Uğurla silindi!' : 'Successfully deleted!',
                timer: 2000,
                showConfirmButton: true
            });

        } catch (err) {
            console.error("Silinmə xətası:", err);
            Swal.fire({
                icon: 'error',
                title: i18n.language === 'az' ? 'Xəta!' : 'Error!',
                text: i18n.language === 'az' ? 'Silinmə zamanı problem yarandı.' : 'There was a problem during deletion.',
                timer: 2000,
                showConfirmButton: true
            });
        }
    };



    return (
        <>
            <TopSection title={i18n.language === 'az' ? 'Bələdçi Siyahısı' : 'Guider List'} currentPage={i18n.language === 'az' ? 'Bələdçi Siyahısı' : 'Guider List'} />

            <div style={{ width: "100%", height: "auto", padding: "5% 20px" }} className="list-container">
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
                                        <h1>{i18n.language === 'az' ? 'Bələdçi Siyahısı' : 'Guider List'}</h1>
                                        <Link to="/dashboard/add-guider">
                                            <button>+ {i18n.language === 'az' ? 'Yeni Bələdçi əlavə edin' : 'Add New Guider'}</button>
                                        </Link>
                                    </div>

                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>
                                                <th scope='col'>{t('guiders.guiderImage')}</th>
                                                <th scope="col">{t('guiders.guiderFullName')}</th>

                                                <th scope="col">{t('guiders.guiderPositionEn')}</th>

                                                <th scope="col">{t('dashboard-activity.edit')}</th>
                                                <th scope="col">{t('dashboard-activity.delete')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className='body-table'>
                                            {guiders?.map(guider => (
                                                <tr key={guider._id}>
                                                    <td>
                                                        <img style={{ width: "90px", height: "100px", borderRadius: "50%" }} src={`https://tourm-travel-backend-2.onrender.com/${guider.avatar ? guider.avatar.replace(/\\/g, '/') : "Sekil post edilmedi"}`} alt={guider.fullname} />
                                                    </td>
                                                    <td>{guider.fullname}</td>

                                                    <td>{guider.positionEn}</td>


                                                    <td>
                                                        <Link to={`/dashboard/edit-guider/${guider._id}`}>
                                                            <button className='edit-btn'>{t('dashboard-activity.edit')}</button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className='delete-btn' onClick={() => handleDelete(guider._id)}>
                                                            {t('dashboard-activity.delete')}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GuiderList;


