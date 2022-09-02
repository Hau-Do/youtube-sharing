import AuthAPI from 'api/actions/auth';
import useAuthStore from 'stores/auth';

const useAuth = () => {
  const { tokens, setAuthState, logoutAction } = useAuthStore();
  const isLoggedIn = !!tokens?.access?.token;

  const handleRegister = async (values) => {
    try {
      const response = await AuthAPI.register(values);
      setAuthState(response);
    } catch (error) {}
  };
  const handleLogin = async (values) => {
    try {
      const response = await AuthAPI.login(values);
      setAuthState(response);
    } catch (error) {}
  };
  const handleLogout = () => {
    logoutAction();
  };
  return { handleRegister, handleLogin, handleLogout, isLoggedIn };
};

export default useAuth;
