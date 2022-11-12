import { Input } from '@mui/material';
import './InputAmount.scss'


export default function InputAmount() {

  return (
    <div className="amount">
      <Input
        type='number'
        defaultValue={1}
        inputProps={{
          min: 1
        }}
      />
    </div>
  )
}