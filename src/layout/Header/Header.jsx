import React, { useContext, useEffect, useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import Select from '../../components/Select';
import { FaAngleDown, FaUserCircle } from "react-icons/fa";
import './Header.scss'
import logo from '../../assets/Images/logo.png'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography, Carousel, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { ThemeContext } from '../../Context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';


const Header = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [dotPosition, setDotPosition] = useState('right');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem("basket");
    localStorage.removeItem("wishlist");
    setLoggedInUser(null);
    Swal.fire({
      icon: 'success',
      title: i18n.language === 'az' ? "Çıxdınız!" : 'Logged out!',
      text: i18n.language === 'az' ? "Siz uğurla çıxış etdiniz." : 'You have logged out successfully.',
      confirmButtonText: i18n.language === 'az' ? 'Oldu' : 'OK',
    }).then(() => {
      navigate('/login');
    });
  };
   


  // Theme Change
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme=()=>{
    setTheme(prevTheme=>(prevTheme==='light' ? 'dark':'light'));
  }
  





  const items = [
    {
      key: '1',
      label: <span className="menu-item"><Link to={'/trips'} className="nav-link" aria-current="page" href="#">{t('header.trips')}</Link></span>,
      style: { fontSize: '16px', padding: '10px 15px' }
    },
    {
      key: '2',
      label: <span className="menu-item"><Link to={'/login'} className="nav-link" aria-current="page" href="#">{t('header.login')}</Link></span>,
      style: { fontSize: '16px', padding: '10px 15px' }
    },
    {
      key: '3',
      label: <span className="menu-item"><Link to={'/trips/wishlist'} className="nav-link" aria-current="page" href="#">{t('header.wishlist')}</Link></span>,
      style: { fontSize: '16px', padding: '10px 15px' }
    },
    {
      key: '4',
      label: <span className="menu-item"><Link to={'/trips/basket'} className="nav-link" aria-current="page" href="#">{t('header.basket')}</Link></span>,
      style: { fontSize: '16px', padding: '10px 15px' }
    },
  ];




  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);





  return (
    <>

      <header>




        {/* --------------------------------------------------TOP OF THE PAGE------------------------------------------------ */}
        <section className="top">
          <div className="location">
            <p><IoLocationOutline className='location' /> {t('header.title1')}</p>
            <p style={{ color: 'gray' }}>|</p>
            <p><MdOutlineAccessTime className='time' /> {t('header.title')}</p>
          </div>


          <div className="services">
          
          <button id='mode' onClick={toggleTheme}>
            {theme=== 'light' ? "Dark" : "Light"}
          </button>

            <Select />
            <p id='faql' style={{ color: 'gray' }}>|</p>
            <p id='faq'><Link to={'/faq'} className="nav-link" aria-current="page" href="#">{t('header.faq')}</Link></p>
            <p style={{ color: 'gray' }}>|</p>
            <p ><Link to={'/contact-us'} className="nav-link" href="#">{t('header.support')}</Link></p>
            <p style={{ color: 'gray' }}>|</p>
            <p className='login'  style={{ marginRight:'10px' }}>
            {user ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      label: <span onClick={handleLogout}>{t('header.logout')}</span>,
                    },
                  ],
                }}
                placement="bottomRight"
                arrow
              >
                <Typography.Link style={{ cursor: 'pointer', fontWeight: 500}}>
                <span><FaUserCircle className='react-icon'/> {user.username} <DownOutlined className='react-icon'/></span>
                </Typography.Link>
              </Dropdown>
            ) : (
              <Link to="/login" className="nav-link">{t('header.loginheader')}</Link>
            )}
            </p>
          </div>

        </section>








        {/* --------------------------------------------------------------NAVBAR-------------------------------------------------------- */}
        {/* <nav className="navbar navbar-expand-lg p-0"> */}
         <nav className={`navbar ${isFixed ? "fixed" : ""} navbar navbar-expand-lg p-0 overflow-hidden`}>
          <div className="container-fluid p-0">
            <img src={logo} alt="" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                <li className="nav-item mx-3">
                  <Link to={'/'} className="nav-link" aria-current="page" href="#">{t('header.home')}</Link>
                  <div className="hover"></div>
                </li>

                <li className="nav-item mx-3">
                  <Link to={'/about-us'} className="nav-link" aria-current="page" href="#">{t('header.about')}</Link>
                  <div className="hover"></div>
                </li>

                <li className="nav-item mx-3">
                  <Link to={'/destinations'} className="nav-link" aria-current="page" href="#">{t('header.destination')}</Link>
                  <div className="hover"></div>
                </li>

                <li className="nav-item mx-3">
                  <a className="nav-link" aria-current="page" href="#">
                    <Dropdown menu={{ items }}>
                      <Typography.Link>
                        <Space>
                          {t('header.trip')} <DownOutlined className="icon-size" />
                        </Space>
                      </Typography.Link>
                    </Dropdown>
                  </a>
                  <div className="hover"></div>
                </li>


                <li className="nav-item mx-3">
                  <Link to={'/activity'} className="nav-link" aria-current="page" href="#">{t('header.activity')}</Link>
                  <div className="hover"></div>
                </li>



                <li className="nav-item mx-3">
                  <Link to={'/blog'} className="nav-link" aria-current="page" href="#">{t('header.blog')}</Link>
                  <div className="hover"></div>
                </li>



                <li className="nav-item mx-3">
                  <Link to={'/faq'} className="nav-link" aria-current="page" href="#">{t('header.faq')}</Link>
                  <div className="hover"></div>
                </li>



                <li className="nav-item mx-3">
                  <Link to={'/contact-us'} className="nav-link" href="#">{t('header.contact-us')}</Link>
                  <div className="hover"></div>
                </li>

                {user?.role === "admin" && (
                  <li className="nav-item mx-3">
                    <Link to={'/dashboard'} className="nav-link">{t('header.dashboard')}</Link>
                    <div className="hover"></div>
                  </li>
                )}




              </ul>


              <div className="d-flex" role="search">
                <button className='request' onClick={() => navigate('/contact-us')} type="submit">{t('header.button')}<i className="fa-solid fa-arrow-right"></i></button>
              </div>


            </div>
          </div>
        </nav>















      </header>



    </>
  )
}

export default Header