import React, { useContext, useEffect } from 'react'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Home from '../pages/Homepage/Home'
import ContactUs from '../pages/ContactUs/ContactUs'
import AboutUs from '../pages/AboutUs/AboutUs'
import FAQ from '../pages/FAQ/FAQ'
import Trip from '../pages/Trip/Trips'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Test from '../pages/Test/Test'
import Activity from '../pages/Activity/Activity'
import Destinations from '../pages/Destinations/Destinations'
import Blog from '../pages/Blog/Blog'
import ScrollToTop from "../components/ScrollToTop";
import GuiderDetails from '../components/Guider/GuiderDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import AddBlog from '../pages/Dashboard/Blog/AddBlog'
import BlogList from '../pages/Dashboard/Blog/BlogList'
import EditBlog from '../pages/Dashboard/Blog/EditBlog'
import FaqList from '../pages/Dashboard/FAQ/FaqList'
import AddFaq from '../pages/Dashboard/FAQ/AddFaq'
import EditFaq from '../pages/Dashboard/FAQ/EditFaq'
import GuiderList from '../pages/Dashboard/Guider/GuiderList'
import AddGuider from '../pages/Dashboard/Guider/AddGuider'
import EditGuider from '../pages/Dashboard/Guider/EditGuider'
import LoginPage from '../pages/Auth/LoginPage'
import BlogCategoryList from '../pages/Dashboard/Blog-Category/BlogCategoryList'
import AddBlogCategory from '../pages/Dashboard/Blog-Category/AddBlogCategory'
import EditBlogCategory from '../pages/Dashboard/Blog-Category/EditBlogCategory'
import ActivityList from '../pages/Dashboard/Activity/ActivityList'
import AddActivity from '../pages/Dashboard/Activity/AddActivity'
import EditActivity from '../pages/Dashboard/Activity/EditActivity'
import DestinationList from '../pages/Dashboard/Destinations/DestinationList'
import AddDestination from '../pages/Dashboard/Destinations/AddDestination'
import EditDestination from '../pages/Dashboard/Destinations/EditDestination'
import BlogDetails from '../pages/BlogDetails/BlogDetails'
import TripList from '../pages/Dashboard/Trips/TripList'
import AddTrip from '../pages/Dashboard/Trips/AddTrip'
import EditTrip from '../pages/Dashboard/Trips/EditTrip'
import TripsDetails from '../pages/TripsDetails/TripsDetails'
import Wishlist from '../pages/WishList/Wishlist'
import Basket from '../pages/Basket/Basket'
import Checkout from '../pages/CheckOut/Checkout'
import Recomended from '../pages/Recomended/Recomended'
import PrivateRoute from '../components/PrivateRoute'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { ThemeContext } from '../Context/ThemeContext'




const AppRouter = () => {
  
  const {theme}=useContext(ThemeContext)

  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop  />
        <div className={theme}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/contact-us' element={<ContactUs />}></Route>
          <Route path='/about-us' element={<AboutUs />}></Route>
          <Route path='/faq' element={<FAQ />}></Route>
          <Route path='/destinations' element={<Destinations />}></Route>
          <Route path='/trips' element={<Trip />}></Route>
          <Route path='/test' element={<Test />}></Route>
          <Route path='/activity' element={<Activity />}></Route>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/trips/wishlist' element={<Wishlist />}></Route>
          <Route path='/trips/basket' element={<Basket />}></Route>
          <Route path='/trips/checkout' element={<Checkout />}></Route>
          <Route path='/trips/recommended' element={<Recomended />}></Route>
          <Route path='*' element={<NotFoundPage />} />



          {/*-------------------------------Blog-------------------------*/}
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/dashboard/add-blog' element={<AddBlog />}></Route>
          <Route path='/dashboard/blog-list' element={<BlogList />}></Route>
          <Route path='/dashboard/edit-blog/:id' element={<EditBlog />}></Route>
          {/*-------------------------------Blog-------------------------*/}


          {/*--------------------------------BlogCategory-----------------------------*/}
          <Route path="/dashboard/blog-category-list" element={<BlogCategoryList />} />
          <Route path="/dashboard/add-blog-category" element={<AddBlogCategory />} />
          <Route path="/dashboard/edit-blog-category/:id" element={<EditBlogCategory />} />
          {/*--------------------------------BlogCategory-----------------------------*/}


          {/*-----------------------------Blog Details----------------*/}
          <Route path='/blog/:id' element={<BlogDetails />}></Route>
          {/*-----------------------------Blog Details----------------*/}


          {/*--------------------------------FAQ-----------------------------*/}
          <Route path="/dashboard/faq-list" element={<FaqList />} />
          <Route path="/dashboard/add-faq" element={<AddFaq />} />
          <Route path="/dashboard/edit-faq/:id" element={<EditFaq />} />
          {/*--------------------------------FAQ-----------------------------*/}


          {/*--------------------------------Guider-----------------------------*/}
          <Route path="/dashboard/guider-list" element={<GuiderList />} />
          <Route path="/dashboard/add-guider" element={<AddGuider />} />
          <Route path="/dashboard/edit-guider/:id" element={<EditGuider />} />
          {/*--------------------------------Guider-----------------------------*/}


          {/*-----------------------------Guider Details----------------*/}
          <Route path='/guider/:id' element={<GuiderDetails />}></Route>
          {/*-----------------------------Guider Details----------------*/}


          {/*--------------------------------Activity-----------------------------*/}
          <Route path="/dashboard/activity-list" element={<ActivityList />} />
          <Route path="/dashboard/add-activity" element={<AddActivity />} />
          <Route path="/dashboard/edit-activity/:id" element={<EditActivity />} />
          {/*--------------------------------Activity-----------------------------*/}


          {/*--------------------------------Destinations-----------------------------*/}
          <Route path="/dashboard/destination-list" element={<DestinationList />} />
          <Route path="/dashboard/add-destination" element={<AddDestination />} />
          <Route path="/dashboard/edit-destination/:id" element={<EditDestination />} />
          {/*--------------------------------Destinations-----------------------------*/}


          {/* ---------------------------------Trips-----------------------------------*/}
          <Route path="/dashboard/trip-list" element={<TripList />} />
          <Route path="/dashboard/add-trip" element={<AddTrip />} />
          <Route path="/dashboard/edit-trip/:id" element={<EditTrip />} />
          {/* ---------------------------------Trips----------------------------------*/}

          {/*-----------------------------Trips Details----------------*/}
          <Route path='/trip/:slug' element={<TripsDetails />}></Route>
          {/*-----------------------------Trips Details----------------*/}
        
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default AppRouter