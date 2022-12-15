import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function MediaCard({ movie }) {
  const date = new Date(
    movie.release_date ? movie.release_date : movie.first_air_date
  );
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return (
    <Card
      sx={{
        ml: 3,
        width: 150,
        minWidth: 150,
        flexWrap: "wrap",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        mt: 0,
        overflow: "visible",
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
        alt={movie.title ? movie.title : movie.name}
        sx={{
          borderRadius: 2,
          position: "relative",
          top: 0,
          left: 0,
          display: "flex",
          alignContent: "flex-start",
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize="1em"
          fontWeight={700}
        >
          {movie.title ? movie.title : movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${day} ${month} ${year}`}
        </Typography>
        <CircularProgressWithLabel value={movie.vote_average * 10} />
      </CardContent>
    </Card>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function CircularProgressWithLabel({ value }) {
  let color;
  if (value > 40 || value < 70) color = "#FFE030";
  if (value > 70) color = "#46FF00";
  const theme = createTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: "#FF0000",
      },
    },
  });

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <ThemeProvider theme={theme}>
        <CircularProgress
          color={value > 40 ? "primary" : "secondary"}
          variant="determinate"
          value={value}
        />
      </ThemeProvider>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
