import { Box, CardMedia, Grid, Stack, Typography } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import MediaCardVideo from "../../commons/slider/cardItemVideo";
import MediaCardCast from "../../commons/slider/cardItemCast";
import CircularProgressWithLabel from "../../commons/slider/Rating";

const DetailMovie = ({ movie, credits, videos }) => {
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
        alt={movie.title}
      >
        <Box>
          <Grid container>
            <Grid item lg={4}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                alt={movie.title ? movie.title : movie.name}
                sx={{
                  borderRadius: 2,
                  zIndex: 4,
                  height: { xs: "230px", lg: "460px" },
                  width: { lg: "338px" },
                  mt: { xs: 5 },
                  ml: { xs: 2 },
                }}
              />
            </Grid>
            <Grid item lg={8}>
              <Box
                alignItems="center"
                alignContent="center"
                sx={{
                  display: { xs: "none", lg: "flex" },
                }}
              >
                <Typography variant="h2" fontSize={24} align="center">
                  {`${movie.title} (${movie.release_date.slice(0, 4)})`}
                </Typography>
                <Box>
                  <Stack direction="row">
                    <Box>
                      <CircularProgressWithLabel
                        value={movie.vote_average * 10}
                      />
                    </Box>
                    <Box>
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
                  border={2}
                  borderLeft={0}
                  borderRight={0}
                  borderColor="black"
                >
                  <Typography alignItems="center" alignContent="center">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </Typography>
                </Box>
                <Box>
                  <Typography>{movie.overview}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        alignItems="center"
        alignContent="center"
        bgcolor="#E5E6E4"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#E5E6E4" : `#ffffff17`,
          display: { lg: "none" },
        }}
      >
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
          <Typography pl={4} pr={4} pt={2} pb={5}>
            {movie.overview}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h3" fontSize={19} fontWeight={600} pt={5} pl={5}>
        Reparto
      </Typography>
      <Stack
        alignItems="flex-start"
        boxSizing="border-box"
        pt={5}
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#B6B6B6",
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#545454",
            borderRadius: 2,
          },
        }}
        direction="row"
      >
        {credits.cast.map((cast, i) => (
          <MediaCardCast cast={cast} key={i} />
        ))}
      </Stack>
      <Typography variant="h3" fontSize={19} fontWeight={600} pt={5} pl={5}>
        Videos
      </Typography>
      <Stack
        alignItems="flex-start"
        boxSizing="border-box"
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#B6B6B6",
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#545454",
            borderRadius: 2,
          },
        }}
        direction="row"
      >
        {videos.results.map((video, i) => (
          <MediaCardVideo url={video.key} key={i} />
        ))}
      </Stack>
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
    props: { movie: dataMovie, credits: dataCredit, videos: dataVideos },
  };
}
