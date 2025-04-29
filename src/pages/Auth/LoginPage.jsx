import React, { useEffect, useState } from 'react';
import TopSection from '../../components/TopSection/TopSection';
import '../Auth/LoginPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  useEffect(() => {
    Aos.init({ duration: 1000, offset: 130, easing: 'ease-in-out', once: true });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();




  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, []);




  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem("basket");
    localStorage.removeItem("wishlist");
    setIsLoggedIn(false);
    setLoggedInUser(null);

    Swal.fire({
      icon: 'success',
      title: t('loginpage.log_out'),
      text: t('loginpage.logged_out'),
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignUp) {
      if (users.some((user) => user.email === email)) {
        Swal.fire({ icon: 'error', title: t('loginpage.email_in_use') });
        return;
      }
      const role = (email === "meryemabdullayeva389@gmail.com" || email === "elmanalakbarzade@gmail.com") ? "admin" : "user";
      const fullName = `${firstName} ${lastName}`;
      const newUser = { email, password, username: fullName, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      Swal.fire({ icon: 'success', title: t('loginpage.account_created')  }).then(() => {
        setIsSignUp(false);
        setFirstName('');
        setLastName('');
      });
    }

    else {
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setIsLoggedIn(true);
        setLoggedInUser(user);
        Swal.fire({ icon: 'success', title: t('loginpage.login_success') }).then(() => {
          if (user.role === "admin") {
            navigate('/');
          } else {
            navigate('/');
          }
        });
      } else {
        Swal.fire({ icon: 'error', title: t('loginpage.incorrect_email_password') });
      }
    }
  };






  return (
    <>
      <TopSection title={isLoggedIn ? i18n.language === 'az'
                      ? `Xoş gəlmisiniz, ${loggedInUser?.username}!`
                      : `Welcome, ${loggedInUser?.username}!` : isSignUp ? t('loginpage.signup') : t('loginpage.login')} currentPage={isSignUp ? t('loginpage.signup') : t('loginpage.login')} />

      <section className="login-container">
        <div data-aos="flip-left" className="login-box">
          {isLoggedIn ? (
            <>
              {loggedInUser?.role === "admin" && (
                <div className='welcome-part'>
                  <p>
                    <span>{i18n.language === 'az'
                      ? `Xoş gəlmisiniz, ${loggedInUser?.username}!`
                      : `Welcome, ${loggedInUser?.username}!`}</span> 
                      {t('loginpage.welcome_admin')}
                  </p>
                  <button><Link to="/dashboard">{t('loginpage.go_dashboard')}</Link></button>
                </div>
              )}

              {/* User üçün hissə */}
              {loggedInUser?.role === "user" && (
                <div className="welcome-part">
                  <p>
                  <span>{i18n.language === 'az'
                      ? `Xoş gəlmisiniz, ${loggedInUser?.username}!`
                      : `Welcome, ${loggedInUser?.username}!`}</span> 
                      {t('loginpage.welcome_user')}
                  </p>
                  <button><Link to="/trips">{t('loginpage.explore_trips')}</Link></button>
                </div>
              )}
              <button onClick={handleLogout}>{t('loginpage.log_out')}</button>
            </>
          ) : (
            <>
              <h2>{isSignUp ? t('loginpage.create_account') : t('loginpage.login')}</h2>

              {isSignUp && (
                <>
                  <div className="input-group">
                    <label htmlFor="firstName">{t('loginpage.first_name')}<span>*</span></label>
                    <input type="text" id="firstName" value={firstName} placeholder={t('loginpage.first_name')} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>

                  <div className="input-group">
                    <label htmlFor="lastName">{t('loginpage.last_name')}<span>*</span></label>
                    <input type="text" id="lastName" value={lastName} placeholder={t('loginpage.last_name')} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </>
              )}

              <div className="input-group">
                <label htmlFor="email">{t('loginpage.email')}<span>*</span></label>
                <input type="text" id="email" value={email} placeholder={t('loginpage.email')} onChange={(e) => setEmail(e.target.value)} required />
              </div>



              <div className="input-group">
                <label htmlFor="password">{t('loginpage.password')}<span>*</span></label>
                <input type="password" id="password" value={password} placeholder={t('loginpage.password')} onChange={(e) => setPassword(e.target.value)} required />
              </div>




              <button onClick={handleSubmit}>{isSignUp ?  t('loginpage.create_account') : t('loginpage.login')}</button>
              <div className="link">
                <p>
                  {isSignUp ? (
                    <span>{t('loginpage.already_have_account')} <Link onClick={() => setIsSignUp(false)}>{t('loginpage.login')}</Link></span>
                  ) : (
                    <span>{t('loginpage.dont_have_account')} <Link onClick={() => setIsSignUp(true)}>{t('loginpage.signup')}</Link></span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LoginPage;
