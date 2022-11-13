import { configureStore } from "@reduxjs/toolkit";
import { createRouterMiddleware, createRouterReducerMapObject } from "@lagunovsky/redux-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { reducer as toastrReducer } from "react-redux-toastr";

import books from "./books/books.slice";
import { rootSaga } from "./root.saga";

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    books,
    toastr: toastrReducer,
    ...createRouterReducerMapObject(history),
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().prepend(routerMiddleware).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
