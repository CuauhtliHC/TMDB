import { Box } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import ListItems from "../../../components/list";

const Favorites = ({ fav, favorites }) => {
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
  const favorites = await fetch(
    `http://localhost:3000/api/favorites/byUser/${query.user}`
  );
  const dataFav = await favorites.json();

  const fav = new Array(20).fill({
    release_date: "2009-10-10",
    title: "Avatar: The Way of Water",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    vote_average: 7.7,
    id: 76600,
    type: "movies",
  });

  return {
    props: {
      fav: { results: dataFav, total_pages: 10 },
    },
  };
}
