import React from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import TopSection from '../../../components/TopSection/TopSection'
import { useDeleteBlogCategoryMutation, useGetBlogCategoriesQuery } from '../../../tools/services/blogCategoryApi'
import Preloader from '../../../components/Preloader/Preloader'
import Swal from 'sweetalert2'
import '../List.scss'
import { useTranslation } from 'react-i18next'



const BlogCategoryList = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { data: categories, isLoading } = useGetBlogCategoriesQuery();
    const [deleteBlogCategory] = useDeleteBlogCategoryMutation();

    if (isLoading) {
        return <Preloader />;
    }

    const handleDelete = async (id) => {
        try {
            await deleteBlogCategory(id).unwrap();
            Swal.fire({
                icon: 'success',
                title: t('dashboardblogCat.success'),
                text: t('dashboardblogCat.deletedSuccess'),
                timer: 2000,
                showConfirmButton: true
            });
        } catch (err) {
            console.error("Silinmə xətası:", err);
            Swal.fire({
                icon: 'error',
                title: t('dashboardblogCat.error'),
                text: t('dashboardblogCat.deleteError'),
                timer: 2000,
                showConfirmButton: true
            });
        }
    };




    return (
        <>
            <TopSection title={t('dashboardblogCat.blogCategoryList')} currentPage={t('dashboardblogCat.blogCategoryList')} />



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
                                        <h1>{t('dashboardblogCat.blogCategoryList')}</h1>
                                        <Link to="/dashboard/add-blog-category">
                                            <button>+ {t('dashboardblogCat.addNewBlogCategory')}</button>
                                        </Link>
                                    </div>


                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>
                                                <th scope="col">{t('dashboardblogCat.id')}</th>

                                                <th scope="col">{t('dashboardblogCat.categoryNameEn')}</th>
                                                <th scope="col">{t('dashboardblogCat.edit')}</th>
                                                <th scope="col">{t('dashboardblogCat.delete')}</th>
                                            </tr>
                                        </thead>

                                        {categories?.map((category) => (
                                            <tbody className='body-table'>
                                                <tr key={category._id}>
                                                    <td scope="row">{category._id}</td>

                                                    <td>{category.nameEn}</td>
                                                    <td><Link to={`/dashboard/edit-blog-category/${category._id}`}>
                                                        <button className='edit-btn'>{t('dashboardblogCat.edit')}</button>
                                                    </Link></td>
                                                    <td><button className='delete-btn' onClick={() => handleDelete(category._id)}>{t('dashboardblogCat.delete')}</button></td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCategoryList