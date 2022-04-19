import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'

export default function AppFunctional(props) {

const [activeBlock, setActiveBlock] = useState(4)
const [timesMoved, setTimesMoved] = useState(0)
const [coordinates, setCoordinates] = useState({x: 2 , y: 2})
const [board, setboard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
const [message, setMessage] = useState("")
const [email, setEmail] = useState("")
  // aciveBlock: 4,
  // timesMoved:0,
  // coordinates: [2, 2],
  // board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  // message: "",
  // email: ""



// const setMessage = (message) => {
//   setState({
//     message: message
//   })
// }
const moveLeft = () => {
  setMessage("")
  if(activeBlock !== 0 && activeBlock !== 3 && activeBlock !== 6){
    setActiveBlock(activeBlock-1)
    setCoordinates({
      x: coordinates.x -1,
      y: coordinates.y
    })
    setTimesMoved(timesMoved +1)
  }
  else{
    setMessage("You can't go left")
  }
}
const moveRight = () => {
  setMessage("")
  if(activeBlock !== 2 && activeBlock !== 5 && activeBlock !== 8){
    setActiveBlock(activeBlock+1)
    setCoordinates({
      x: coordinates.x +1,
      y: coordinates.y
    })
    setTimesMoved(timesMoved +1)
  }
  else{
    setMessage("You can't go right")
  }
}

const moveUp = () => {
  setMessage("")
  if(activeBlock > 2){
    setActiveBlock(activeBlock-3)
    setCoordinates({
      x: coordinates.x ,
      y: coordinates.y -1
    })
    setTimesMoved(timesMoved +1)
  }
  else{
    setMessage("You can't go up")
  }
}

const moveDown = () => {
  setMessage("")
  if(activeBlock < 6){
    setActiveBlock(activeBlock + 3)
    setCoordinates({
      x: coordinates.x ,
      y: coordinates.y + 1
    })
    setTimesMoved(timesMoved +1)
  }
  else{
    setMessage("You can't go down")
  }
}

const reset = () => {
  setActiveBlock(4)
  setCoordinates({
    x: 2,
    y: 2
  })
  setTimesMoved(0)
  setMessage("")
  setEmail("")
}

// const prevTimesMoved = useRef()
// const prevActiveBlock = useRef()
// useEffect(() => {
//   prevTimesMoved.current = timesMoved
//   prevActiveBlock.current = activeBlock
//   if (prevActiveBlock.current !== activeBlock){
//     if  (prevTimesMoved.current === timesMoved){
//       setTimesMoved(timesMoved +1)
//     }
//   }
// }, [activeBlock])
// const componentDidUpdate(prevProps, prevState){
//    //also purposefully not using prevProps
  
// }

const submit = (e) =>{
  e.preventDefault()
  
  if(email === ""){
    setMessage( "Ouch: email is required")
  }
  else {
    axios.post("http://localhost:9000/api/result", {
      "x": coordinates.x, 
      "y": coordinates.y, 
      "steps": timesMoved, 
      "email": email
    })
    .then((res)=>{
      setMessage(res.data.message)
    })  
    .catch((err)=>{
      // setMessage( "Ouch: email must be a valid email")
      setMessage(err.response.data.message)
    })
    setEmail("")
  }
}
 
const emailChange = (e) =>{
  setEmail(e.target.value)
}
const { className } = props

return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coordinates.x}, {coordinates.y})</h3>
        {timesMoved === 1 
          ? <h3 id="steps">You moved {timesMoved} time</h3>
          : <h3 id="steps">You moved {timesMoved} times</h3>
        }
      </div>
      <div id="grid">
        {board.map((value)=>(
          
          <React.Fragment key={value}>
            {/* inline terinary opperator */}
            {value === activeBlock 
            ? <div id = {value} className = "square active" >B</div>
            : <div id = {value} className = "square" ></div>
            }

            {/* Inline If with Logical && Operator:
            {value === state.aciveBlock && <div id = {value} className = "square active" >B</div>}
            {value !== state.aciveBlock && <div id = {value} className = "square" ></div>} */}
          </React.Fragment>
        ))}
      </div>
      <div className="info" >
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick= {()=>moveLeft()}>LEFT</button>
        <button id="up" onClick= {()=>moveUp()}>UP</button>
        <button id="right" onClick= {()=>moveRight()}>RIGHT</button>
        <button id="down" onClick= {()=>moveDown()}>DOWN</button>
        <button id="reset" onClick = {()=>reset()}>reset</button>
      </div>
      <form onSubmit={submit}>
        <input id="email" type="email" name="email" value= {email} onChange= {emailChange} placeholder="type email"></input>
        <input id="submit" type="submit" ></input>
      </form>
    </div>
  )
}