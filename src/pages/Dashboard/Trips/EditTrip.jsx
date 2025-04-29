import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useEditTourMutation, useGetTourQuery } from '../../../tools/services/tripApi';

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editTrip] = useEditTourMutation();
  const { data: trips, error } = useGetTourQuery();

  const [formData, setFormData] = useState({
    id:'',
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
      descriptionEn: '',
      descriptionAz: ''
    },

    cost: {
      titleEn: '',
      titleAz: '',
      descriptionEn: '',
      descriptionAz: ''
    },
    rating: 4.5
  });


  useEffect(() => {
    if (trips) {
      const trip = trips.find(trip => trip._id === id);
      if (trip) {
        setFormData({
           id:  Number(trip.id),
           titleEn: trip.titleEn ,
           titleAz: trip.titleAz ,
           duration: trip.duration ,
           images: trip.images,
          tripInfo: {
            accommodationEn: trip.tripInfo.accommodationEn ,
            accommodationAz: trip.tripInfo.accommodationAz ,
            departureCityEn: trip.tripInfo.departureCityEn ,
            departureCityAz: trip.tripInfo.departureCityAz ,
            arrivalCityEn: trip.tripInfo.arrivalCityEn ,
            arrivalCityAz: trip.tripInfo.arrivalCityAz ,
            bestSeasonEn: trip.tripInfo.bestSeasonEn ,
            bestSeasonAz: trip.tripInfo.bestSeasonAz ,
            guideEn: trip.tripInfo.guideEn ,
            guideAz: trip.tripInfo.guideAz ,
            language: trip.tripInfo.language ,
            mealsEn: trip.tripInfo.mealsEn ,
            mealsAz: trip.tripInfo.mealsAz ,
            tourAvailabilityEn: trip.tripInfo.tourAvailabilityEn ,
            tourAvailabilityAz: trip.tripInfo.tourAvailabilityAz ,
            transportationEn: trip.tripInfo.transportationEn ,
            transportationAz: trip.tripInfo.transportationAz ,
            walkingHoursEn: trip.tripInfo.walkingHoursEn ,
            walkingHoursAz: trip.tripInfo.walkingHoursAz ,
            minimumAge: trip.tripInfo.minimumAge ,
            maximumAge: trip.tripInfo.maximumAge ,
            tripTypeEn: trip.tripInfo.tripTypeEn ,
            tripTypeAz: trip.tripInfo.tripTypeAz ,
            originalprice: trip.tripInfo.originalprice ,
            discountedprice: trip.tripInfo.discountedprice ,
            discount: trip.tripInfo.discount 
          },
          destination: trip.destination.map(dest => dest._id).join(", "),
          activity: trip.activity.map(act => act._id).join(", ") ,
          overview: {
            titleEn: trip.overview.titleEn ,
            titleAz: trip.overview.titleAz ,
            descriptionEn: trip.overview.descriptionEn ,
            descriptionAz: trip.overview.descriptionAz 
          },
          itinerary: {
            titleEn: trip.itinerary.titleEn,
            titleAz: trip.itinerary.titleAz,
            dayOneEn: trip.itinerary.dayOneEn,
            dayOneAz: trip.itinerary.dayOneAz,
            dayTwoEn: trip.itinerary.dayTwoEn,
            dayTwoAz: trip.itinerary.dayTwoAz,
            dayThreeEn: trip.itinerary.dayThreeEn,
            dayThreeAz: trip.itinerary.dayThreeAz,
            dayFourEn: trip.itinerary.dayFourEn,
            dayFourAz: trip.itinerary.dayFourAz,
            dayFiveEn: trip.itinerary.dayFiveEn,
            dayFiveAz: trip.itinerary.dayFiveAz,
            daySixEn: trip.itinerary.daySixEn,
            daySixAz: trip.itinerary.daySixAz,
            daySevenEn: trip.itinerary.daySevenEn,
            daySevenAz: trip.itinerary.daySevenAz
          },
          cost: {
            titleEn: trip.cost.titleEn ,
            titleAz: trip.cost.titleAz ,
            descriptionEn: trip.cost.descriptionEn ,
            descriptionAz: trip.cost.descriptionAz 
          },
          rating: trip.rating || 4.5
        });
      }
    }
  }, [trips, id]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "id" ? Number(value) : value, // Əgər id dəyişirsə, onu sayıya çeviririk
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

      
      



  const handleNestedChange = (e, section) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [e.target.name]: e.target.value,
      },
    });
  };






  const handleSubmit = async (e) => {
    e.preventDefault();


    
    const formDataToSend = new FormData();
    formDataToSend.append("id", Number(formData.id)); 
    formDataToSend.append("titleEn", formData.titleEn);
    formDataToSend.append("titleAz", formData.titleAz);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("destination", JSON.stringify(formData.destination));
    formDataToSend.append("activity", JSON.stringify(formData.activity));
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
       await editTrip({ id: id, formData: formDataToSend }).unwrap();
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Tour successfully updated!'
        });
        navigate('/dashboard/trip-list');
    } catch (error) {
        console.error("Əlavə olunmadı:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Could not edit the tour!'
        });
    }
};





  return (
    <>
      <TopSection title="Edit Trips" currentPage="Edit Trips" />

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
                    <h1>Edit Trips</h1>
                    <form onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label htmlFor="">Trip ID:</label>
                        <input type="number" name="id" value={formData.id} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleEn">TitleEn:</label>
                        <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleAz">TitleAz:</label>
                        <input type="text" name="titleAz" value={formData.titleAz} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="duration">Duration:</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="tripImages">Upload New Images:</label>
                        <input className='form-control' type='file' name="tripImages" id="tripImages" multiple onChange={handleFileChange} />
                      </div>


                      <div className="image-preview-container">
                        {previewImages.map((image, index) => (
                          <img key={index} src={image} alt={`preview-${index}`} style={{ width: "100px", height: "100px", margin: "5px", borderRadius: "5px" }} />
                        ))}
                      </div>


                      <div className="form-group">
                        <label htmlFor="destination">Destination ID</label>
                        <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) =>
                              setFormData({ ...formData, destination: e.target.value.split(", ") })
                            }
                          />
                      </div>

                      <div className="form-group">
                        <label htmlFor="destination">Activity ID</label>
                        <input
                          type="text"
                          value={formData.activity}
                          onChange={(e) =>
                            setFormData({ ...formData, activity: e.target.value.split(", ") })
                          }
                        />
                      </div>

                      <h3 style={{ color: "#1c5563" }}>Trip Info</h3>
                      {Object.keys(formData.tripInfo).map((key) => (
                        <input key={key} type="text" name={key} placeholder={key} value={formData.tripInfo[key]} onChange={(e) => handleNestedChange(e, 'tripInfo')} />
                      ))}

                      <h3 style={{ color: "#1c5563" }}>Overview</h3>
                      {Object.keys(formData.overview).map((key) => (
                        <input key={key} type="text" name={key} placeholder={key} value={formData.overview[key]} onChange={(e) => handleNestedChange(e, 'overview')} />
                      ))}

                      <h3 style={{ color: "#1c5563" }}>Itinerary</h3>
                      {Object.keys(formData.itinerary).map((key) => (
                        <input key={key} type="text" name={key} placeholder={key} value={formData.itinerary[key]} onChange={(e) => handleNestedChange(e, 'itinerary')} />
                      ))}

                      <h3 style={{ color: "#1c5563" }}>Cost</h3>
                      {Object.keys(formData.cost).map((key) => (
                        <input key={key} type="text" name={key} placeholder={key} value={formData.cost[key]} onChange={(e) => handleNestedChange(e, 'cost')} />
                      ))}


                      <button type="submit">Update Trip</button>
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

export default EditTrip;
