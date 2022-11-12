import './StarRating.scss'
import { Rating } from '@mui/material';

export default function StarRating() {

  return (
    <div className="stars">
      <Rating defaultValue={2.5} precision={0.5} readOnly/>
    </div>
  )
}