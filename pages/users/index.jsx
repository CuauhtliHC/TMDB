import { Box } from "@mui/material";
import fetch from "isomorphic-fetch";
import Head from "next/head";
import ListItemsUsers from "../../components/list/users";
import { useRouter } from "next/router";

const Favorites = ({ result, search }) => {
  const router = useRouter();
  console.log(result);
  const changePage = (e, num) => {
    if (search) {
      router.push(`/users?page=${num}&search=${search}`);
    } else {
      router.push(`/users?page=${num}`);
    }
  };
  return (
    <>
      <Head>
        <title>Usuarios</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <ListItemsUsers result={result} changePage={changePage} />
      </Box>
    </>
  );
};

export default Favorites;

export async function getServerSideProps({ query }) {
  const { page, search } = query;
  const users = await fetch(`http://localhost:3000/api/users?page=${page}`);
  const dataUsers = await users.json();
  return {
    props: {
      result: dataUsers,
    },
  };
}
