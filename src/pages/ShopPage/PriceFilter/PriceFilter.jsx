import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './PriceFilter.scss'
import { Button } from '@mui/material';


function PriceFilter({ setPriceFilter, maxPrice = 0, minPrice = 1 }) {
  const [value, setValue] = React.useState([maxPrice, minPrice]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue([minPrice, maxPrice])
  }, [maxPrice, minPrice])

  return (
    <div className="filter__item filter-price">
      <h3 className="filter__title">Price Filter</h3>

      <Box sx={{ width: 300 }}>
        <Slider
          value={value}
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
          valueLabelDisplay="auto"
        />
      </Box>

      <label className="filter-price__label">
        <span>Price:
          $<span className="filter-price__from">{value[0]}</span> -
          $<span className="filter-price__to">{value[1]}</span>
        </span>
        <Button variant="contained" onClick={() => { setPriceFilter(value)}}>Filter</Button>
      </label>
    </div>
  );
}

export default PriceFilter;