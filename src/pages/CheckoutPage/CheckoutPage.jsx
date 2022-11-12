import { Button, TextField } from '@mui/material'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import './CheckoutPage.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PaymentIcon from '@mui/icons-material/Payment';
import CartPopover from '../../components/CartPopover.jsx/CartPopover';
import CartItem from '../../components/CartPopover.jsx/CartItem/CartItem';

export default function CheckoutPage() {

  return (
    <>
      <Breadcrumbs title={'Checkout'} />

      <div className='container'>


        <form className='checkout'>
          <div className='checkout-form'>
            <div className='checkout-form__title'>
              <AccountCircleIcon />
              My Information
            </div>
            <TextField
              label="First name"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your First name' />
            <TextField
              label="Last name"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your Last name' />
            <TextField
              label="e-mail"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your e-mail' />
            <TextField
              label="phone"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your phone' />
            <div className='checkout-form__text'>
              <DeliveryDiningIcon />
              Delivery address
            </div>
            <TextField
              label="City"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your city' />
            <TextField
              label="Post office number"
              className='checkout-form__input'
              required={true}
              variant='outlined'
              placeholder='Enter your post office number' />
            <div className='checkout-form__text'>
              <PaymentIcon />
              Payment
            </div>
            <div style={{ color: '#29282d' }}>Payment on delivery (2$ + 20%)</div>
          </div>

          <div className='checkout-content'>
            <div className='checkout-content__title'>
              Your Order
              <span>$29.99</span>
            </div>
            <div className='cart-items'>
              <CartItem />
              <CartItem />
              <CartItem />
            </div>

            <div className='checkout-content__values'>
              <div className='checkout-content__par'>
                <div>Order value</div>
                <div>$29.99</div>
              </div>
              <div className='checkout-content__par'>
                <div>Shipping</div>
                <div>$2 + 20%</div>
              </div>
              <div className='checkout-content__par checkout-content__total'>
                <div>Total</div>
                <div>$36.43</div>
              </div>
            </div>

            <Button type='submit' variant="contained">checkout</Button>
          </div>
        </form>

      </div>
    </>
  )
}