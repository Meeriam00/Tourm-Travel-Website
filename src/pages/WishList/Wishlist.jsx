import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';
import TopSection from '../../components/TopSection/TopSection';
import '../WishList/Wishlist.scss'
import slugify from 'slugify';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdPeople } from 'react-icons/io';
import { GoClock } from 'react-icons/go';
import { MdDirectionsBike } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
const Wishlist = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const { wishlist, toggleWishlist } = useCart();
    const { addToBasket } = useCart();


    const handleAddToBasket = (trip) => {
        try {
            addToBasket(trip);
            Swal.fire({
                title: i18n.language === 'az' ? "Uğurla əlavə olundu!" : "Added successfully!",
                text: i18n.language === 'az'
                    ? `${trip.titleAz} səbətə əlavə olundu.`
                    : `${trip.titleEn} has been added to cart.`,
                icon: "success",
                confirmButtonText: "OK",
                timer: 3000,
                timerProgressBar: true,
            });
            navigate('/trips/basket');
        } catch (error) {
            Swal.fire({
                title: i18n.language === 'az' ? "Əlavə olunmadı!" : "Could not be added!",
                text: i18n.language === 'az'
                    ? "Bu səyahət səbətə əlavə oluna bilmədi."
                    : "This trip could not be added to the cart.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>


            {/*----------------------------------------------------TopSection Wishlist------------------------------------------*/}
            <TopSection title={i18n.language === 'az' ? "Səyahət İstək Siyahısı" : "Trip Wishlist"} currentPage={i18n.language === 'az' ? "Səyahət İstək Siyahısı" : "Trip Wishlist"} />









            {/*----------------------------------------------------WishList Conatiner-------------------------------------------*/}
            <section className="wishlist-container">
                {wishlist.length === 0 ?

                    <div className='no-item'>
                        <h1>{i18n.language === 'az' ? "Ohhh... İstək Siyahınız Boşdur" : "Ohhh... Your Wishlist is Empty"}</h1>
                        <p>{i18n.language === 'az' ? "Amma belə olmamalıdır." : "But it doesn't have to be."}</p>
                        <button onClick={() => navigate('/trips')}>{i18n.language === 'az' ? "Səyahətləri araşdırın" : "Explore trips"}</button>
                    </div>

                    : (
                        <div className="wishlist-items-container">
                            <div className="container">
                                <div className="row">

                                    <div className="wishlist-title">
                                        <h2>{i18n.language === 'az' ? "İstək Siyahım" : "My Wishlist"}</h2>
                                        <div className="linear"></div>
                                    </div>




                                    {wishlist.map((trip) => (
                                        <div className="col-12 col-md-12 col-sm-12 col-xs-12" key={trip._id}>
                                            <div className="wishlist-item">

                                                <div className="item-img">
                                                    <img src={`https://tourm-travel-backend-2.onrender.com/${trip.images[0].replace(/\\/g, '/')}`} alt={trip.titleEn} />

                                                    <span
                                                        style={{
                                                            opacity: trip.tripInfo.discount > 0 ? 1 : 0,
                                                            pointerEvents: trip.tripInfo.discount > 0 ? 'auto' : 'none'
                                                        }}
                                                    >
                                                        {trip.tripInfo.discount}% Off
                                                    </span>

                                                </div>


                                                <div className="holiday-body">
                                                    <h3>{i18n.language === 'az' ? trip.titleAz : trip.titleEn} <span><FaHeart className='icon' onClick={() => toggleWishlist(trip)} style={{ color: '#1ca8cb', cursor: 'pointer' }} /></span></h3>
                                                    <p>{i18n.language === 'az' ? trip.overview.descriptionAz.slice(0, 400) : trip.overview.descriptionEn.slice(0, 400)}...</p>
                                                    <div className="buttons">
                                                        <button className='book-now'
                                                            onClick={() => {
                                                                const user = JSON.parse(localStorage.getItem("loggedInUser"));
                                                                if (!user) {
                                                                    Swal.fire({
                                                                        icon: "warning",
                                                                        title: i18n.language === 'az' ? "Zəhmət olmasa, daxil olun" : "Please Login",
                                                                        text: i18n.language === 'az'
                                                                            ? "Səbətə əlavə etmək üçün daxil olmalısınız!"
                                                                            : "You need to log in to add to basket!",
                                                                        confirmButtonText: "OK",
                                                                        confirmButtonColor: "#1ca8cb",
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            navigate("/login");
                                                                        }
                                                                    });
                                                                    return;
                                                                }
                                                                handleAddToBasket(trip);
                                                            }}
                                                        >
                                                            {i18n.language === 'az' ? "Rezerv Edin" : "Book Now"}
                                                        </button>
                                                        <button className='details' onClick={() => navigate(`/trip/${slugify(trip.titleEn, { lower: true })}`)}>{t('home.view-details')}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}




                                </div>
                            </div>
                        </div>
                    )}

            </section>
        </>
    );
};

export default Wishlist;
