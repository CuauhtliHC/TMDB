import MediaCard from "../../commons/slider/cardItem";
import { Grid, Box, Pagination, Stack } from "@mui/material";

const ListItems = ({ movies, changePage, url }) => {
  return (
    <Box>
      <Grid container justifyContent="center" pt={5} spacing={1}>
        {movies.results.map((movie, i) => (
          <Grid item key={i}>
            <MediaCard movie={movie} key={i} url={url} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center" alignItems="center" pt={5}>
        {movies.total_pages === 1 ? null : (
          <Pagination
            count={movies.total_pages < 500 ? movies.total_pages : 500}
            showFirstButton
            showLastButton
            onChange={changePage}
          />
        )}
      </Stack>
    </Box>
  );
};

export default ListItems;
