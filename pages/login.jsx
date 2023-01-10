import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import LoginWithSocial from "../commons/login/LoginWithSocial";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/client";
import { useAuthContext } from "../store/user";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setUser } = useAuthContext();
  const router = useRouter();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      setUser(result.user);
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Inicio de Sesion</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt={2}>
        <FormGroup sx={{ alignItems: "center", alignContent: "center" }}>
          <Box pt={1}>
            <FormControl>
              <InputLabel htmlFor="email">Correo Electronico</InputLabel>
              <Input
                id="email"
                type="email"
                aria-describedby="email-helper"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText id="email-helper">
                Ingrese su correo electronico
              </FormHelperText>
            </FormControl>
          </Box>
          <Box pt={2}>
            <FormControl>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                type="password"
                aria-describedby="password-helper"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText id="password-helper">
                Ingrese su contraseña
              </FormHelperText>
            </FormControl>
          </Box>
          <Box pt={3}>
            <Button vartian="contained" onClick={loginUser}>
              Iniciar Sesion
            </Button>
          </Box>
          <LoginWithSocial />
        </FormGroup>
      </Box>
    </>
  );
};

export default Login;
