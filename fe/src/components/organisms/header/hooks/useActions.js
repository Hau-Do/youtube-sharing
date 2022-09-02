import { useHistory } from 'react-router-dom';
import { RoutesString } from 'routes/routesString';

const useActions = () => {
  const history = useHistory();
  const handleClickShare = () => {
    history.push(RoutesString.Share);
  };
  const handleRedirectHome = () => {
    history.push(RoutesString.Home);
  };
  return { handleClickShare, handleRedirectHome };
};

export default useActions;
