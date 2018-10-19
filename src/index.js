import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import history from './service/router/History';
import PrivateContainer from './service/router/PrivateContainer';
import Login from './box/Login';

injectTapEventPlugin(); 

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {props => (<Component path={rest.location} {...props}/>)}/>
)

const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <Router history={history}>
                <div>
                    <Route exact path='/' component={Login} />
                    <PrivateRoute path='/alice/*' component={PrivateContainer} />
                </div>
            </Router>
        </BrowserRouter>
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();