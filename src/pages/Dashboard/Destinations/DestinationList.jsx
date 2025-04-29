import React from 'react';
import { Link } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useDeleteDestinationMutation, useGetDestinationsQuery } from '../../../tools/services/destinationApi';
import Swal from 'sweetalert2';
import Preloader from '../../../components/Preloader/Preloader';
import '../List.scss'
import { useTranslation } from 'react-i18next';

const DestinationList = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { data: destinations, isLoading } = useGetDestinationsQuery();
    const [deleteDestination] = useDeleteDestinationMutation();

    if (isLoading) {
        return <Preloader />;
    }



    const handleDelete = async (id) => {
        try {
            await deleteDestination(id).unwrap();
            Swal.fire({
                icon: 'success',
                title: t('dashboard-activity.successTitle'),
                text: t('dashboard-activity.successText'),
                timer: 2000,
                showConfirmButton: true
            });
        } catch (err) {
            console.error("Silinmə xətası:", err);
            Swal.fire({
                icon: 'error',
                title: t('dashboard-activity.errorTitle'),
                text: t('dashboard-activity.errorText'),
                timer: 2000,
                showConfirmButton: true
            });
        }
    };



    return (
        <>
            <TopSection title={i18n.language === 'az' ? 'Təyinat Siyahısı' : 'Destination List'} currentPage={i18n.language === 'az' ? 'Təyinat Siyahısı' : 'Destination List'} />

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
                                        <h1>{i18n.language === 'az' ? 'Təyinat Siyahısı' : 'Destination List'}</h1>
                                        <Link to="/dashboard/add-destination">
                                            <button>+ {i18n.language === 'az' ? 'Yeni Təyinat Elave Et' : 'Add New Destination'}</button>
                                        </Link>
                                    </div>

                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>
                                                <th scope='col'>{t('dashdestinations.destinationImage')}</th>

                                                <th scope="col">{t('dashdestinations.destinationTitleEn')}</th>
                                                <th scope="col">{t('dashdestinations.tripCount')}</th>
                                                <th scope="col">{t('dashboard-activity.edit')}</th>
                                                <th scope="col">{t('dashboard-activity.delete')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className='body-table'>
                                            {destinations?.map(destination => (
                                                <tr key={destination._id}>
                                                    <td>
                                                        <img style={{ width: "70px", height: "70px", borderRadius: "50%" }} src={`https://tourm-travel-backend-2.onrender.com/${destination.destImg ? destination.destImg.replace(/\\/g, '/') : "Sekil post edilmedi"}`} alt={destination.destTitleEn} />
                                                    </td>

                                                    <td>{destination.destTitleEn}</td>
                                                    <td>{destination.destCount}</td>
                                                    <td>
                                                        <Link to={`/dashboard/edit-destination/${destination._id}`}>
                                                            <button className='edit-btn'>{t('dashboard-activity.edit')}</button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className='delete-btn' onClick={() => handleDelete(destination._id)}>
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

export default DestinationList;





