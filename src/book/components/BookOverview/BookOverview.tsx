import { useNavigate } from "react-router-dom";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { allBooksSelector } from "../../../store/books/books.slice";

export interface Props {
}

export const BookOverview = () => {
  const books = useSelector(allBooksSelector);
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow
                  hover
                  key={book.id}
                  onClick={() => navigate(`/book-app/book/${book.id}`)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
