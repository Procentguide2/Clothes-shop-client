import { Button } from '@mui/material';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './CartPage.scss';
import CartPageItem from './CartPageItem/CartPageItem';
import img from '../../images/icons/paypal.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function CartPage() {
  const { favorite, allCategories, allColors } = useSelector(state => state.app)

  return (
    <main className='main'>
      <Breadcrumbs title={'Favoriten'} />

      <section className='cartPage'>
        <div className='cartPage-items'>
          {favorite[0]?.products.map(item => (
            <CartPageItem
              favId={item.favorite.id}
              id={item.id}
              category={allCategories.find(category => category.id === item.categoryId)}
              colorObj={allColors.find(color => color.id === item.colorId)}
              title={item.title}
              price={item.price}
              size={item.size}
              img={item.img}
            />
          ))}
        </div>
        <div className='cartPage-actions'>

          <div className='cartPage-actions__text'>
            <div>Total</div>
            <div>{Math.round(favorite[0]?.products.reduce((sum, item) => sum + item.price, 0) * 100) / 100 || 0}$</div>
          </div>

          <Link to='/contact' style={{ width: '100%', fontWeight: 700, marginTop: 20 }}>
            <Button style={{ width: '100%', fontWeight: 700 }} variant="contained">Contact Us</Button>
          </Link>

        </div>
      </section>
    </main>
  )
}