import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Box,
} from "@mui/material";
import Head from "next/head";
import LoginWithSocial from "../commons/login/LoginWithSocial";
import { useState } from "react";
import { login, signOutUser, signup, updateUser } from "../firebase/client";
import AlertFirebase from "../commons/alerts/AlertFirebase";

const SignUP = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const createUser = () => {
    setOpen(false);
    setMessage(false);
    signup(email, password)
      .then(() => {
        login(email, password).then(() => {
          updateUser(name)
            .then(() => {
              signOutUser().then(() => {
                setMessage("Registro se a realizado correctamente!");
                setOpen(true);
              });
            })
            .catch((err) => console.error(err));
        });
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
    <>
      <Head>
        <title>Registro</title>
        <meta name="description" content="Web app to check movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pt={2}>
        <FormGroup sx={{ alignItems: "center", alignContent: "center" }}>
          <AlertFirebase open={open} message={message} setOpen={setOpen} />
          <Box pt={1}>
            <FormControl>
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <Input
                id="name"
                type="text"
                aria-describedby="name-helper"
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText id="email-helper">
                Ingrese su nombre
              </FormHelperText>
            </FormControl>
          </Box>
          <Box pt={2}>
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
              <FormHelperText id="password-helper" sx={{ width: "150px" }}>
                Constraseña por lo menos de 6 caracteres
              </FormHelperText>
            </FormControl>
          </Box>
          <Box pt={3}>
            <Button vartian="contained" color="primary" onClick={createUser}>
              Registrarse
            </Button>
          </Box>
          <LoginWithSocial setOpen={setOpen} setMessage={setMessage} />
        </FormGroup>
      </Box>
    </>
  );
};

export default SignUP;
