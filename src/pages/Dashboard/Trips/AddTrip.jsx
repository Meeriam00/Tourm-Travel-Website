import React, { useState } from 'react';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAddTourMutation } from '../../../tools/services/tripApi';
import '../Add.scss'


const AddTrip = () => {
    const navigate = useNavigate();
    const [addTour] = useAddTourMutation();
    const [formData, setFormData] = useState({
        id: '',
        titleEn: '',
        titleAz: '',
        duration: '',
        images: [],
        tripInfo: {
            accommodationEn: '',
            accommodationAz: '',
            departureCityEn: '',
            departureCityAz: '',
            arrivalCityEn: '',
            arrivalCityAz: '',
            bestSeasonEn: '',
            bestSeasonAz: '',
            guideEn: '',
            guideAz: '',
            language: '',
            mealsEn: '',
            mealsAz: '',
            tourAvailabilityEn: '',
            tourAvailabilityAz: '',
            transportationEn: '',
            transportationAz: '',
            walkingHoursEn: '',
            walkingHoursAz: '',
            minimumAge: '',
            maximumAge: '',
            tripTypeEn: '',
            tripTypeAz: '',
            originalprice: '',
            discountedprice: '',
            discount: ''
        },
        destination: '',
        activity: '',
        overview: {
            titleEn: '',
            titleAz: '',
            descriptionEn: '',
            descriptionAz: ''
        },
        itinerary: {
            titleEn: '',
            titleAz: '',
            dayOneEn: '',
            dayOneAz: '',
            dayTwoEn: '',
            dayTwoAz: '',
            dayThreeEn: '',
            dayThreeAz: '',
            dayFourEn: '',
            dayFourAz: '',
            dayFiveEn: '',
            dayFiveAz: '',
            daySixEn: '',
            daySixAz: '',
            daySevenEn: '',
            daySevenAz: '',

        },
        cost: {
            titleEn: '',
            titleAz: '',
            descriptionEn: '',
            descriptionAz: ''
        },
        rating: 4.5
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNestedChange = (e, section) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [name]: value
            }
        });
    };


    const [previewImages, setPreviewImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => URL.createObjectURL(file));

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files] 
        }));

        setPreviewImages((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    };
    
    



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    
    
    formDataToSend.append("id", formData.id);
    formDataToSend.append("titleEn", formData.titleEn);
    formDataToSend.append("titleAz", formData.titleAz);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("activity", formData.activity);
    formDataToSend.append("rating", formData.rating);

    
    formData.images.forEach((image) => {
        formDataToSend.append("images", image);
    });

    
    
    Object.entries(formData.tripInfo).forEach(([key, value]) => {
        formDataToSend.append(`tripInfo[${key}]`, value);
    });

    Object.entries(formData.overview).forEach(([key, value]) => {
        formDataToSend.append(`overview[${key}]`, value);
    });

    Object.entries(formData.itinerary).forEach(([key, value]) => {
        formDataToSend.append(`itinerary[${key}]`, value);
    });

    Object.entries(formData.cost).forEach(([key, value]) => {
        formDataToSend.append(`cost[${key}]`, value);
    });



    try {
        await addTour(formDataToSend).unwrap();
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Tour successfully added!'
        });
        navigate('/dashboard/trip-list');
    } catch (error) {
        console.error("Əlavə olunmadı:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Could not add the tour!'
        });
    }
};






    return (
        <>
            <TopSection title="Add Trip" currentPage="Add Trip"/>
            <section style={{width:"100%", height:"auto", padding:"5% 20px"}} className="add-container">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-lg-9">
                            <div className="add-part">
                                <h1>Add New Trip</h1>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="tripImages">Trip ID:</label>
                                        <input type="number" name="id" value={formData.id} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="titleEn">TitleEn:</label>
                                        <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="titleAz">TitleAz:</label>
                                        <input type="text" name="titleAz"  value={formData.titleAz} onChange={handleChange} required />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="duration">Duration:</label>
                                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="tripImages">Trip Images:</label>
                                        <input className='form-control' type='file' name="tripImages" id="tripImages" multiple onChange={handleFileChange} required />
                                    </div>

                                    
                                    <div className="image-preview-container">
                                        {previewImages.map((image, index) => (
                                            <img key={index} src={image} alt={`preview-${index}`} style={{ width: "100px", height: "100px", margin: "5px", borderRadius: "5px" }} />
                                        ))}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="destination">Destination ID</label>
                                        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="destination">Activity ID</label>
                                        <input type="text" name="activity" value={formData.activity} onChange={handleChange} required />
                                    </div>


                                    <h3 style={{color:"#1c5563"}}>Trip Info</h3>
                                    {Object.keys(formData.tripInfo).map((key) => (
                                           <input  key={key} type="text" name={key} placeholder={key} value={formData.tripInfo[key]} onChange={(e) => handleNestedChange(e, 'tripInfo')} />
                                    ))}


                                    <h3 style={{color:"#1c5563"}}>Overview</h3>
                                    {Object.keys(formData.overview).map((key) => (
                                        <input key={key} type="text" name={key} placeholder={key} value={formData.overview[key]} onChange={(e) => handleNestedChange(e, 'overview')} />
                                    ))}


                                    <h3 style={{color:"#1c5563"}}>Itinerary</h3>
                                    {Object.keys(formData.itinerary).map((key) => (
                                        <input key={key} type="text" name={key} placeholder={key} value={formData.itinerary[key]} onChange={(e) => handleNestedChange(e, 'itinerary')} />
                                    ))}


                                    <h3 style={{color:"#1c5563"}}>Cost</h3>
                                    {Object.keys(formData.cost).map((key) => (
                                        <input key={key} type="text" name={key} placeholder={key} value={formData.cost[key]} onChange={(e) => handleNestedChange(e, 'cost')} />
                                    ))}


                                    <button type="submit">Add New Trip</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddTrip;
