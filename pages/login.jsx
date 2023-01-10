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
import AlertFirebase from "../commons/alerts/AlertFirebase";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setUser } = useAuthContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        router.push("/");
      })
      .catch((err) => (err) => {
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
    <>
      <Head>
        <title>Inicio de Sesion</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt={2}>
        <FormGroup sx={{ alignItems: "center", alignContent: "center" }}>
          <AlertFirebase open={open} message={message} setOpen={setOpen} />
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
          <LoginWithSocial setOpen={setOpen} setMessage={setMessage} />
        </FormGroup>
      </Box>
    </>
  );
};

export default Login;
