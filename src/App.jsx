import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Adder from "./components/Adder";

const defaultTheme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Adder />
      </Container>
    </ThemeProvider>
  );
};

export default App;
