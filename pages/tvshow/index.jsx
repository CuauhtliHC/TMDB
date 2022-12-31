import fetch from "isomorphic-fetch";
import Head from "next/head";
import { useRouter } from "next/router";

import ListItems from "../../components/list";

const movies = ({ movies, search }) => {
  const router = useRouter();
  const changePage = (e, num) => {
    if (search) {
      router.push(`/tvshow?page=${num}&search=${search}`);
    } else {
      router.push(`/tvshow?page=${num}`);
    }
  };
  return (
    <>
      <Head>
        <title>Home - TvShow</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListItems movies={movies} changePage={changePage} url={"/tvshow"} />
    </>
  );
};

export default movies;

export async function getServerSideProps({ query }) {
  const token = process.env.TMDB_API_KEY;
  if (/[^0-9]/g.test(query.page) || query.page === "" || !query.page)
    return {
      redirect: {
        permanent: false,
        destination: "/tvshow?page=1",
      },
    };
  if (!query.search || query.search === "") {
    const resMovies = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${token}&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=${query.page}`
    );
    const dataMovies = await resMovies.json();
    return {
      props: { movies: dataMovies },
    };
  }
  if (query.search) {
    const resMovies = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${token}&language=en-US&query=${query.search}&page=${query.page}`
    );
    const dataMovies = await resMovies.json();
    return {
      props: { movies: dataMovies, search: query.search },
    };
  }
}
