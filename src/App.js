import { Stack } from "@chakra-ui/react";
import { Navbar } from "./Components/Navbar";
import { ContentBox } from "./Components/ContentBox";
import "./App.css";
import { useState } from "react";
function App() {
  const [content, setContent] = useState("")
  const handleContent = (value)=>{
    setContent(value)
  }
  return (
    <div className="App">
     <Stack gap={12} mb={12}>
    <Navbar handleContent={handleContent}/>
    <ContentBox content={content}/>
    </Stack>
    </div>
  );
}

export default App;
