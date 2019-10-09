import React from 'react';
import { useGlobal } from 'reactn';
import { Route } from 'react-router-dom';
import createAuth0Client from '@auth0/auth0-spa-js';
import Next from './components/Next';

const App: React.FC = () => {
  const [auth0, setAuth0] = useGlobal('auth0');

  const auth0Login = () => {
    if (!auth0) return;
    auth0
      .loginWithRedirect({ redirect_uri: 'http://localhost:3000/callback' })
      .then(() => {
        //logged in. you can get the user profile like this:
        auth0.getUser().then((user: any) => {
          console.log(user);
        });
      });
  };

  React.useEffect(() => {
    const getAuth0 = async () => {
      if (process.env.REACT_APP_DOMAIN && process.env.REACT_APP_CLIENTID) {
        const auth0 = await createAuth0Client({
          domain: process.env.REACT_APP_DOMAIN,
          client_id: process.env.REACT_APP_CLIENTID,
        });
        setAuth0(auth0);
      }
    };
    getAuth0();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Route
        path="/"
        exact={true}
        render={props => {
          auth0Login();
          return <></>;
        }}
      />
      <Route
        path="/next"
        exact={true}
        render={props => {
          return <Next {...props} />;
        }}
      />
    </>
  );
};

export default App;
