import { Box, Container, CssBaseline, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import Adder from "./components/Adder";
import { indigo, grey } from "@mui/material/colors";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    background: {
      default: grey[50],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ py: 5 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold">
            Coolshop Adder
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={2}>
            Coolshop Adder is an interactive application designed to perform precise addition and subtraction calculations regardless of the size of the entered
            numbers. With Coolshop Adder, you can effortlessly add or remove rows and toggle rows to include or exclude them from the calculation.
          </Typography>
        </Container>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
            <Adder />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
