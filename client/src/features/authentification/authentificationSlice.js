import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import toastr from 'toastr'
import 'toastr/build/toastr.css'

const api_auth = `${process.env.REACT_APP_API_URL}/auth`

export const login = createAsyncThunk('auth/login', async (user) => {
    let result
    await axios.post(`${api_auth}/login`, user)
        .then(data => {
            toastr.success('User logged successfuly', 'Login', {
                positionClass: "toast-bottom-left"
            })
            localStorage.setItem('token', JSON.stringify(data.data.token))
            result = data.data.token
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
            result = false
        })
    return result
})

// export const logout = createAsyncThunk('auth/logout', async () => {
//     let result
//     await axios.get(`${api_auth}/logout`)
//         .then(() => {
//             toastr.success('Logout successefuly', 'Logout', {
//                 positionClass: "toast-bottom-left"
//             })
//             localStorage.removeItem('user')
//             localStorage.removeItem('token')
//             result = { user: false, token: false }
//         })
//     return result
// })

let initialToken = JSON.parse(localStorage.getItem('token')) || false

const initialState = {
    token: initialToken
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            toastr.success('Logout successefuly', 'Logout', {
                positionClass: "toast-bottom-left"
            })
            localStorage.removeItem('token')
            return {
                ...state, token: false
            }
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, { payload }) => {
            return {
                ...state, token: payload
            }
        },
        [login.rejected]: () => {
            console.log("login request rejected")
        }
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer