import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

function CircularProgressWithLabel({ value }) {
  let color;
  if (value > 40 || value < 70) color = "#FFE030";
  if (value > 70) color = "#46FF00";
  const theme = createTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: "#FF0000",
      },
    },
  });

  return (
    <Box
      sx={{ position: "relative", display: "inline-flex" }}
      bgcolor="black"
      borderRadius={"50%"}
    >
      <ThemeProvider theme={theme}>
        <CircularProgress
          color={value > 40 ? "primary" : "secondary"}
          variant="determinate"
          value={value}
          sx={{ padding: "3px" }}
        />
      </ThemeProvider>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {Math.round(value) === 0 ? `NaN` : `${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
