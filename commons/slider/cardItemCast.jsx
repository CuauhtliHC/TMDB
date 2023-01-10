import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function MediaCardCast({ cast }) {
  return (
    <Card
      sx={{
        ml: 3,
        width: 122,
        minWidth: 122,
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
        image={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w240_and_h266_face${cast.profile_path}`
            : `/img/blank-profile.png`
        }
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
          {cast.character}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cast.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
