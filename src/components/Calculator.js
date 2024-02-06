import React, { useReducer } from 'react'
//styling
import "./Calculator.css";
//for evaluating the final expression using math js library
import {evaluate} from "mathjs";
//for showing notifications using react toast
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Calculator() {
const [expression,dispatch]=useReducer(calculatorReducer,"0");
  return (
    <>
    <div>
        <div className={"cal-body border-10"}>
            <div className='display border-8'>
                {expression}
            </div>
            <div className='controls'>
                <div className='button main-buttons' onClick={()=>dispatch({type:"CLEAR"})}>AC</div>
                <div className='button' onClick={()=>dispatch({type:"OPERATION",payload:"%"})}>%</div>

                <div className='button' onClick={()=>dispatch({type:"OPERATION",payload:"*"})}>
                    <div className='icons' >
                        <img src="crossed.png" alt='cross' width={"100%"} height={"100%"}/>
                    </div>
                </div>
                <div className='button' onClick={()=>dispatch({type:"BACKSPACE"})}>
                    <div className='backspace'>
                        <img src="backspace.png" alt='backspace' width={"100%"} height={"100%"}/>
                    </div>
                </div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"7"})}>7</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"8"})}>8</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"9"})}>9</div>
                <div className='button' onClick={()=>dispatch({type:"OPERATION",payload:"/"})}> 
                    <div className='icons' >
                        <img src="divide.png" alt='divide' width={"100%"} height={"100%"}/>
                    </div></div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"4"})}>4</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"5"})}>5</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"6"})}>6</div>
                <div className='button' onClick={()=>dispatch({type:"OPERATION",payload:"-"})}>-</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"1"})}>1</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"2"})}>2</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"3"})}>3</div>
                <div className='button' onClick={()=>dispatch({type:"OPERATION",payload:"+"})}>+</div>
                <div className='button' onClick={()=>dispatch({type:"SIGN_CHANGE"})}>+/-</div>
                <div className='button' onClick={()=>dispatch({type:"NUMBER",payload:"0"})}>0</div>
                <div className='button' onClick={()=>dispatch({type:"DOT"})}>.</div>
                <div className='button main-buttons' onClick={()=>dispatch({type:"EQUAL"})}>=</div> 
            </div>
        </div>
       
    </div>

     <ToastContainer/>    
    </>
    
   
  )
}




function calculatorReducer(state,action){
    switch(action.type){
        //for adding a number when the number is typed
        case "NUMBER":{
            if(state==="0"){
                return action.payload;
            }else{
                return state+action.payload;
            }
        }
        case "CLEAR":{
            return "0";
        }
        case "SIGN_CHANGE":{
            if(state==="0"){
                return state;
            }
            else if(state.charAt(0)==="-"){
                return state.substring(1);
            }else{
                return "-"+state;
            }
        }
        case "OPERATION":{
            let lastChar=state.charAt(state.length-1);
            if(lastChar==="."){
                return state;
            }
            if(lastChar==="+"||lastChar==="-"||lastChar==="*"||lastChar==="/"||lastChar==="%"){
                return state.substring(0,state.length-1)+action.payload;
            }
            return state+action.payload;
        }
        case "BACKSPACE":{
            if(state==="0"){
                return state;
            }
            if(state.length===1){
                return "0";
            }
            return state.substring(0,state.length-1);
        }
        case "EQUAL":{
            try{
                let ans=evaluate(state).toString();
                if(isNaN(ans) || ans==="Infinity" || ans==="-Infinity"){
                    //if the answer is infinity or not a number
                    toast.warning("Invalid Answer ");
                    return state;
                }
                return ans;
            }catch{
                toast.error("Invalid Expression");
                return state;
            }
        }
        case "DOT":{
            //check if the last letter is an operation
            let lastChar=state.charAt(state.length-1);
            if(lastChar==="+"||lastChar==="-"||lastChar==="*"||lastChar==="/"||lastChar==="%"){
                return state+"0.";
            }

            //check if there is  a dot already present
            let isDotThere=false;
            for(let i=state.length-1;i>0;i--){
                if(state.charAt(i)==="+" || state.charAt(i)==="-" || state.charAt(i)==="/" || state.charAt(i)==="%" || state.charAt(i)==="*"){
                    break;
                }
                if(state.charAt(i)==="."){
                    isDotThere=true;
                    break;
                }
            }
            if(isDotThere){
                toast.warning("Enter valid Expression");
                return state;
            }
            return state+".";
        }
        default: return state;
        }

}
