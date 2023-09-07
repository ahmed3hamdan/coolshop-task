import { Container, CssBaseline } from "@mui/material";
import Adder from "./components/Adder";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Adder />
      </Container>
    </>
  );
};

export default App;
