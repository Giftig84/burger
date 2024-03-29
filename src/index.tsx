import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {store} from "./services/store";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>
);


