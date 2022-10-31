import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './services/stateService';
import { BrowserRouter} from 'react-router-dom';
//провайдер это вспомогательный компонент для работы с хранилищем redux
const root = ReactDOM.createRoot(document.getElementById('root'));
// Browser router - это главный компонент react routera, который говорит нашему приложению, что здесь используется
// маршруты/Routes. Марщруты идут с адреса/url
root.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>    
);
