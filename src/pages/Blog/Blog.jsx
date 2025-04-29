import React, { useState } from "react";
import TopSection from "../../components/TopSection/TopSection";
import "../Blog/Blog.scss";
import { IoMdPerson } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { useGetBlogCategoriesQuery } from "../../tools/services/blogCategoryApi";
import { useGetBlogsQuery } from "../../tools/services/blogApi";
import { useNavigate } from "react-router";
import Preloader from "../../components/Preloader/Preloader";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const navigate = useNavigate();
   const { t } = useTranslation();
    const { i18n } = useTranslation();
  
  const { data: blogCategory, isLoading } = useGetBlogCategoriesQuery();
  const { data: blogs, isLoadingBlog } = useGetBlogsQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResult, setSearchResult] = useState(null);


  if (isLoading || isLoadingBlog) {
    return <Preloader />; 
  }

  const filteredBlogs = selectedCategoryId
    ? blogs.filter((blog) =>
        blog.categories.some((category) => category._id === selectedCategoryId)
      )
    : blogs;


  function getWords(text) {
    return text.split(" ").slice(0, 50).join(" ");
  }



  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    const foundBlogs = blogs.filter((blog) =>
      blog.titleEn.toLowerCase().includes(lowerCaseTerm) ||
      blog.contentEn.toLowerCase().includes(lowerCaseTerm)
    );

    setSearchResult(foundBlogs.length > 0 ? foundBlogs : "not-found");
  };


  return (
    <>
      <TopSection title={t('header.blog')}  currentPage={t('header.blog')}  />

      <section className="blogs">
        <div className="container">
          <div className="row">




            <div className="col-12 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              {searchResult === "not-found" ? (
                 <div className='no-item'>
                 <h1>{i18n.language === 'az' ? "Ohhh...Belə bloq tapılmadı." : "Ohhh...No such blog found."}</h1>
                 <p>{i18n.language === 'az' ? "Hal-hazırda səhifəmizdə belə bir bloq yoxdur." : "There is currently no such blog on our page."}</p>
                 </div> 
              ) : searchResult ? (
                searchResult.map((blog) => (
                  <div key={blog._id} className="news">
                    <div className="blog-img">
                      <img src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl.replace(/\\/g, '/')}`} alt={blog.titleEn} />
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
                      <p id="description">
                        {getWords(i18n.language === 'az' ? blog.contentAz : blog.contentEn)}......
                      </p>
                    </div>

                    <button onClick={() => navigate(`/blog/${blog._id}`)}>{t('home.read_more')}</button>
                  </div>
                ))
              ) : (
                filteredBlogs?.map((blog) => (
                  <div key={blog._id} className="news">
                    <div className="blog-img">
                      <img src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl.replace(/\\/g, '/')}`} alt={blog.titleEn} />
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
                      <p id="description">{getWords(i18n.language === 'az' ? blog.contentAz : blog.contentEn)}......</p>
                    </div>

                    <button onClick={() => navigate(`/blog/${blog._id}`)}>{t('home.read_more')}</button>
                  </div>
                ))
              )}
            </div>



            <div className="col-12 col-lg-4 col-md-12 col-sm-12 col-xs-12">
              {/* Search */}
              <div className="search">
                <h3>{i18n.language === 'az' ? "Axtar" : "Search"}</h3>
                <div className="linear"></div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder={i18n.language === 'az' ? "Səyahət axtarın..." : "Search for travel..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button onClick={handleSearch}>{i18n.language === 'az' ? "Axtar" : "Search"}</button>
                </form>
              </div>





              {/* Categories */}
              <div className="categories">
                <h3>Categories</h3>
                <div className="linear"></div>
                <ul>
                  {blogCategory.map((category) => (
                    <li key={category._id} onClick={() => setSelectedCategoryId(category._id)}>
                      {i18n.language === 'az' ? category.nameAz : category.nameEn}<span>{category.catCount}</span>
                    </li>
                  ))}
                  <li onClick={() => setSelectedCategoryId(null)}>
                  {t('home.all')} <span>{blogs?.length}</span>
                  </li>
                </ul>
              </div>




              {/* Recent Posts */}
              <div className="recent-posts">
                <h3>Recent Posts</h3>
                <div className="linear"></div>
                <div className="posts">
                  {blogs?.slice(-3).map((blog) => (
                    <div key={blog._id} className="post-item">
                      <img src={`https://tourm-travel-backend-2.onrender.com/${blog.imageUrl.replace(/\\/g, '/')}`} alt={blog.titleEn} />
                      <div className="post-info">
                        <h3 onClick={() => navigate(`/blog/${blog._id}`)}>
                          {i18n.language === 'az' ? blog.titleAz.slice(0, 25) : blog.titleEn.slice(0, 25)}...
                        </h3>
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

export default Blog;

