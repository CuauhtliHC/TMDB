import { Box } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import ListItemsUsers from "../../components/list/users";

const Favorites = ({ users }) => {
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
  const users = await fetch("http://localhost:3000/api/entry");
  const dataUsers = await users.json();
  return {
    props: {
      users: dataUsers.users,
    },
  };
}
