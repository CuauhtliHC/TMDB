import { Box, Stack, Typography } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const pages = ["Movies", "TvShows", "Users"];
  return (
    <Box
      color="white"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.main
            : `#ffffff17`,
      }}
      alignContent="center"
      alignItems="center"
      pb={{ xs: 5 }}
      mt={10}
    >
      <Box
        alignItems="center"
        display="flex"
        alignContent="center"
        pl={{ xs: 5, md: 15 }}
        pt={2}
      >
        <LocalMoviesIcon sx={{ display: "flex", mr: 1 }} />
        <Typography
          variant="h4"
          sx={{
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Movies
        </Typography>
      </Box>
      <Stack
        alignItems="flex-start"
        boxSizing="border-box"
        direction={{ sm: "row" }}
        pl={{ md: 15 }}
      >
        <Box pl={13} pt={2}>
          <Typography variant="h6" fontWeight={600}>
            Contenido
          </Typography>
          {pages.map((item, i) => (
            <Typography key={i} pl={2}>
              {item}
            </Typography>
          ))}
        </Box>
        <Box pl={13} pt={2}>
          <Typography variant="h6" fontWeight={600}>
            Usuarios
          </Typography>
          <Typography pl={2}>Login</Typography>
          <Typography pl={2}>Register</Typography>
        </Box>
        <Box pl={13} pt={2}>
          <Box pt={{ xs: 3, sm: 8 }} pl={{ xs: 1 }}>
            <LinkedInIcon />
            <GitHubIcon />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
