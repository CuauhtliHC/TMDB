import { Box, Button, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { loginGitHub } from "../../firebase/client";
import { useAuthContext } from "../../store/user";
import { useRouter } from "next/router";
import axios from "axios";

const LoginWithSocial = ({ setMessage, setOpen }) => {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const handleClick = () => {
    loginGitHub()
      .then((credentials) => {
        const { displayName, email, photoURL, uid } = credentials.user;
        axios
          .get(`/api/favorites/byUserOnlyId/${uid}`)
          .then((res) => {
            setUser({ displayName, email, photoURL, uid, data: res.data });
            localStorage.setItem(
              "user",
              JSON.stringify({
                displayName,
                email,
                photoURL,
                uid,
                data: res.data,
              })
            );
            router.push("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") setMessage("Correo Invalido!");
        else if (err.code === "auth/weak-password")
          setMessage("Contraseña demasiado debil");
        else if (err.code === "auth/email-already-in-use")
          setMessage("Este correo ya esta en uso");
        else if (err.code === "auth/account-exists-with-different-credential")
          setMessage("Este correo ya esta registrado con otras credenciales");
        else if (err.code) setMessage("A ocurrido un error");

        setOpen(true);
        console.log(err);
      });
  };
  return (
    <Stack flexDirection="colum" alignContent="center" alignItems="center">
      <Box>---------------- ○ ----------------</Box>
      <Button startIcon={<GitHubIcon />} color="primary" onClick={handleClick}>
        GitHub
      </Button>
    </Stack>
  );
};

export default LoginWithSocial;
