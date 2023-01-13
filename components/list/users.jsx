import { Grid, Box, Pagination, Stack } from "@mui/material";
import MediaCardUser from "../../commons/slider/cardItemUser";

const ListItemsUsers = ({ result, changePage }) => {
  return (
    <Box sx={{ pl: { xs: 0, xl: 20 }, pr: { xs: 0, xl: 20 } }}>
      <Grid container justifyContent="center" pt={5} spacing={1}>
        {result.users.map((user, i) => (
          <Grid item key={i}>
            <MediaCardUser user={user} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center" alignItems="center" pt={5}>
        {result.pages == 1 ? null : (
          <Pagination
            count={result.pages}
            onChange={changePage}
            showFirstButton
            showLastButton
          />
        )}
      </Stack>
    </Box>
  );
};

export default ListItemsUsers;
