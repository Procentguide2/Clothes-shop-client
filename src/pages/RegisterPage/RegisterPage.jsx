import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useDispatch } from 'react-redux';
import { changeLoading } from "../../redux/slices/appSlice";
import { URL } from "../../api/api";
import axios from "axios";


export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [succes, setSucces] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const requestFetch = (url, method, body = null) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      return response.json()
    });
  }

  const onSubmit = () => {
    axios.post(`${URL}/user/register`, { email: email, password: password })
    .then(res => {
      if(res.status === 200){
        setSucces(true)
        setMessage('')
      } else {
        setMessage('Wrong credentials')
        setSucces(false)
      }
    }).catch((err) => {
      setMessage('Wrong credentials')
        setSucces(false)
    })
  }

  return (
    <main className="main">

      <Breadcrumbs title={'Register'} />

      <section class="modal">
        <div class="container">
          <div class="modal__links">
            <Link class="modal__link modal__link--active" to="/register">REGISTER</Link>
            <Link class="modal__link" to="/login">LOGIN</Link>
          </div>

          <form class="modal__form" action="#" onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <label class="modal__label">
              Email address*
              <input class="modal__input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required onInput={(e) => setEmail(e.target.value)} />
            </label>
            <label class="modal__label">
              Password*
              <input class="modal__input" type="password" required onInput={(e) => setPassword(e.target.value)} />
            </label>
            {!succes && message && (
              <p class="modal__text" style={{ color: 'red' }}>
                Email already exist!
              </p>
            )}
            {succes && <p class="modal__text" style={{ color: '#34c3ff',  fontSize: 18}}>
              You successfully registered!
            </p>}
            <p class="modal__text">
              Your personal data will be used to support your experience throughout this website, to manage access to your
              account, and for other purposes described in our privacy policy.
            </p>
            <label class="modal__label">
              <input type="checkbox" required />
              Agree with Terms & Conditions
            </label>
            <button class="modal__btn" type="submit">REGISTER</button>
          </form>
        </div>
      </section>

    </main >
  )
}