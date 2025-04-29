import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useEditBlogsMutation, useGetBlogsQuery } from '../../../tools/services/BlogApi';
import { useTranslation } from 'react-i18next';

const EditBlog = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogs } = useGetBlogsQuery();
  const [editBlog] = useEditBlogsMutation();

  const [formData, setFormData] = useState({
    titleAz: '',
    titleEn: '',
    contentAz: '',
    contentEn: '',
    imageUrl: null,
    author: '',
    categories: '',
  });



  useEffect(() => {
    if (blogs) {
      const blog = blogs.find(blog => blog._id === id);
      if (blog) {
        setFormData({
          titleAz: blog.titleAz,
          titleEn: blog.titleEn,
          contentAz: blog.contentAz,
          contentEn: blog.contentEn,
          imageUrl: null,
          author: blog.author,
          categories: blog.categories.map(cat => cat._id).join(", "),
        });
      }

    }
  }, [blogs, id]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imageUrl: e.target.files[0],
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titleAz', formData.titleAz);
    data.append('titleEn', formData.titleEn);
    data.append('contentAz', formData.contentAz);
    data.append('contentEn', formData.contentEn);
    data.append('author', formData.author);
    data.append('categories', JSON.stringify(formData.categories.split(',').map(cat => cat.trim())));


    if (formData.imageUrl) {
      data.append('imageUrl', formData.imageUrl);
    }

    try {
      await editBlog({ id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: t('dashboard-activity.successTitle'),
        text: i18n.language === 'az' ? 'Bloq uğurla yeniləndi.' :'Blog successfully updated.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard/blog-list');
      });
    } catch (err) {
      console.error("Update xətası:", err);
      Swal.fire({
        icon: 'success',
        title: t('dashboard-activity.successTitle'),
        text: i18n.language === 'az' ? 'Bloq uğurla yeniləndi.' :'Blog successfully updated.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard/blog-list');
      });
    }
  };









  return (
    <>
      <TopSection title={i18n.language === 'az' ? "Bloqu Redaktə Edin" :"Edit Blog"} currentPage={i18n.language === 'az' ? "Bloqu Redaktə Edin" :"Edit Blog"} />


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
                    <h1>{i18n.language === 'az' ? "Bloqu Redaktə Edin" :"Edit Blog"}</h1>
                    <form onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label htmlFor="imageUrl">{t('dashboard-destinations.blogImage')}:</label>
                        <input className='form-control' type='file' name="imageUrl" id="imageUrl" onChange={handleFileChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleAz">{t('dashboard-destinations.titleAz')}:</label>
                        <input type='text' name="titleAz" id="titleAz" value={formData.titleAz} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="titleEn">{t('dashboard-destinations.titleEn')}:</label>
                        <input type='text' name="titleEn" id="titleEn" value={formData.titleEn} onChange={handleChange} />
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
                        <label htmlFor="author">{t('dashboard-destinations.author')}:</label>
                        <input type='text' name="author" id="author" value={formData.author} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="categories">{t('dashboard-destinations.categories')}:</label>
                        <input
                          type="text"
                          value={formData.categories}
                          onChange={(e) =>
                            setFormData({ ...formData, categories: e.target.value })
                          }
                        />
                      </div>

                      <button type="submit">{i18n.language === 'az' ? "Bloqu Redaktə Edin" :"Edit Blog"}</button>

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

export default EditBlog;
