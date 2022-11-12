import { Link, useNavigate } from 'react-router-dom'
import './LoginPopover.scss'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../../redux/slices/appSlice';

export default function LoginPopover({ handleClose }) {
  const dispatch = useDispatch()
  const { email, isAdmin } = useSelector(state => state.app);
  const navigate = useNavigate();

  return (
    <div className='login'>
      {email ? (
        <>
          {isAdmin && <div className='admin-hi'>Admin Panel</div>} 
          <div>{email}</div>
          <Button onClick={() => { navigate('/'); dispatch(logout()); }}>Exit</Button>
        </>
      ) : (
        <>
          <Link className='login-btn' onClick={handleClose} to='/login'>Login</Link>
          <Link className='login-btn__register' onClick={handleClose} to='/register'>Register</Link>
        </>
      )}

    </div>
  )
}