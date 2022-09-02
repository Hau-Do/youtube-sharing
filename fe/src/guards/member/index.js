import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutesString } from 'routes/routesString';
import useAuthStore from 'stores/auth';

function MemberGuard({ children }) {
  const tokens = useAuthStore((state) => state.tokens);
  const history = useHistory();
  useEffect(() => {
    if (
      !tokens?.access?.token ||
      new Date(tokens?.refresh?.expires) < Date.now()
    )
      history.push(RoutesString.Home);
  }, [tokens]);
  return children;
}

export default MemberGuard;
