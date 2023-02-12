import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, ResetPasswordPage, ForgetPasswordPage, } from './pages/auth/index'
import Layout from './components/admin/shared/Layout';
import { HomePage, PharmaciePage, CommentairePage } from './pages/admin/index'
import { PharmacieAdd } from './components/admin/post/index'
import PharmacieUpdate from './components/admin/post/PharmacieUpdate'
import PrivateRoute from './components/navigation/PrivateRoute'
import PublicRoute from './components/navigation/PublicRoute'
import PharmacieComments from './components/admin/post/PharmacieComment';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicRoute> <LoginPage /> </PublicRoute>} />
        <Route path='resetpassword/:token' element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        <Route path='forgetpassword' element={<PublicRoute><ForgetPasswordPage /></PublicRoute>} />
        <Route path="dashboard/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<HomePage />} />
          <Route path='pharmacies' element={<PharmaciePage />} />
          <Route path='commentaires' element={<CommentairePage />} />
          <Route path='pharmacieadd' element={<PharmacieAdd />} />
          <Route path='pharmacieupdate/:id' element={<PharmacieUpdate />} />
          <Route path='getcomment/:id' element={<PharmacieComments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
