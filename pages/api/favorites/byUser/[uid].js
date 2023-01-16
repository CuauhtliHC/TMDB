const { adminApp } = require("../../../../utils/db/index");

export default async (req, res) => {
  const { uid } = req.query;
  getFavoritesByUser(uid)
    .then(({ docs }) => {
      const favorites = docs.map((doc) => {
        const data = doc.data();
        const { id_movie } = data;
        return { ...data, id: id_movie };
      });
      getTotalPages(uid).then((num) => {
        res
          .status(200)
          .json({ favorites, total_pages: num < 20 ? 1 : Math.ceil(num / 20) });
      });
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

const getTotalPages = async (uid) => {
  const { docs } = await adminApp
    .firestore()
    .collection("favorites")
    .where("uid", "==", uid)
    .get();
  return docs.length;
};
