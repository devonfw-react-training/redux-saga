import { CaseReducer, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../book/book";
import { RootState } from "../store";

type State = {
  books: Book[];
}

type Reducers = {
  update: CaseReducer<State, PayloadAction<Book>>;
  create: CaseReducer<State, PayloadAction<Omit<Book, 'id'>>>;
}

const slice = createSlice<State, Reducers>({
  name: "books",
  initialState: {
    books: [
      {
        "id": 1,
        "authors": "Joshua Bloch",
        "title": "Effective Java, 2nd Edition",
      },
      {
        "id": 2,
        "authors": "Gavin King",
        "title": "Java Persistence With Hibernate",
      },
      {
        "id": 3,
        "authors": "Douglas Crockford",
        "title": "JavaScript: The Good Parts",
      },
      {
        "id": 4,
        "authors": "Kent Beck",
        "title": "Test Driven Development",
      },
    ],
  },
  reducers: {
    update: (s, a) => {
      const booksIndex = s.books.findIndex(b => b.id === a.payload.id);
      s.books[booksIndex] = a.payload;
    },
    create: (s, a) => {
      s.books = [...s.books, { ...a.payload, id: s.books.length + 1 }];
    },
  },
});

export const allBooksSelector = (s: RootState) => s.books.books;

export const oneBookSelector = createSelector(
  allBooksSelector,
  books => (id: number) => books.find(b => b.id === id),
);

export const {
  create,
  update,
} = slice.actions;

export default slice.reducer;