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
import LoginWithSocial from "../commons/login/LoginWithSocial";

const Login = () => {
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
              <Input id="email" type="email" aria-describedby="email-helper" />
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
              />
              <FormHelperText id="password-helper">
                Ingrese su contraseña
              </FormHelperText>
            </FormControl>
          </Box>
          <Box pt={3}>
            <Button vartian="contained">Iniciar Sesion</Button>
          </Box>
          <LoginWithSocial />
        </FormGroup>
      </Box>
    </>
  );
};

export default Login;
