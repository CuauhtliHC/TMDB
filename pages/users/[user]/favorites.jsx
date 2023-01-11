import { Box } from "@mui/material";
import Head from "next/head";
import ListItems from "../../../components/list";

const Favorites = ({ fav }) => {
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

export async function getServerSideProps() {
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
      fav: { results: fav, total_pages: 10 },
    },
  };
}
