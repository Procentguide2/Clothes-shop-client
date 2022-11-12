import { Link } from 'react-router-dom';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getFavoriten } from '../../redux/slices/appSlice';
import { URL } from '../../api/api';

const requestFetch = (url, method, body = null) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    headers: headers
  }).then(response => {
    return response.json()
  });
}


function ProductItem({ toList, img, title, descr, price, colorId, id, size, colorObj, category }) {
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.app)
  const navigate = useNavigate();

  const addToFavorite = async (e) => {
    if (userId === null){
      navigate('/login')
    } else {
      await requestFetch(`${URL}/product/fav/?userId=${userId}&productId=${id}`, 'POST')
      dispatch(getFavoriten(userId))
    }
  }

  return (
    <div className={`product-item ${toList && 'product-item--list'}`}>

      <div className="product-item__img-box">
        <div className='darkBg'></div>
        <img className="product-item__images" src={img} alt="product" />
        <div className="product-item__link-box">

          <Link className="product-item__link" to={`/product?id=${id}&color=${colorObj?.name}&hex=${colorObj?.hex.replace('#', '')}&category=${category?.name}`}>
            <ReadMoreOutlinedIcon />
          </Link>

          <div className="product-item__link" onClick={addToFavorite}>
            <FavoriteOutlinedIcon />
          </div>

        </div>
      </div>

      <div className="product-item__wrapper-box">
        <div className="product-item__box">
          <h4 className="product-item__title">
            {title}
          </h4>
          <div className="product-item__price">
            <div className="product-item__new-price">${price}</div>
          </div>
        </div>
        <div className="product-item__content-box">
          <p className="product-item__text">
            {descr}
          </p>
          <button className="product-item__btn">Add to favorite</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;