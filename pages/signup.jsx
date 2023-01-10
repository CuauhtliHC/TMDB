import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Box,
  Collapse,
  Alert,
  IconButton,
  AlertTitle,
} from "@mui/material";
import Head from "next/head";
import LoginWithSocial from "../commons/login/LoginWithSocial";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/client";
import authentic from "firebase/auth";
import CloseIcon from "@mui/icons-material/Close";

const SignUP = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const createUser = () => {
    setOpen(false);
    setMessage(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") setMessage("Correo Invalido!");
        else if (err.code === "auth/weak-password")
          setMessage("Contraseña demasiado debil");
        else if (err.code === "auth/email-already-in-use")
          setMessage("Este correo ya esta en uso");
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
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          </Collapse>
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
          <LoginWithSocial />
        </FormGroup>
      </Box>
    </>
  );
};

export default SignUP;
