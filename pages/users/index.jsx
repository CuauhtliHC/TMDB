import { Box } from "@mui/material";
import auth from "firebase/auth";
import Head from "next/head";

const Favorites = ({ users }) => {
  console.log(auth);
  return (
    <>
      <Head>
        <title>Usuarios</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>Hola</Box>
    </>
  );
};

export default Favorites;

export async function getServerSideProps() {
  console.log(auth);
  return {
    props: {
      users: "users.users,",
    },
  };
}
