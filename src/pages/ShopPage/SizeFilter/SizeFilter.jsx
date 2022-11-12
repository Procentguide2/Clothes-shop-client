import './SizeFilter.scss'
import Checkbox from '@mui/material/Checkbox';


function SizeFilter({ setSizeFilter, sizeFilter }) {
  const checkboxContoller = (e, size) => {
    const newSizes = [...sizeFilter];
    if (e.target.checked) {
      newSizes.push(size)
      setSizeFilter(newSizes)
    } else {
      setSizeFilter(newSizes.filter(item => item !== size))
    }
  }

  return (
    <div className="filter__item filter-size">
      <h3 className="filter__title">Size Filter</h3>
      <form className="filter-size__form" action="#">
        <label className="filter-size__label">
          <Checkbox onChange={(e) => { checkboxContoller(e, 'Xs') }} sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">X-small</span>
        </label>
        <label className="filter-size__label">
          <Checkbox onChange={(e) => { checkboxContoller(e, 'S') }} sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">Small</span>
        </label>
        <label className="filter-size__label">
          <Checkbox onChange={(e) => { checkboxContoller(e, 'M') }} sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">Medium</span>
        </label>
        <label onChange={(e) => { checkboxContoller(e, 'L') }} className="filter-size__label">
          <Checkbox sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">Large</span>
        </label>
        <label onChange={(e) => { checkboxContoller(e, 'XL') }} className="filter-size__label">
          <Checkbox sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">XL</span>
        </label>
        <label onChange={(e) => { checkboxContoller(e, 'XXL') }} className="filter-size__label" style={{ margin: 0 }}>
          <Checkbox sx={{ color: '#8d8d8d', '&.Mui-checked': { color: 'rgb(52, 195, 255)' } }} />
          <span className="filter-size__text">XXL</span>
        </label>
      </form>
    </div>
  );
}

export default SizeFilter;