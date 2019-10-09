import React from 'react';
import { Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Route
        path="/"
        exact={true}
        // render={props => <Access auth={auth} {...props} />}
      />
    </>
  );
};

export default App;
