import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CircularProgressWithLabel from "./Rating";

export default function MediaCard({ movie, url }) {
  const router = useRouter();
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
          cursor: "pointer",
        }}
        onClick={() => router.push(`${url}/${movie.id}`)}
      />
      <CardContent>
        <CircularProgressWithLabel value={movie.vote_average * 10} />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize="1em"
          fontWeight={700}
          onClick={() => router.push(`${url}/${movie.id}`)}
          sx={{ cursor: "pointer" }}
        >
          {movie.title ? movie.title : movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${day} ${month} ${year}`}
        </Typography>
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
