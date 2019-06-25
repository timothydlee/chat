import React, { Component } from 'react';
import { hydrate } from 'react-dom';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                Hello World
            </div>
        );
    }
}

hydrate(
    <App />,
    document.getElementById('app')
);

module.hot.accept();