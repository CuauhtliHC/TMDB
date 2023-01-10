import { Box, Button, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useAuthContext } from "../../store/user";

const LoginWithSocial = () => {
  const { user, setUser } = useAuthContext();
  const handleClick = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((credentials) => {
        console.log(credentials);
        setUser(credentials.user);
      })
      .catch((err) => console.error(err));
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
