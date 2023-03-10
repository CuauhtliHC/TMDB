const { adminApp } = require("../../../../utils/db/index");

export default async (req, res) => {
  const { uid } = req.query;
  getFavoritesByUser(uid)
    .then(({ docs }) => {
      const favorites = docs.map((doc) => {
        const data = doc.data();
        return data.id_movie;
      });
      res.status(200).json(favorites);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

const getFavoritesByUser = (uid) => {
  return adminApp
    .firestore()
    .collection("favorites")
    .where("uid", "==", uid)
    .get();
};
