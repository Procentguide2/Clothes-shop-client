import { useEffect, useState } from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useSelector, useDispatch } from 'react-redux';
import { changeLoading } from "../../../redux/slices/appSlice";
import { URL } from "../../../api/api";

const requestFetch = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }

    return response.json().then(error => {
      const e = new Error('Smth gone wrong')
      e.data = error
      throw e
    })
  });
}


function Products() {
  const {allColors, allCategories } = useSelector(state => state.app);

  const [newProducts, setNewProducts] = useState([])
  const [productsClone, setProductsClone] = useState([])
  const [step, setStep] = useState(1)

  const dispatch = useDispatch();

  useEffect(() => {
    setProductsClone([...newProducts.slice(0, step * 6)])
  }, [newProducts, step])

  useEffect(() => {
    dispatch(changeLoading(true))
    const url = `${URL}/product`;
    requestFetch(url)
      .then(data => {
        dispatch(changeLoading(false))
        console.log(data)
        setNewProducts(data)
      })
      .catch(err => {
        dispatch(changeLoading(false))
        console.log(err);
      });
  }, [])

  return (
    <section class="product">
      <div class="container">
        <h3 class="title">
          TRENDING PRODUCTS
        </h3>
        <p class="text">
          With each release we set new goals and work for maximum results.
        </p>
        <div class="product__items">
          {productsClone.map(item => (
            <ProductItem
              category={allCategories.find(category => category.id === item.idCategory.id)}
              colorObj={allColors.find(color => color.id === item.idColor.id)}
              img={item.img}
              price={item.price}
              title={item.title}
              descr={item.description}
              id={item.id} />
          ))}
        </div>
        {step !== 3 && <div onClick={() => setStep(prev => prev + 1)} class="product__link">LOAD MORE</div>}
        
      </div>
    </section>
  );
}

export default Products;