import fetch from "isomorphic-fetch";
import Head from "next/head";
import IndvidualVist from "../../components/individualVist";

const DetailTvShow = ({ tvshow, credits, videos }) => {
  console.log(tvshow);
  return (
    <>
      <Head>
        <title>{tvshow.name}</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndvidualVist data={tvshow} credits={credits} videos={videos} />
    </>
  );
};

export default DetailTvShow;

export async function getServerSideProps({ params }) {
  const token = process.env.TMDB_API_KEY;
  const resTvShow = await fetch(
    `https://api.themoviedb.org/3/tv/${params.id}?api_key=${token}&language=es-ES`
  );
  const dataTvShow = await resTvShow.json();

  const resCredit = await fetch(
    `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=${token}&language=es-ES`
  );
  const dataCredit = await resCredit.json();

  const resVideos = await fetch(
    `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=${token}&language=en-US`
  );
  const dataVideos = await resVideos.json();
  return {
    props: { tvshow: dataTvShow, credits: dataCredit, videos: dataVideos },
  };
}
