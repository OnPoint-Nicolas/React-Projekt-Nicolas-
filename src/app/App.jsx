import AppRouter from "./routes/AppRouter";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Box } from "@chakra-ui/react";

export default function App() {
  return (
    <Box minH="100vh" bgGradient="linear(to-b, #fff8f1, #fffdf8 35%, #fff3e0)">
      <Navbar />
      <AppRouter />
      <Footer />
    </Box>
  );
}
