import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import {LoginPage,ResetPasswordPage,ForgetPasswordPage,} from './pages/auth/index'
import Layout from './components/admin/shared/Layout';
import{HomePage,PharmaciePage,CommentairePage} from './pages/admin/index'
import {PharmacieAdd} from './components/admin/post/index'
import PharmacieUpdate from './components/admin/post/PharmacieUpdate'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='resetpassword' element={<ResetPasswordPage />} />
        <Route path='forgetpassword' element={<ForgetPasswordPage />} />
        <Route path="dashboard/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='pharmacies' element={<PharmaciePage />} />
            <Route path='commentaires' element={<CommentairePage />} />
            <Route path='pharmacieadd' element={<PharmacieAdd />} />
            <Route path='pharmacieupdate' element={<PharmacieUpdate />} />

          </Route>
      </Routes>
    </div>
  );
}

export default App;
