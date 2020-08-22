import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Login from '../../pages/Login';
import Loading from '../../components/Loading';
import appActions from '../../store/actions/app';
import displayError from '../../util/displayError';
import devlog from '../../util/devlog';
import { useLocation } from 'react-router-dom';

const PageController = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isValidating, setIsValidating] = useState(false);
  const {
    authUser,
    sessionToken,
    expiresAt,
  } = useSelector(({ app }) => app);

  const isValidated = useMemo(() => !!(authUser && sessionToken && expiresAt), [authUser, sessionToken, expiresAt]);
    
  useEffect(() => {
    if ((!authUser || !expiresAt) && sessionToken) {
      setIsValidating(true);
      dispatch(appActions.verifyAuthUser(sessionToken))
        .then(() => {
          setIsValidating(false);
        })
        .catch(err => {
          devlog(err);
          setIsValidating(false);
          if (err.userMessage) {
            displayError(err.userMessage);
          } else {
            displayError('Uh Oh, looks like something went wrong. Pleas login again');
          }
        });
    }
  }, []);

  if (isValidated && expiresAt > new Date().getTime()) {
    return children;
  }

  if (isValidating) {
    return <Loading />
  }

  return <Login />;
  
}

export default PageController;
