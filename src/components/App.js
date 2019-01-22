import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import {TOKEN_KEY} from "../constants.js"

import '../styles/App.css';

class App extends React.Component {
    state = {/*refresh will reset if only use boolean*/
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)
    }

    handleLogin = (response) => {
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({isLoggedIn: true});
    }

    handleLogout =() => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    }
    render() {
        console.log(this.state.isLoggedIn);
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout ={this.handleLogout} />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
            </div>
        );
    }
}

export default App;