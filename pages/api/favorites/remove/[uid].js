const { adminApp } = require("../../../../utils/db/index");

export default async (req, res) => {
  const { uid, id } = req.query;
  removeFavorite(uid, id)
    .then(({ docs }) => {
      docs.forEach((doc) => doc.ref.delete());
      res.status(204).send("success");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

const removeFavorite = (uid, id) => {
  return adminApp
    .firestore()
    .collection("favorites")
    .where("uid", "==", uid)
    .where("id_movie", "==", parseInt(id))
    .get();
};
