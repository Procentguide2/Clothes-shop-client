import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useDispatch } from 'react-redux';
import { changeUserEmail, changeUserRole, changeLoading, changeUserId, changeToken } from "../../redux/slices/appSlice";
import { URL } from "../../api/api";
import axios from "axios";

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default function LoginPage() {
  const dispatch = useDispatch();

  const [succes, setSucces] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const requestFetch = (url, method, body = null) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
    })
  }

  const onSubmit = async () => {
    dispatch(changeLoading(true))

    const result = await axios.post(`${URL}/authenticate`, { username: email, password: password })
    .catch((err) => {
      setMessage("Wrong credentials")
    }).finally(() => [
      dispatch(changeLoading(false))
    ])

    if(result.status === 200){
      setMessage('')
      setSucces(true)

      const {scp, sub} = parseJwt(result.data.token)
      dispatch(changeUserEmail(email));
      if(scp === "ROLE_ADMIN"){
        dispatch(changeUserRole(true));
      } else {
        dispatch(changeUserRole(false));
      }
      dispatch(changeToken(sub))
      navigate('/')
    } else {
      setSucces(false)
    }

    const idUser = await axios.post(`${URL}/user/get/email`, {email: email})
    dispatch(changeUserId(idUser.data));
  }


  return (
    <main class="main">

      <Breadcrumbs title={'Login'} />

      <section class="modal">
        <div class="container">
          <div class="modal__links">
            <Link class="modal__link" to="/register">REGISTER</Link>
            <Link class="modal__link modal__link--active" to="/login">LOGIN</Link>
          </div>
          <form class="modal__form" action="#" onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <label class="modal__label">
              Email address*
              <input class="modal__input" type="text" required onInput={(e) => setEmail(e.target.value)} />
            </label>
            <label class="modal__label">
              Password*
              <input class="modal__input" type="password" required onInput={(e) => setPassword(e.target.value)} />
            </label>
            {message && (
              <p class="modal__text" style={{ color: 'red' }}>
                {message}
              </p>
            )}
            <button class="modal__btn" type="submit">LOG IN</button>
            <Link class="modal__error" to="/contact">Lost your password?</Link>
          </form>
        </div>
      </section>

    </main>
  )
}