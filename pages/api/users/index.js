import db from "../../../utils/db";

export default async (req, res) => {
  const { page } = req.query;
  const limit = 20;
  try {
    const users = await getUsers(limit, page);
    const totalResult = await countUsers();
    const pages = totalPage(limit, totalResult);
    res
      .status(200)
      .json({ users: users, totalResult: totalResult, pages: pages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const countUsers = async () => {
  let totalUsers = 0;
  const result = await db.auth().listUsers();
  totalUsers = result.users.length;
  return totalUsers;
};

const totalPage = (limit, totalResult) => {
  if (totalResult < limit) return 1;
  return Math.ceil(totalResult / limit);
};

const getUsers = async (limit, page) => {
  let pageToken;
  let users = [];
  for (let i = 0; i < page; i++) {
    const listUsersResult = await db.auth().listUsers(limit, pageToken);
    pageToken = listUsersResult.pageToken;
    const listUsers = listUsersResult.users.map((user) => {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    });
    users = [...listUsers];
  }
  return users;
};
