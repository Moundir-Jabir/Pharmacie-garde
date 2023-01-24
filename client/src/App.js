import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  ResetPasswordPage,
  ForgetPasswordPage,
} from './pages/auth/index'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='resetpassword' element={<ResetPasswordPage />} />
        <Route path='forgetpassword' element={<ForgetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
