import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ReactDom - отвечает за связь между реактом и DOM
// Dom - Document object model. Структура HTML документа в javaScript объекте

const root = ReactDOM.createRoot(document.getElementById('root'));
// Здесь мы берём из document(DOM) элемент из id "root" и втсавляем в этот элемент react
// 
root.render(
    <App />
);
// render берёт элементарные компоненты и обрабатывает их в html(DOM)

// Простое объяснение почему реакт:
// из за компонентов и состояния, реакт изменяет только то, что необходимо,
// следственно работа сайта быстрая