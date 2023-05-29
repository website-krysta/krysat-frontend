import { Outlet, Navigate } from 'react-router-dom';

const AuthRouter = () => {
  const loginData = JSON.parse(sessionStorage.getItem('userData'));
  const isLoginDataEmpty = Object.keys(loginData).length === 0;
  debugger
  const auth = !isLoginDataEmpty;

  return ( 
        auth ? <Outlet /> : <Navigate to="/" />
    )
  };
  export default AuthRouter;