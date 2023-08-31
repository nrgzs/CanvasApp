"use client"
import { useRef,MouseEventHandler } from "react"

export default function Test (){
const inpt = useRef<HTMLButtonElement>(null)

const pickColor: MouseEventHandler<HTMLButtonElement> =  (e)=>{
console.log(e.currentTarget.value);

}

return (
  <div>
    <h2>test</h2>
    <button
      onClick={pickColor}
      className=" bg-green-500  w-16 h-16"
      value="#008000"
    ></button>
    <button
      onClick={pickColor}
      className=" bg-black w-16 h-16"
      value="#FFFF"
    ></button>
  </div>
);
}