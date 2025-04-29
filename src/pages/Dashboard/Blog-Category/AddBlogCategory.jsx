import React, { useState } from 'react'
import TopSection from '../../../components/TopSection/TopSection'
import Sidebar from '../Sidebar'
import { useAddBlogCategoryMutation } from '../../../tools/services/blogCategoryApi'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import '../Add.scss'
import { useTranslation } from 'react-i18next'


const AddBlogCategory = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const [addBlogCategory] = useAddBlogCategoryMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameAz: '',
    nameEn: '',
    catCount: 0,
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await addBlogCategory(formData).unwrap();
      Swal.fire({
        icon: 'success',
        title: i18n.language === 'az' ? "Uğurlu!":"Success!",
        text: i18n.language === 'az' ? 'Bloq Kateqoriyası uğurla əlavə edildi!':'Blog Category successfully added!',
      });
      navigate('/dashboard/blog-category-list');
    } catch (error) {
      console.error("Əlavə olunmadı:", error);
      Swal.fire({
        icon: 'error',
        title: i18n.language === 'az' ? "Xeta!":"Error!",
        text: i18n.language === 'az' ? "Əlavə etmək mümkün olmadı!":'Could not add!',
      });
    }

  };


  return (
    <>
      <TopSection title={i18n.language === 'az' ? "Bloq Kateqoriya Əlavə Et":"Add Blog Category"} currentPage={i18n.language === 'az' ? "Bloq Kateqoriya Əlavə Et":"Add Blog Category"} />


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
                    <h1>{i18n.language === 'az' ? "Yeni Bloq Kateqoriya Əlavə Et":"Add New Blog Category"}</h1>

                    <form onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label htmlFor="nameAz">{t('dashboardblogCat.categoryNameAz')}:</label>
                        <input type='text' name="nameAz" id="nameAz" onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="nameEn">{t('dashboardblogCat.categoryNameEn')}:</label>
                        <input type='tetx' name="nameEn" id="nameEn" onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="catCount">{i18n.language === 'az' ? "Kateqoriya Sayı":"Category Count"}:</label>
                        <input type='number' name="catCount" id="catCount" onChange={handleChange} />
                      </div>

                      <button type="submit">{i18n.language === 'az' ? "Bloq Kateqoriya Əlavə Et":"Add Blog Category"}</button>
                    </form>

                  </div>
                </div>
              </div>
            </div>





          </div>
        </div>
      </section>
    </>
  )
}

export default AddBlogCategory