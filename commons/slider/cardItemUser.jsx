import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function MediaCardUser({ user }) {
  const router = useRouter();
  console.log(user);
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
        image={user.photoURL ? user.photoURL : "/img/blank-profile.png"}
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
            `/users/${user.email.substring(
              0,
              user.email.indexOf("@")
            )}/favorites`
          )
        }
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize="1em"
          fontWeight={700}
          onClick={() =>
            router.push(
              `/users/${user.email.substring(
                0,
                user.email.indexOf("@")
              )}/favorites`
            )
          }
          sx={{ cursor: "pointer" }}
        >
          {user.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
}
