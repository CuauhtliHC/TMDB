import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CircularProgressWithLabel from "./Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuthContext } from "../../store/user";
import axios from "../../utils/axios/index";

export default function MediaCard({ movie, url }) {
  const { user, data, setData } = useAuthContext();
  const router = useRouter();
  const date = new Date(
    movie.release_date ? movie.release_date : movie.first_air_date
  );
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const addOrRemoveFav = () => {
    if (data.fav.some((element) => element === movie.id)) {
      axios
        .delete(`/api/favorites/remove/${user.uid}?id=${movie.id}`)
        .then((res) => {
          axios
            .get(`/api/favorites/byUserOnlyId/${user.uid}`)
            .then((res) => {
              setData({ fav: res.data });
              localStorage.removeItem("data");
              localStorage.setItem("data", JSON.stringify({ fav: res.data }));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(`/api/favorites/add/${user.uid}`, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          type: url,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          first_air_date: movie.first_air_date,
          name: movie.name,
        })
        .then((result) => {
          axios
            .get(`/api/favorites/byUserOnlyId/${user.uid}`)
            .then((res) => {
              setData({ fav: res.data });
              localStorage.removeItem("data");
              localStorage.setItem("data", JSON.stringify({ fav: res.data }));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  };

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
        onClick={() =>
          router.push(
            url ? `/${url}/${movie.id}` : `/${movie.type}/${movie.id}`
          )
        }
      />
      <CardContent>
        <CircularProgressWithLabel value={movie.vote_average * 10} />
        {user ? (
          <IconButton onClick={addOrRemoveFav}>
            {data.fav.some((element) => element === movie.id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        ) : null}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize="1em"
          fontWeight={700}
          onClick={() =>
            router.push(
              url ? `/${url}/${movie.id}` : `/${movie.type}/${movie.id}`
            )
          }
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
