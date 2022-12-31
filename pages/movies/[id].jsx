import { Box, CardMedia, Stack, Typography } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import CircularProgressWithLabel from "../../commons/slider/Rating";

const DetailMovie = ({ movie }) => {
  console.log(movie);
  return (
    <>
      <Head>
        <title>{movie.title}</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}")`,
          height: "calc(100vh / 2.5)",
          backgroundSize: "cover",
          maxHeight: { xs: "360px", lg: "1000px" },
          minHeight: { xs: "300px", lg: "550px" },
          backgroundPosition: "top center",
        }}
        display="flex"
        alt="Terminator_baner"
      >
        <Box>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
            alt={movie.title ? movie.title : movie.name}
            sx={{
              borderRadius: 2,
              zIndex: 4,
              height: { xs: "230px" },
              mt: { xs: 5 },
              ml: { xs: 2 },
            }}
          />
        </Box>
      </Box>
      <Box alignItems="center" alignContent="center" bgcolor="#ffffff17">
        <Typography variant="h2" fontSize={24} align="center" pt={5}>
          {`${movie.title} (${movie.release_date.slice(0, 4)})`}
        </Typography>
        <Box pl={5}>
          <Stack direction="row" pt={3}>
            <Box>
              <CircularProgressWithLabel value={movie.vote_average * 10} />
            </Box>
            <Box pl={1}>
              <Typography fontSize={16} fontWeight={700}>
                Puntuación de
              </Typography>
              <Typography fontSize={16} fontWeight={700}>
                usuario
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          mt={5}
          pb={2}
          border={2}
          borderLeft={0}
          borderRight={0}
          borderColor="black"
        >
          <Typography pt={1} pl={6} alignItems="center" alignContent="center">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </Typography>
        </Box>
        <Box>
          <Typography pl={4} pr={4} pt={2}>
            {movie.overview}
          </Typography>
        </Box>
      </Box>
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
  return {
    props: { movie: dataMovie },
  };
}
