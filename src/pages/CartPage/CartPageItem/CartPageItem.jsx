
import { Link } from 'react-router-dom';
import './CartPageItem.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriten } from '../../../redux/slices/appSlice';
import { URL } from '../../../api/api';

export default function CartPageItem({ colorObj, category, size, title, price, id, img, favId }) {
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.app)

  const deleteFavorite = async () => {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    await fetch(`${URL}/product/fav/${favId}`, {
      method: 'DELETE',
      headers: headers
    }).then(response => {
      return response.json()
    });

    dispatch(getFavoriten(userId))
  }

  return (
    <div className='cartPageItem'>
      <Link style={{ margin: 0 }} className='cartItem' to={`/product?id=${id}&color=${colorObj?.name}&hex=${colorObj?.hex.replace('#', '')}&category=${category?.name}`}>

        <img className='cartItem-img cartPageItem-img' src={img} alt='product' />
        <div className='cartItem-content'>
          <div className='cartItem-content__title'>{title}</div>
          <div className='cartItem-content__price cartPageItem-price'>${price}</div>
          <div className='cartItem-content__text'>
            <span>Color:</span>
            <div>{colorObj?.name}</div>
          </div>
          <div className='cartItem-content__text'>
            <span>Sizes:</span>
            <div>{size}</div>
          </div>
          <div className='cartItem-content__text'>
            <span>Art.no.</span>
            <div>{id}</div>
          </div>
          <div className='cartItem-content__text'>
            <span>Category:</span>
            <div>{category?.name}</div>
          </div>
        </div>
      </Link>

      <div className='cartItem-actions'>
        <Button className='cartItem-actions__delete' color="error" variant="outlined" onClick={deleteFavorite}>
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  )
}