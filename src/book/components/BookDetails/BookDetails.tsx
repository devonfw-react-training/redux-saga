import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../../book";
import { useDispatch, useSelector } from "react-redux";
import { create, oneBookSelector, update } from "../../../store/books/books.slice";

type ParamTypes = {
  id: string;
};

const initBook = { id: NaN, title: "", authors: "" };

export const BookDetails = () => {
  const dispatch = useDispatch();
  const findOne = useSelector(oneBookSelector);
  const { id } = useParams<ParamTypes>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>(initBook);

  useEffect(() => {
    if (id) {
      const book = findOne(+id);
      if (!book) return;
      setBook(book);
    } else {
      setBook(initBook);
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const navigateToBookList = () => navigate("/book-app/books");

  const notifyOnBookChange = (e: SyntheticEvent) => {
    e.preventDefault();
    if (book.id) {
      dispatch(update(book));
      navigateToBookList();
    } else {
      dispatch(create({ authors: book.authors, title: book.title }));
      navigateToBookList();
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={notifyOnBookChange}>
          <Stack spacing={4}>
            <TextField
              id="authors"
              name="authors"
              label="Authors"
              variant="outlined"
              fullWidth
              value={book.authors}
              onChange={handleChange}
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={book.title}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" name="apply">
              Apply
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
