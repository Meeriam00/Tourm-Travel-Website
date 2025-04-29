import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TopSection from "../../../components/TopSection/TopSection";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router";
import { useEditBlogCategoryMutation, useGetBlogCategoriesQuery } from "../../../tools/services/blogCategoryApi";
import '../Edit.scss'
import { useTranslation } from "react-i18next";



const EditBlogCategory = () => {
  const {t}=useTranslation();
  const {i18n}=useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categories } = useGetBlogCategoriesQuery();
  const [editBlogCategory] = useEditBlogCategoryMutation();

  const category = categories?.find((c) => c._id === id);




  const [nameAz, setNameAz] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [catCount, setCatCount] = useState(0);




  useEffect(() => {
    if (category) {
      setNameAz(category.nameAz || "");
      setNameEn(category.nameEn || "");
      setCatCount(category.catCount || 0);
    }
  }, [category]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "catCount") {
      setCatCount(Number(value) || 0);
    } else if (name === "nameAz") {
      setNameAz(value);
    } else if (name === "nameEn") {
      setNameEn(value);
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editBlogCategory({ id, updatedCategory: { nameAz, nameEn, catCount } }).unwrap();
      Swal.fire({
        icon: "success",
        title: i18n.language === 'az' ? "Uğurlu!":"Success!",
        text: i18n.language === 'az' ? "Bloq Kateqoriyası uğurla yeniləndi!":"Blog Category updated successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/dashboard/blog-category-list");
      });
    } catch (error) {
      console.error("Failed to update blog category:", error);
      Swal.fire({
        icon: "error",
        title: i18n.language === 'az' ? "Xəta!":"Error!",
        text:  i18n.language === 'az' ? "Bloq kateqoriyasını yeniləmək alınmadı!":"Failed to update blog category!",
        confirmButtonColor: "#d33",
      });
    }
  };






  
  return (
    <>
      <TopSection title={i18n.language === 'az' ? "Bloq Kateqoriya Redakte Et":"Edit Blog Category"} currentPage={i18n.language === 'az' ? "Bloq Kateqoriya Redakte Et":"Edit Blog Category"} />

      <section className="edit-container" style={{ width: "100%", height: "auto", padding: "5% 20px" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-lg-3 col-md-3">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-9 col-md-9">
              <div className="right-part-main">
                <div className="right-part-body">
                  <div className="edit-part">
                    <h1>{i18n.language === 'az' ? "Bloq Kateqoriya Redakte Et":"Edit Blog Category"}</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="nameAz">{t('dashboardblogCat.categoryNameAz')}:</label>
                        <input type="text" name="nameAz" id="nameAz" value={nameAz} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nameEn">{t('dashboardblogCat.categoryNameEn')}:</label>
                        <input type="text" name="nameEn" id="nameEn" value={nameEn} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="catCount">{i18n.language === 'az' ? "Kateqoriya Sayı":"Category Count"}:</label>
                        <input type="number" name="catCount" id="catCount" value={catCount} onChange={handleChange} required />
                      </div>
                      <button type="submit">{i18n.language === 'az' ? "Bloq Kateqoriya Redakte Et":"Edit Blog Category"}</button>
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

export default EditBlogCategory;
