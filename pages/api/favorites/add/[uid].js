import firestore from "../../../../utils/db/firestore";

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
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
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
  return firestore.collection("favorites").add({
    uid,
    id,
    title,
    poster_path,
    type,
    release_date,
    vote_average,
    first_air_date,
    name,
  });
};
