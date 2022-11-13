import { Navigate, Route, Routes } from "react-router-dom";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookDetails } from "./book/components/BookDetails/BookDetails";

import { BookProvider } from "./book/services/BooksService";
import { Header } from "./shared/components/Header/Header";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { history, store } from "./store/store";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import React from "react";
import ReduxToastr from "react-redux-toastr";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/book-app/books" replace />} />
    <Route path="/book-app/books" element={<BookOverview />} />
    <Route path="/book-app/book" element={<BookDetails />} />
    <Route path="/book-app/book/:id" element={<BookDetails />} />
  </Routes>
);

const App = () => (
  <Provider store={store}>
    <ReduxRouter history={history}>
      <BookProvider>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </BookProvider>
      <ReduxToastr
        closeOnToastrClick
      />
    </ReduxRouter>
  </Provider>
);

export default App;
