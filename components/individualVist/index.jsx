import { Box, CardMedia, Grid, Stack, Typography } from "@mui/material";
import MediaCardCast from "../../commons/slider/cardItemCast";
import MediaCardVideo from "../../commons/slider/cardItemVideo";
import CircularProgressWithLabel from "../../commons/slider/Rating";

const IndvidualVist = ({ data, credits, videos }) => {
  const { results } = videos;
  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(to right, rgba(31.5, 31.5, 73.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 73.5, 0.84) 30%, rgba(31.5, 31.5, 73.5, 0.84) 100%), url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path}")`,
          height: "calc(100vh / 2.5)",
          backgroundSize: "cover",
          maxHeight: { xs: "360px", lg: "1000px" },
          minHeight: { xs: "300px", lg: "550px" },
          backgroundPosition: "top center",
        }}
        display="flex"
        alt={data.title ? data.title : data.name}
      >
        <Stack flexDirection="row">
          <Box>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
              alt={data.title ? data.title : data.name}
              sx={{
                borderRadius: 2,
                height: { xs: "230px", lg: "460px" },
                width: { lg: "338px" },
                mt: { xs: 5 },
                ml: { xs: 2 },
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              pr: { lg: 10, xl: 50 },
              pl: { lg: 10, xl: 10 },
            }}
            flexDirection="column"
            pt={5}
          >
            <Typography
              variant="h2"
              fontSize={35}
              fontWeight={600}
              color="white"
            >
              {`${data.title ? data.title : data.name} (${
                data.release_date
                  ? data.release_date.slice(0, 4)
                  : data.first_air_date.slice(0, 4)
              })`}
            </Typography>
            <Box>
              <Typography
                alignItems="center"
                alignContent="center"
                color="white"
              >
                {data.genres.map((genre) => genre.name).join(", ")}
              </Typography>
            </Box>
            <Box pt={2}>
              <Stack direction="row">
                <Box>
                  <CircularProgressWithLabel value={data.vote_average * 10} />
                </Box>
                <Box pl={1}>
                  <Typography fontSize={16} fontWeight={700} color="white">
                    Puntuación de
                  </Typography>
                  <Typography fontSize={16} fontWeight={700} color="white">
                    usuario
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box pt={3}>
              <Typography
                variant="h3"
                fontWeight={600}
                fontSize="20px"
                color="white"
              >
                Vista General
              </Typography>
              <Typography pt={1} fontSize="16px" color="white">
                {data.overview !== "" ? data.overview : "Sin informacion"}
              </Typography>
            </Box>
          </Box>
        </Stack>
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
          {`${data.title ? data.title : data.name} (${
            data.release_date
              ? data.release_date.slice(0, 4)
              : data.first_air_date.slice(0, 4)
          })`}
        </Typography>
        <Box pl={5}>
          <Stack direction="row" pt={3}>
            <Box>
              <CircularProgressWithLabel value={data.vote_average * 10} />
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
            {data.genres.map((genre) => genre.name).join(", ")}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h3"
            fontWeight={600}
            fontSize="19px"
            pt={3}
            pl={3}
          >
            Vista General
          </Typography>
          <Typography pl={4} pr={4} pt={1} pb={5}>
            {data.overview !== "" ? data.overview : "Sin informacion"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pl: { xl: 10 } }}>
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
      </Box>
      <Box sx={{ pl: { xl: 10 } }}>
        <Typography variant="h3" fontSize={19} fontWeight={600} pt={5} pl={5}>
          Videos
        </Typography>
        {results.length === 0 ? (
          <Typography fontSize={15} pt={1} pl={5}>
            Sin videos
          </Typography>
        ) : (
          <Stack
            alignItems="flex-start"
            boxSizing="border-box"
            pt={2}
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
            {results.map((video, i) => (
              <MediaCardVideo url={video.key} key={i} />
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default IndvidualVist;
