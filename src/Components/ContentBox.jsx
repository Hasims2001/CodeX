import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Button } from "./Button";
import reducer from "../API/reducer";
import { postConvertCode, postDebug, postQualityCheck } from "../API/api";
const languages = {
  "untitled.txt": {
    name: "untitled.txt",
    language: "plaintext",
    value: "// Hello World",
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: "<html></html>",
  },
  "index.cpp": {
    name: "index.cpp",
    language: "cpp",
    value: `#include <iostream>\nusing namespace std;\nint main() {\ncout << "Hello World!";\nreturn 0;\n}`,
  },
  "main.java": {
    name: "main.java",
    language: "java",
    value: `public class Main {\npublic static void main(String[] args) {
\nSystem.out.println("Hello World");\n}\n}`,
  },
  "scripts.py": {
    name: "scripts.py",
    language: "python",
    value: "// Hello World",
  },
  "scripts.js": {
    name: "scripts.js",
    language: "javascript",
    value: "console.log('Hello World')",
  },
};
const init = {
    loading: false,
    clicked:"",
    error: "",
    output: ""
}

export const ContentBox = () => {
  const editorRef = useRef(null);
  const [lang, setLang] = useState("scripts.js");
  const [font, setFont] = useState(16);
  const [state, dispatch] = useReducer(reducer, init)
  const {loading, error, output, clicked} = state;
  const fileLang = languages[lang];
  const toast = useToast();
  const handleEditor = (editor, monaco) => {
    editorRef.current = editor;
  };

  function checkInput(code) {
    if (code === "") {
      toast({
        title: "Please write some code!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return true;
    }
    return false;
  }

  function checkOutput(result){
    if(!result.issue){
        dispatch({type: "OUTPUT", payload: result.msg})
       }else{
        dispatch({type: "ERROR", payload: result.msg})
       }
  }
  const handleQualityCheck =async () => {
    let code = editorRef.current.getValue();
    let checked = checkInput(code);
    if (!checked) {
        dispatch({type: "LOADING", payload: "Quality Check"});
        let result = await postQualityCheck(code );
        checkOutput(result);
    }
  };
  const handleDebug = async() => {
    let code = editorRef.current.getValue();
    let checked = checkInput(code);
    if (!checked) {
        dispatch({type: "LOADING",  payload: "Debug"});
       let result = await postDebug(code );
       checkOutput(result);
    }
  };
  const handleConvert =async () => {
    let code = editorRef.current.getValue();
    const convertLan = document.querySelector("#convertLan");
    if (convertLan.value === "") {
      toast({
        title: "Please enter language to convert!",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      let checked = checkInput(code);
      if (!checked) {
        dispatch({type: "LOADING", payload: "Convert"});
       let result =  await postConvertCode(code, lang, convertLan.value );
       checkOutput(result);
      }
    
    }
  };
  console.log(error);
  useCallback(()=>{
    if(error){
        toast({
            title: error,
            status: "error",
            duration: 6000,
            isClosable: true,
          });
    }
  }, [error]);
  return (
    <Flex p={2}>
      <Stack gap={6}>
        <Stack gap={6} px={10}>
          <Flex alignItems={"center"}>
            <Text w={"100%"}>Current Language:</Text>
            <Select onChange={(e) => setLang(e.target.value)} value={lang}>
              <option value="">Select Current Language...</option>
              <option value="untitled.txt">plaintext</option>
              <option value="index.cpp">cpp</option>
              <option value="index.html">html</option>
              <option value="main.java">java</option>
              <option value="scripts.js">javascript</option>
              <option value="scripts.py">python</option>
            </Select>
          </Flex>
          <Flex alignItems={"center"}>
            <Text w={"100%"}>Font Size:</Text>
            <Select onChange={(e) => setFont(e.target.value)} value={font}>
              <option value={""}>Font Size</option>
              <option value={14}>14</option>
              <option value={16}>16</option>
              <option value={18}>18</option>
              <option value={20}>20</option>
              <option value={22}>22</option>
              <option value={24}>24</option>
              <option value={26}>26</option>
              <option value={28}>28</option>
            </Select>
          </Flex>
        </Stack>
        <Editor
          width="49vw"
          height="70vh"
          defaultLanguage={fileLang.language}
          theme="vs-dark"
          onMount={handleEditor}
          defaultValue={fileLang.value}
          path={fileLang.name}
          options={{ fontSize: font }}
        ></Editor>
      </Stack>
      <Stack gap={6}>
        <Stack px={10} gap={6}>
          <Flex alignItems={"center"} gap={6}>
            <Input
              id="convertLan"
              type="text"
              placeholder="Convert code into..."
            />
            <Button handler={handleConvert} content={loading && clicked === "Convert" ? "Loading..." : "Convert"}></Button>
          </Flex>
          <Flex gap={6}>
            <Button handler={handleDebug} content={loading && clicked === "Debug" ?  "Loading..." : "Debug" }></Button>
            <Button
              handler={handleQualityCheck}
              content={loading && clicked === "Quality Check" ?  "Loading..." : "Quality Check" }
            ></Button>
          </Flex>
        </Stack>
        {/* output */}
        <Editor
          width="49vw"
          height="70vh"
          theme="vs-dark"
          options={{ fontSize: font }}
          readOnly
          defaultLanguage="markdown"
          defaultValue={`# your output will be here`}
        ></Editor>
      </Stack>
    </Flex>
  );
};