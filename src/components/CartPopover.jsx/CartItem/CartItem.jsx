import './CartItem.scss'
import { Link } from 'react-router-dom'

export default function CartItem({ handleClose, title, price, size, img, colorObj, category, id}) {
  console.log(category)

  return (
    <Link className='cartItem' onClick={handleClose} to={`/product?id=${id}&color=${colorObj?.name}&hex=${colorObj?.hex.replace('#', '')}&category=${category?.name}`}>
      <img className='cartItem-img' src={img} alt='product' />
      <div className='cartItem-content'>
        <div className='cartItem-content__title'>{title}</div>
        <div className='cartItem-content__price'>${price}</div>
        <div className='cartItem-content__text'>
          <span>Category:</span>
          <div>{category?.name}</div>
        </div>
        <div className='cartItem-content__text'>
          <span>Color:</span>
          <div>{colorObj?.name}</div>
        </div>
        <div className='cartItem-content__text'>
          <span>Sizes:</span>
          <div>{size}</div>
        </div>
      </div>
    </Link>
  )
}