import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import './CartPopover.scss'

export default function CartPopover({ handleClose, favorite, allColors, allCategories }) {
  const [cartData, setCartData] = useState([1]);


  return (
    <div className='cart'>
      <div className='cart-content'>
        {!cartData.length ? (
          <div className='cart-title'>Your cart is empty!</div>
        ) : (
          <div className='cart-items'>
            {favorite.map(item => (
              <CartItem
                id={item.id}
                category={allCategories.find(category => category.id === item.categoryId)}
                colorObj={allColors.find(color => color.id === item.colorId)}
                title={item.title}
                price={item.price}
                size={item.size}
                img={item.img}
                handleClose={handleClose}
              />
            ))}

          </div>
        )}
      </div>

      <div className='cart-bottom'>
        <div className='cart-bottom__total'>Total</div>
        <div className='cart-bottom__price'>{Math.round(favorite.reduce((sum, item) => sum + item.price, 0)*100)/100}$</div>
      </div>

      {/* <Link className='cart-btn primary' onClick={handleClose} to='/checkout'>Checkout</Link> */}
      <Link className='cart-btn primary' onClick={handleClose} to='/favoriten'>Favoriten</Link>
    </div>
  )
}