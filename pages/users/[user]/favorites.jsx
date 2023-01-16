import { Box } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import ListItems from "../../../components/list";

const Favorites = ({ fav }) => {
  console.log(fav);
  return (
    <>
      <Head>
        <title>Usuarios</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <ListItems movies={fav} />
      </Box>
    </>
  );
};

export default Favorites;

export async function getServerSideProps({ query }) {
  const resFavorites = await fetch(
    `http://localhost:3000/api/favorites/byUser/${query.user}`
  );
  const { favorites, total_pages } = await resFavorites.json();

  return {
    props: {
      fav: { results: favorites, total_pages: total_pages },
    },
  };
}
