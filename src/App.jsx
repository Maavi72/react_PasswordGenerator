import { useState , useCallback , useRef } from "react";
export default function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const copyPasswordtoClipboard = useCallback(() => {
    if(passwordRef.current){
      passwordRef.current.select()
      document.execCommand("copy")
      alert("Password copied to clipboard")
    }
  },[passwordRef])
  const generatePassword = useCallback(() => {
    let pass = ""
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) chars += "0123456789"
    if(symbol) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    for(let i=0; i<length; i++){
      const randomIndex = Math.floor(Math.random() * chars.length)
      pass += chars[randomIndex]
    }
    setPassword(pass)
  },[length,number,symbol,setPassword])
  return (
    <div className="w-full max-w-lg mx-auto rounded-lg 
    px-4 py-3 my-8 text-black bg-gray-500">
      <h1 className="text-3xl font-bold
      text-center mb-4 py-3">Password Generator</h1>
      <div className=" flex shadow rounded-lg
      overflow-hidden mb-4">
        <input 
        type="text"
        placeholder="Password"
        className="w-full py-2 px-3 bg-white
        text-gray-700 
        outline-none"
        value={password}
        readOnly
        ref={passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white 
        px-3 py-2 shrink-0 pb-3"
        onClick={copyPasswordtoClipboard}
        >
          Copy
        </button> 

      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          className="cursor-pointer"
          type="range"
          min={8}
          max={40}
          value={length}
         onChange={e => setLength(Number(e.target.value))}
          />
          <label className="select-none">Length: {length}</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input 
          className="cursor-pointer"
          type="checkbox"
          id="number"
          checked={number}
          onChange={() => setNumber(prev => !prev)}
          /> 
          <label className="select-none" htmlFor="number">Include Numbers</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input 
          className="cursor-pointer"
          type="checkbox"
          id="symbol"
          checked={symbol}
          onChange={() => setSymbol(prev => !prev)}
          /> 
          <label className="select-none" htmlFor="symbol">Include Symbols</label>
        </div>
      </div>
      <div className="mt-4">
        <div
        className="bg-blue-700 
        text-white 
        text-center 
        py-2 
        rounded-lg 
        cursor-pointer
        hover:bg-blue-800
        transition-all
        duration-150
        "
        onClick={generatePassword}
        >
          Generate Password
        </div>
      </div>
    </div>
  );
}
