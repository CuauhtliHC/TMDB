import Head from "next/head";
import fetch from "isomorphic-fetch";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import MediaCard from "../commons/slider/cardItem";

export default function Home({ popularMovies, popularTvShow }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundImage: 'url("/img/baner.jpg")',
          height: "calc(100vh / 2.5)",
          backgroundSize: "cover",
          maxHeight: "360px",
          minHeight: "300px",
          backgroundPosition: "top center",
        }}
        display="flex"
        alt="Terminator_baner"
      >
        <Box
          height="100%"
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          width="100%"
          flexWrap="wrap"
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            alignContent="flex-start"
            boxSizing="border-box"
          >
            <Box
              flexWrap="wrap"
              maxWidth="1400px"
              width="100%"
              display="flex"
              alignItems="flex-start"
              alignContent="flex-start"
              pl="40px"
              pr="40px"
              pt="30px"
              pb="30px"
              boxSizing="border-box"
            >
              <Box
                width="100%"
                mb="20px"
                boxSizing="border-box"
                display="block"
              >
                <Typography
                  variant="h2"
                  color="white"
                  width="100%"
                  margin="0"
                  padding="0"
                  fontSize="3em"
                  fontWeight="700"
                  lineHeight="1"
                >
                  Bienvenidos
                </Typography>
                <Typography
                  variant="h3"
                  color="white"
                  fontSize="2em"
                  fontWeight="600"
                  padding={0}
                  boxSizing="border-box"
                  margin={0}
                  display="block"
                >
                  Millones de películas, programas de televisión y personas por
                  descubrir
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        pr={0}
        pl={0}
        padding="30px 20px"
        flexWrap="wrap"
        width="100%"
        boxSizing="border-box"
        maxWidth="100vw"
        display="felx"
        alignItems="flex-start"
        alignContent="flex-start"
      >
        <Box width="100%" boxSizing="border-box" display="block">
          <Box
            pl={3}
            pr={20}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            alignContent="center"
            boxSizing="border-box"
          >
            <Typography
              variant="h2"
              mr={20}
              whiteSpace="nowrap"
              fontSize="1.5em"
              margin={0}
              pl={0}
              pr={0}
              fontWeight={600}
              padding="0"
              boxSizing="border-box"
              display="block"
            >
              Peliculas Populares
            </Typography>
          </Box>
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
            {popularMovies.results.map((movie, i) => (
              <MediaCard movie={movie} key={i} url={"/movies"} />
            ))}
          </Stack>
        </Box>
      </Box>
      <Box
        pr={0}
        pl={0}
        padding="30px 20px"
        flexWrap="wrap"
        width="100%"
        boxSizing="border-box"
        maxWidth="100vw"
        display="felx"
        alignItems="flex-start"
        alignContent="flex-start"
      >
        <Box width="100%" boxSizing="border-box" display="block">
          <Box
            pl={3}
            pr={20}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            alignContent="center"
            boxSizing="border-box"
          >
            <Typography
              variant="h2"
              mr={20}
              whiteSpace="nowrap"
              fontSize="1.5em"
              margin={0}
              pl={0}
              pr={0}
              fontWeight={600}
              padding="0"
              boxSizing="border-box"
              display="block"
            >
              TvShow Populares
            </Typography>
          </Box>
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
            {popularTvShow.results.map((movie, i) => (
              <MediaCard movie={movie} key={i} url={"/tvshow"} />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const token = process.env.TMDB_API_KEY;
  const resMovie = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${token}&language=en-US&page=1`
  );
  const dataMovie = await resMovie.json();
  const resTvShow = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${token}&language=en-US&page=1`
  );
  const dataTvShow = await resTvShow.json();
  return { props: { popularMovies: dataMovie, popularTvShow: dataTvShow } };
}
