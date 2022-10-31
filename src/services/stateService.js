// Redux это отдельный модуль для управления состояния приложения
// В краце, это глобальный state приложения
// Redux toolkit - это вспомогательный модуль для работы с redux
// благодаря redux мы можем лучше контролировать рендер компонентов

import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

// как и у useState у redux есть initial state или первоначальное значения - это обычный объект

const initialState = {
    hourValue: 1,
    currentPrice: 0,
    selectedCountry: {
        key: 'ee', 
        title: 'Eesti',
    },
    bestTimeRange: {
        from: 0,
    until: 0,
    timestamp: null,
    bestPrice: 0,
    },
    worstTimeRange: {
        from: 0,
        until: 0,
        worstPrice: 0,
    },
    hourPath: null,
};
// create action - это у нас объявление события, которое мы будем использовать для смены redux состояния/state
// похоже на setState реакта
export const setHourValue = createAction("setHourValue");
export const setCurrentPrice = createAction("setCurrentPrice");
export const setSelectedCountry = createAction("setSelectedCountry");
export const setBestTimeRange = createAction("setBestTimeRange");
export const setWorstTimeRange = createAction("setWorstTimeRange");
export const setHourPath = createAction("setHourPath");
// Редуктор (reducer) это функция, которая используется для вычисления изменения/вычисления состояния 
//на основе предыдущего initialState и применяемого действия Action
const reducer = createReducer(initialState, {
    [setHourValue]: (state, action) => {
        state.hourValue = action.payload;
    },
    [setCurrentPrice]: (state, action) => {
        state.currentPrice = action.payload;
    },
    [setSelectedCountry]: (state, action) => {
        state.selectedCountry = action.payload;
    },
    [setBestTimeRange]: (state, action) => {
        state.bestTimeRange = action.payload;
    },
    [setWorstTimeRange]: (state, action) => {
        state.worstTimeRange = action.payload;
    },
    [setHourPath]: (state, action) => {
        state.hourPath = action.payload;
    },
});
// store - storage - хранилище в котором хранится вся наша информация об глобальном состоянии
export const store = configureStore({reducer});

