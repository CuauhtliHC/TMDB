import fetch from "isomorphic-fetch";
import Head from "next/head";
import IndvidualVist from "../../components/individualVist";

const DetailMovie = ({ movie, credits, videos }) => {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndvidualVist data={movie} credits={credits} videos={videos} />
    </>
  );
};

export default DetailMovie;

export async function getServerSideProps({ params }) {
  const token = process.env.TMDB_API_KEY;
  const resMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${token}&language=es-ES`
  );
  const dataMovie = await resMovie.json();

  const resCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${token}&language=es-ES`
  );
  const dataCredit = await resCredit.json();

  const resVideos = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${token}&language=en-US`
  );
  const dataVideos = await resVideos.json();
  return {
    props: {
      movie: dataMovie,
      credits: dataCredit,
      videos: dataVideos,
    },
  };
}
