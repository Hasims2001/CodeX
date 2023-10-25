import { Stack } from "@chakra-ui/react";
import { Navbar } from "./Components/Navbar";
import { ContentBox } from "./Components/ContentBox";
import "./App.css";
function App() {
  return (
    <div className="App">
     <Stack gap={12} mb={12}>
    <Navbar />
    <ContentBox />
    </Stack>
    </div>
  );
}

export default App;
