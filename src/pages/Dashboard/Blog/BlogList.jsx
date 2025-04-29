import React from 'react';
import { Link } from 'react-router-dom';
import TopSection from '../../../components/TopSection/TopSection';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import { useDeleteBlogsMutation, useGetBlogsQuery } from '../../../tools/services/blogApi';
import '../List.scss'
import Preloader from '../../../components/Preloader/Preloader';
import { useTranslation } from 'react-i18next';

const BlogList = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { data: blogs, isLoading } = useGetBlogsQuery();
    const [deleteBlog] = useDeleteBlogsMutation();

    if (isLoading) {
        return <Preloader />;
    }

    console.log(blogs);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id).unwrap();
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
    }

    return (
        <>




            <TopSection title={i18n.language === 'az' ? "Bloq Siyahısı" : "Blog List"} currentPage={i18n.language === 'az' ? "Bloq Siyahısı" : "Blog List"} />




            {/*-----------------------------------------------------Blog List---------------------------------------------*/}

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
                                        <h1>{i18n.language === 'az' ? "Bloq Siyahısı" : "Blog List"}</h1>
                                        <Link to="/dashboard/add-blog">
                                            <button>+{t('dashboard-destinations.addNewBlog')}</button>
                                        </Link>
                                    </div>


                                    <table className="table">
                                        <thead className='head-table'>
                                            <tr>

                                                <th scope="col">{t('dashboard-destinations.blogImage')}</th>

                                                <th scope="col">{t('dashboard-destinations.contentAz')}</th>
                                                <th scope="col">{t('dashboard-destinations.contentEn')}</th>
                                                <th scope="col">{t('dashboard-activity.edit')}</th>
                                                <th scope="col">{t('dashboard-activity.delete')}</th>
                                            </tr>
                                        </thead>

                                        {blogs?.map((blog) => (
                                            <tbody className='body-table'>
                                                <tr key={blog._id}>

                                                    <td><img style={{ width: "70px", height: "70px", borderRadius: "50%" }} src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl ? blog.imageUrl.replace(/\\/g, '/') : "default-image.jpg"}`} alt={blog.titleEn} /></td>

                                                    <td>{blog.contentAz.slice(0, 10)}...</td>
                                                    <td>{blog.contentEn.slice(0, 10)}...</td>
                                                    <td><Link to={`/dashboard/edit-blog/${blog._id}`}>
                                                        <button className='edit-btn'>{t('dashboard-activity.edit')}</button>
                                                    </Link></td>
                                                    <td><button className='delete-btn' onClick={() => handleDelete(blog._id)}>{t('dashboard-activity.delete')}</button></td>
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
    );
};

export default BlogList;
