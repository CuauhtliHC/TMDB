const { adminApp } = require("../../../../utils/db/index");

export default async (req, res) => {
  const { uid } = req.query;
  const {
    id,
    title,
    poster_path,
    type,
    release_date,
    vote_average,
    first_air_date,
    name,
  } = req.body;
  add(
    uid,
    id,
    title,
    poster_path,
    type,
    release_date,
    vote_average,
    first_air_date,
    name
  )
    .then((result) => res.status(200).send("Success"))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

const add = (
  uid,
  id,
  title,
  poster_path,
  type,
  release_date,
  vote_average,
  first_air_date,
  name
) => {
  return adminApp.firestore().collection("favorites").add({
    uid,
    id_movie: id,
    title,
    poster_path,
    type,
    release_date,
    vote_average,
    first_air_date,
    name,
  });
};
