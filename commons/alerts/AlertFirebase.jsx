import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertFirebase = ({ open, message, setOpen }) => {
  return (
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
        severity={
          message !== "Registro se a realizado correctamente!"
            ? "error"
            : "success"
        }
      >
        <AlertTitle>
          {message !== "Registro se a realizado correctamente!"
            ? "Error"
            : "Exito"}
        </AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertFirebase;
