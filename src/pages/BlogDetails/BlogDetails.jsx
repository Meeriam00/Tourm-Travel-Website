import React from "react";
import TopSection from "../../components/TopSection/TopSection";
import "../Blog/Blog.scss";
import { IoMdPerson } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { useGetBlogCategoriesQuery } from "../../tools/services/blogCategoryApi";
import { useGetBlogsQuery } from "../../tools/services/blogApi";
import { useNavigate, useParams } from "react-router";
import Preloader from "../../components/Preloader/Preloader";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const navigate=useNavigate();
  const { id } = useParams();  
   const { t } = useTranslation();
      const { i18n } = useTranslation();
  const { data: blogs, isLoadingBlog } = useGetBlogsQuery();
  const { data: blogCategory, isLoading } = useGetBlogCategoriesQuery();

  if (isLoading || isLoadingBlog) {
    return <Preloader />; 
  }


 
  const blog = blogs?.find((b) => b._id.toString() === id);  

  if (!blog) return <p>Blog tapılmadı!</p>;

  

  return (
    <>





      {/*-----------------------------------------------------------------TopOfBlog-----------------------------------------------------*/}
      <TopSection title={i18n.language === 'az' ? "Bloq Haqqında Ətraflı" : "Blog Details"} currentPage={i18n.language === 'az' ? "Bloq Haqqında Ətraflı" : "Blog Details"} />










      {/*---------------------------------------------------------------News and Category--------------------------------------------*/}
      <section className="blogs">
        <div className="container">
          <div className="row">



            <div className="col-12 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div key={blog._id} className="news">
                <div className="blog-img">
                  <img
                    src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl.replace(/\\/g, '/')}`}
                    alt={blog.titleEn}
                  />
                </div>

                <div className="blog-body">
                  <div className="post-attributes">
                    <p>
                      <IoMdPerson className="blog-icon" />
                      {blog.author}
                    </p>
                    <p>
                      <MdCalendarToday className="blog-icon" />
                      {blog.createdAt.split("T")[0]}
                    </p>

                    <p>
                      <HiMiniAdjustmentsHorizontal className="blog-icon" />
                      {i18n.language === 'az' ? blog.categories[0].nameAz : blog.categories[0].nameEn}
                    </p>
                  </div>

                  <h3>{i18n.language === 'az' ? blog.titleAz : blog.titleEn}</h3>
                  <p id="description">{i18n.language === 'az' ? blog.contentAz : blog.contentEn}<br /></p>
                </div>
              </div>
            </div>






            <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="search">
                <h3>Search</h3>
                <div className="linear"></div>
                <form>
                  <label htmlFor="text"></label>
                  <input type="text" placeholder="Search for travel..." />
                  <button>Search</button>
                </form>
              </div>





              <div className="categories">
                <h3>Categories</h3>
                <div className="linear"></div>
                <ul>
                  {blogCategory.map((category) => (
                    <li key={category._id}>
                      {category.nameEn} <span>{category.catCount}</span>
                    </li>
                  ))}
                </ul>
              </div>




              <div className="recent-posts">
                <h3>Recent Posts</h3>
                <div className="linear"></div>
                <div className="posts">
                  {blogs?.slice(-3).map((blog) => (
                    <div key={blog._id} className="post-item">
                      <img
                        src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl.replace(/\\/g, '/')}`}
                        alt={blog.titleEn}
                      />
                      <div className="post-info">
                        <h3 onClick={() => navigate(`/blog/${blog._id}`)}>{blog.titleEn.slice(0, 25)}...</h3>
                        <p>
                          <MdCalendarToday className="blog-icon" />
                          {blog.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>







            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;


