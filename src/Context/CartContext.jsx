import { createContext, useContext, useState, useEffect } from "react";





const CartContext = createContext();
    export const CartProvider = ({ children }) => {

    // Wishlist
    const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });


  // Basket
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });



  // Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  // Basket
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);


  //  Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isExist = prevWishlist.some((item) => item._id === product._id);
      let updatedWishlist;

      if (isExist) {
        updatedWishlist = prevWishlist.filter((item) => item._id !== product._id);
      } else {
        updatedWishlist = [...prevWishlist, product];
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };


  // Basket
  const addToBasket = (trip) => {
    setBasket((prevBasket) => {
      if (!prevBasket.some((item) => item._id === trip._id)) {
        return [...prevBasket, trip];
      }
      return prevBasket;
    });
  };


  // For basket functionality
  const removeFromBasket = (id) => {
    setBasket(prev => prev.filter(trip => trip._id !== id));
  };
  
 





  return (
    <CartContext.Provider value={{ wishlist, toggleWishlist, basket, addToBasket,removeFromBasket}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);





