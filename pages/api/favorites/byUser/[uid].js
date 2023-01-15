import firestore from "../../../../utils/db/firestore";

export default async (req, res) => {
  const { uid } = req.query;
  getFavoritesByUser(uid)
    .then(({ docs }) => {
      const favorites = docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      res.status(200).json(favorites);
    })
    .catch((error) => {
      console.log(error);
      //   res.status(500).json({ error });
    });
};

const getFavoritesByUser = (uid) => {
  return firestore
    .collection("favorites")
    .where("uid", "==", uid)
    .limit(1)
    .get();
};
