import db from "../../../utils/db"; //Firebase-admin inicializado

export default async (req, res) => {
  const { page } = req.query; //Pagina a la que quiero ir
  const limit = 20; //Limite de items a mostrar
  try {
    const users = await getUsers(limit, page); //Funcion para traer los usuarios
    const totalResult = await countUsers(); //Funcion para saber cuantos usuarios hay en total
    const pages = totalPage(limit, totalResult); // Funcion para saber cuantas paginas hay en total
    res
      .status(200)
      .json({ users: users, totalResult: totalResult, pages: pages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//Funcion para saber cuantos usuarios hay en total
const countUsers = async () => {
  let totalUsers = 0;
  const result = await db.listUsers();
  totalUsers = result.users.length;
  return totalUsers;
};

// Funcion para saber cuantas paginas hay en total
const totalPage = (limit, totalResult) => {
  if (totalResult < limit) return 1;
  return Math.ceil(totalResult / limit);
};

//Funcion para traer los usuarios
const getUsers = async (limit, page) => {
  let pageToken; //En esta variable se guarda el token para pasar a la siguiente pagina
  let users = []; //Variable para guardar datos de los usuarios
  for (let i = 0; i < page; i++) {
    //Loop para recorrer todos los usuarios
    const listUsersResult = await db.listUsers(limit, pageToken);
    pageToken = listUsersResult.pageToken;
    const listUsers = listUsersResult.users.map((user) => {
      return {
        uid: user.uid,
        email: user.email,
        diplayName: user.diplayName,
        photoURL: user.photoURL,
      };
    });
    users = [...listUsers];
  }
  return users;
};
