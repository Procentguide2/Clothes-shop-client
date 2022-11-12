import { useEffect } from 'react';
import './TypeFilter.scss'
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

function TypeFilter({ setCategoryFilter, categoryFilter }) {
  const { allCategories } = useSelector(state => state.app)

  return (
    <div className="typeFilter">
      {allCategories.map(item => (
        <button className="filterBtn" style={{ color: categoryFilter === item.id ? '#34c3ff' : '' }} onClick={() => setCategoryFilter(item.id)}>{item.name}</button>
      ))}

      {categoryFilter ? (
        <button className="filterBtn" onClick={() => setCategoryFilter()}>
          <ClearIcon />
        </button>
      ): ''}
      

    </div>
  );
}

export default TypeFilter;