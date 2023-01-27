import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import BackgroundAuth from "../../assets/images/BackgoundAuth.jpg";
import { Button, Input } from "../../components/auth/index";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authentification/authentificationSlice';

function LoginPage() {
  const [user, setUser] = useState({ Email: "", Password: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const update = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(login(user))
    navigate('/dashboard')
  }

  let { Email, Password } = user
  return (
    <div
      className="hero min-h-screen bg-base-200 flex justify-end"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="hero-content flex flex-col lg:flex-row-reverse lg:w-3/6">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="my-5 mx-3 px-3">
            <p className="text-2xl mb-6 font-bold">Connexion</p>
            <form onSubmit={submit} >
              <div>
                <label className="label text-xs font-medium">
                  Adresse email - Format: exemple@mail.com
                </label>
                <Input value={Email} onChange={update} type="email" name="Email" id="Email" />
              </div>
              <div>
                <label className="label text-xs font-medium">
                  Mot de passe
                </label>
                <Input value={Password} onChange={update} type="password" name="Password" id="Password" />
              </div>
              <div className="mt-2">
                <Link
                  to={"/forgetpassword"}
                  className="text-blue-500 text-xs focus:outline-none text-color-primary font-medium hover:text-color-secondary focus:underline hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="mt-2 font-main">
                <Button type="submit" text="Se connecter" textColor={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
