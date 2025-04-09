import { createContext,useState} from "react";
import run from "../src/config/gemini";

export const Context= createContext();

const ContextProvider=(props)=>{

    const[input,setInput]=useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompts,setPrevPrompts] =useState([]);
    const[showResult,setShowResult]= useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };

const delayPara= (index,nextWord) =>{
    setTimeout(function(){
        setResultData(prev =>prev+nextWord)
        console.log('Appended word:', nextWord);  
    },75*index)
}
 const newChat =()=>{
    setLoading(false)
    setShowResult(false)
 }

 const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    let processedResponse = response;
    processedResponse = processedResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    processedResponse = processedResponse.replace(/\*/g, "<br>");
    const words = processedResponse.split(" ");
    const appendWords = (index) => {
      if (index < words.length) {
        delayPara(index, words[index] + " "); 
        setTimeout(() => appendWords(index + 1), 75); 
      }
    };
    appendWords(0);

    setLoading(false);
    setInput("");
  };


    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        isDarkMode,    
        toggleTheme   
    }
     return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
     )
}
export default ContextProvider;