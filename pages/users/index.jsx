import { Box } from "@mui/material";
import Head from "next/head";
import ListItemsUsers from "../../components/list/users";

const Favorites = ({ users }) => {
  console.log(users);
  return (
    <>
      <Head>
        <title>Usuarios</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <ListItemsUsers users={users} />
      </Box>
    </>
  );
};

export default Favorites;

export async function getServerSideProps() {
  const users = new Array(20).fill({
    displayName: "Cuau",
    photoURL: "https://avatars.githubusercontent.com/u/50902390?v=4",
    email: "cuau_daali@hotmail.com",
  });

  return {
    props: {
      users: users,
    },
  };
}
