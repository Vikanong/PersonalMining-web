import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Web3ReactManager from 'components/Web3ReactManager'
import Mining from 'views/mining'
import Connect from 'views/connectWallet'
import "./assets/style/reset.less"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Web3ReactManager>
          <Switch>
            <Route path="/" component={Mining} exact />
            <Route path="/Connect" component={Connect} exact />
            <Route render={(() => <h1>404 页面</h1>)} />
          </Switch>
        </Web3ReactManager>
      </BrowserRouter>
    </div >
  );
}

export default App;