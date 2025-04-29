import React from 'react';
import { Link } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useDeleteTourMutation, useGetTourQuery } from '../../../tools/services/tripApi';
import Preloader from '../../../components/Preloader/Preloader';

const TripList = () => {
    const { data: trips, isLoading } = useGetTourQuery();
    const [deletTrips] = useDeleteTourMutation();


    if (isLoading) {
        return <Preloader />;
    }



    const handleDelete = async (id) => {
        try {
            await deletTrips(id).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Successfully deleted!',
                timer: 2000,
                showConfirmButton: true
            });
        } catch (err) {
            console.error("Silinmə xətası:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was a problem during deletion.',
                timer: 2000,
                showConfirmButton: true
            });
        }
    };



    return (
        <>
            <TopSection title="Trip  List" currentPage="Trip  List" />

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
                                        <h1>Trip  List</h1>
                                        <Link to="/dashboard/add-trip">
                                            <button>+ Add New Trip</button>
                                        </Link>
                                    </div>

                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>
                                                <th scope='col'>Trip ID</th>
                                                <th scope="col">Trip Title(En)</th>
                                                <th scope="col">Trip Title(Az)</th>

                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className='body-table'>
                                            {trips?.map(trip => (
                                                <tr key={trip._id}>
                                                    <td>{trip.id}</td>
                                                    <td>{trip.titleEn}</td>
                                                    <td>{trip.titleAz}</td>

                                                    <td>
                                                        <Link to={`/dashboard/edit-trip/${trip._id}`}>
                                                            <button className='edit-btn'>Edit</button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className='delete-btn' onClick={() => handleDelete(trip._id)}>
                                                            Delete
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

export default TripList;





