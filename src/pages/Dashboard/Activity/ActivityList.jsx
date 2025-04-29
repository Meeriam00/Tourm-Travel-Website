import React from 'react';
import { useDeleteActivityMutation, useGetActivitiesQuery } from '../../../tools/services/activityApi';
import { Link } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import Preloader from '../../../components/Preloader/Preloader';
import '../List.scss'
import { useTranslation } from 'react-i18next';


const ActivityList = () => {
    const { t } = useTranslation();
    const { data: activities, isLoading } = useGetActivitiesQuery();
    const [deleteActivity] = useDeleteActivityMutation();

    if (isLoading) {
        return <Preloader />;
    }

    console.log(activities);


    const handleDelete = async (id) => {
        try {
            await deleteActivity(id).unwrap();
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
            <TopSection title={t('dashboard-activity.activityList')} currentPage={t('dashboard-activity.activityList')} />

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
                                        <h1>{t('dashboard-activity.activityList')}</h1>
                                        <Link to="/dashboard/add-activity">
                                            <button>{t('dashboard-activity.addNewActivity')}</button>
                                        </Link>
                                    </div>

                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>
                                                <th scope='col'>{t('dashboard-activity.activityImage')}</th>

                                                <th scope="col">{t('dashboard-activity.activityTitleEn')}</th>
                                                <th scope="col">{t('dashboard-activity.tripCount')}</th>
                                                <th scope="col">{t('dashboard-activity.edit')}</th>
                                                <th scope="col">{t('dashboard-activity.delete')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className='body-table'>
                                            {activities?.map(activity => (
                                                <tr key={activity._id}>
                                                    <td>
                                                        <img
                                                            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                                                            src={`https://tourm-travel-backend-2.onrender.com/${activity.actImg ? activity.actImg.replace(/\\/g, '/') : "default-image.jpg"}`}
                                                            alt={activity.actTitleAz}
                                                        />
                                                    </td>

                                                    <td>{activity.actTitleEn}</td>
                                                    <td>{activity.tripCount}</td>
                                                    <td>
                                                        <Link to={`/dashboard/edit-activity/${activity._id}`}>
                                                            <button className='edit-btn'>{t('dashboard-activity.edit')}</button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className='delete-btn' onClick={() => handleDelete(activity._id)}>
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

export default ActivityList;
