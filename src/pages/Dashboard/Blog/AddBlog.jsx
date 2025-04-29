import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import { useAddBlogsMutation } from '../../../tools/services/blogApi';
import Swal from 'sweetalert2';
import '../Add.scss'
import { useTranslation } from 'react-i18next';



const AddBlog = () => {
  const {t}=useTranslation();
  const [addBlog] = useAddBlogsMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    titleAz: '',
    titleEn: '',
    contentAz: '',
    contentEn: '',
    createdAt: new Date().toISOString(),
    imageUrl: null,
    author: '',
    categories: '',
  });


  const [preview, setPreview] = useState(null); 



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({
            ...formData,
            imageUrl: file,
        });
        setPreview(URL.createObjectURL(file)); 
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();


    data.append('id', formData.id);
    data.append('titleAz', formData.titleAz);
    data.append('titleEn', formData.titleEn);
    data.append('contentAz', formData.contentAz);
    data.append('contentEn', formData.contentEn);
    data.append('author', formData.author);
    data.append('categories', formData.categories);

    if (formData.imageUrl) {
      data.append('imageUrl', formData.imageUrl);
    }


    try {
      await addBlog(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: t('dashboard-destinations.success'),
        text: t('dashboard-destinations.blogAddedSuccessfully'),
      });
      navigate('/dashboard/blog-list');
    } catch (error) {
      console.error("Əlavə olunmadı:", error);
      Swal.fire({
        icon: 'error',
        title: t('dashboard-destinations.error'),
        text: t('dashboard-destinations.blogNotAdded'),
      });
    }
  };










  return (
    <>
      <TopSection title={t('dashboard-destinations.addBlog')} currentPage={t('dashboard-destinations.addBlog')} />


      <section style={{ width: "100%", height: "auto", padding: "5% 20px" }} className="add-container">
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
                    <h1>{t('dashboard-destinations.addNewBlog')}</h1>

                    <form onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label htmlFor="id">{t('dashboard-destinations.blogID')}:</label>
                        <input name="id" id="id" value={formData.id} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleAz">{t('dashboard-destinations.titleAz')}:</label>
                        <input name="titleAz" id="titleAz" value={formData.titleAz} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleEn">{t('dashboard-destinations.titleEn')}:</label>
                        <input name="titleEn" id="titleEn" value={formData.titleEn} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contentAz">{t('dashboard-destinations.contentAz')}:</label>
                        <textarea required name="contentAz" id="contentAz" value={formData.contentAz} onChange={handleChange}></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contentEn">{t('dashboard-destinations.contentEn')}:</label>
                        <textarea required name="contentEn" id="contentEn" value={formData.contentEn} onChange={handleChange}></textarea>
                      </div>


                      <div className="form-group">
                        <label htmlFor="imageUrl">{t('dashboard-destinations.blogImage')}:</label>
                        <input className='form-control' type='file' name="imageUrl" id="imageUrl" onChange={handleFileChange} required />
                        {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', width: '200px', height: '200px', borderRadius: '10px' }} />}
                      </div>

                      <div className="form-group">
                        <label htmlFor="author">{t('dashboard-destinations.author')}:</label>
                        <input type='text' name="author" id="author" value={formData.author} onChange={handleChange} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="categories">{t('dashboard-destinations.categories')}:</label>
                        <input name="categories" id="categories" value={formData.categories} onChange={handleChange} required />
                      </div>

                      <button type="submit">{t('dashboard-destinations.addNewBlog')}</button>
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

export default AddBlog;
