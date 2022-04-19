import React from 'react'
import {render, screen} from "@testing-library/react"
import axios from 'axios'

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state= {
      aciveBlock: 4,
      timesMoved:0,
      coordinates: {x:2, y:2},
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      message: "",
      email: ""
    }
  }
  
  setMessage = (message) => {
    this.setState({
      message: message
    })
  }
  moveLeft = () => {
    const activeBlock = this.state.aciveBlock
    this.setMessage("")
    if(activeBlock !== 0 && activeBlock !== 3 && activeBlock !== 6){
      this.setState({
         aciveBlock: activeBlock - 1,
         coordinates: {
          x: this.state.coordinates.x -1,
          y: this.state.coordinates.y
        } 
      })
    }
    else{
      this.setMessage("You can't go left")
    }
  }

  moveRight = () => {
    const activeBlock = this.state.aciveBlock
    this.setMessage("")
    if(activeBlock !== 2 && activeBlock !== 5 && activeBlock !== 8){
      this.setState({
         aciveBlock: activeBlock + 1,
         coordinates: {
          x: this.state.coordinates.x +1,
          y: this.state.coordinates.y
        } 
      })
    }
    else{
      this.setMessage("You can't go right")
    }
  }

  moveUp = () => {
    const activeBlock = this.state.aciveBlock
    this.setMessage("")
    if(activeBlock > 2){
      this.setState({
         aciveBlock: activeBlock - 3,
         coordinates: {
          x: this.state.coordinates.x,
          y: this.state.coordinates.y -1,
        } 
      })
    }
    else{
      this.setMessage("You can't go up")
    }
  }
  
  moveDown = () => {
    const activeBlock = this.state.aciveBlock
    this.setMessage("")
    if(activeBlock < 6){
      this.setState({
         aciveBlock: activeBlock + 3,
         coordinates: {
           x: this.state.coordinates.x,
           y: this.state.coordinates.y +1,
         } 
      })
    }
    else{
      this.setMessage("You can't go down")
    }
  }
  
  reset = () => {
    this.setState({
      aciveBlock: 4,
      timesMoved: 0,
      coordinates: {
        x: 2,
        y: 2,
      },
      email: "",
      message:""
    })
  }

  componentDidUpdate(prevProps, prevState){
     //also purposefully not using prevProps
    if (prevState.aciveBlock !== this.state.aciveBlock){
      if  (prevState.timesMoved === this.state.timesMoved)
      this.setState({
        timesMoved: this.state.timesMoved +1,
      })
    }
  }

  submit = (e) =>{
    e.preventDefault()
    const {coordinates, timesMoved, email} = this.state
    if(this.state.email === ""){
      this.setState({
        message: "Ouch: email is required"
      })
    }
    else {
      axios.post("http://localhost:9000/api/result", {
        "x": coordinates.x, 
        "y": coordinates.y, 
        "steps": timesMoved, 
        "email": email
      })
      .then((res)=>{
        this.setState({
          message: res.data.message
        })
      })
      .catch((err)=>{ 
        this.setState({
          message:  err.response.data.message
        })
      })
    }
    this.setState({
      email:""
    })
  }
   
   emailChange = (e) =>{
    this.setState({
      email: e.target.value
    })
  }
  
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinates.x}, {this.state.coordinates.y})</h3>
          {this.state.timesMoved === 1 
            ? <h3 id="steps">You moved {this.state.timesMoved} time</h3>
            : <h3 id="steps">You moved {this.state.timesMoved} times</h3>
          }
        </div>
        <div id="grid">
          {this.state.board.map((value)=>(
            
            <React.Fragment key={value}>
              {/* inline terinary opperator */}
              {value === this.state.aciveBlock 
              ? <div id = {value} className = "square active" >B</div>
              : <div id = {value} className = "square" ></div>
              }

              {/* Inline If with Logical && Operator:
              {value === this.state.aciveBlock && <div id = {value} className = "square active" >B</div>}
              {value !== this.state.aciveBlock && <div id = {value} className = "square" ></div>} */}
            </React.Fragment>
          ))}
        </div>
        <div className="info" >
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick= {this.moveLeft}>LEFT</button>
          <button id="up" onClick= {this.moveUp}>UP</button>
          <button id="right" onClick= {this.moveRight}>RIGHT</button>
          <button id="down" onClick= {this.moveDown}>DOWN</button>
          <button id="reset" onClick = {this.reset}>reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input id="email" type="email" name="email" value= {this.state.email} onChange= {this.emailChange} placeholder="type email"></input>
          <input id="submit" type="submit" ></input>
        </form>
      </div>
    )
  }
}
