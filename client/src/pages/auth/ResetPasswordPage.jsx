import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import BackgroundAuth from "../../assets/images/BackgoundAuth.jpg";
import { Button, Input } from "../../components/auth/index";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.css'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const {token} = useParams()
  const [user, setUser] = useState({ password: "", password2: "" })
  const update = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault()
    const path = `${process.env.REACT_APP_API_URL}/auth/resetpassword/${token}`
    axios.post(path, user).then(res => {
      toastr.success('Mot de passe réinitialisé', 'Success', {
        positionClass: "toast-bottom-left"
      })
      navigate('/')
    })
      .catch(err => {
        if (err.response.data.message) {
            toastr.warning(err.response.data.message, 'Please Check form !', {
                positionClass: "toast-bottom-left"
            })
        } else {
            toastr.warning("Problem connection", 'Sorry !', {
                positionClass: "toast-bottom-left"
            })
        }
      })
    }
    const { password, password2 } = user
  return (
    <div
    className="hero min-h-screen bg-base-200 flex justify-end"
    style={{ backgroundImage: `url(${BackgroundAuth})` }}
  >
    <div className="hero-content flex-col lg:flex-row-reverse lg:w-3/6">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="my-5 mx-3 px-3">
          <p className="text-2xl mb-6 font-bold">Réinitialisation du mot de passe</p>
          <form onSubmit={submit} >
          <div>
            <p className="text-s px-1">Choisissez votre nouveau mot de passe puis saisissez-le une deuxième fois.</p>
          </div>
            <div className="mt-2">
              <label className="label text-xs font-medium">
              Saisissez votre mot de passe
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder=""
                value={password}
                onChange={update}
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
              Confirmez votre mot de passe
              </label>
              <Input
                type="password"
                name="password2"
                id="confirmer"
                placeholder=""
                value={password2}
                onChange={update}
              />
            </div>

            <div className="mt-3 font-main">
              <Button
                type="submit"
                text="Enregistrer votre nouveau mot de passe"
                textColor={false}
              />
            </div>
            <div className="mt-2 flex flex-row gap-2">
              <span className="text-xs"> Vous avez déjà un compte ?</span>
              <Link
                to={"/"}
                className="text-blue-500 text-xs focus:outline-none text-color-primary font-medium hover:text-color-secondary focus:underline hover:underline"
              >
                 Connectez-vous
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default ResetPasswordPage