import React from 'react'
import {render, screen} from "@testing-library/react"

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state= {
      aciveBlock: 4,
      timesMoved:0,
      coordinates: {x:2, y:2},
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  }

  move = (e) =>{
    const activeBlock = this.state.aciveBlock
    switch (e.target.id){
      case "left":
      
       if(activeBlock !== 0 && activeBlock !== 3 && activeBlock !== 6){
        this.setState({
           aciveBlock: activeBlock - 1,
           coordinates: {
            x: this.state.coordinates.x -1,
            y: this.state.coordinates.y
          } 
        })
      }
       break
      case "right":
        if(activeBlock !== 2 && activeBlock !== 5 && activeBlock !== 8){
          this.setState({
             aciveBlock: activeBlock + 1,
             coordinates: {
              x: this.state.coordinates.x +1,
              y: this.state.coordinates.y
            } 
          })
        }
        break
      case "up":
        if(activeBlock > 2){
          this.setState({
             aciveBlock: activeBlock - 3,
             coordinates: {
              x: this.state.coordinates.x,
              y: this.state.coordinates.y -1,
            } 
          })
        }
        break
      case "down":
        if(activeBlock < 6){
          this.setState({
             aciveBlock: activeBlock + 3,
             coordinates: {
               x: this.state.coordinates.x,
               y: this.state.coordinates.y +1,
             } 
          })
        }
        break
      case "reset":
        
          this.setState({
            aciveBlock: 4,
            timesMoved: 0,
            coordinates: {
              x: 2,
              y: 2,
            } 
          })
        
        break
      default:
          console.log("error: what button did you even click?")
    }
    
    
   }
   componentDidUpdate(prevProps, prevState){
     //also purposefully not using prevProps
    if (prevState.aciveBlock != this.state.aciveBlock){
      if  (prevState.timesMoved === this.state.timesMoved)
      this.setState({
        timesMoved: this.state.timesMoved +1,
        
      })
    }
   }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinates.x}, {this.state.coordinates.y})</h3>
          <h3 id="steps">You moved {this.state.timesMoved} times</h3>
        </div>
        <div id="grid">
          {this.state.board.map((value)=>(
            
            <React.Fragment key={value}>
              {value === this.state.aciveBlock && <div id = {value} className = "square active" >B</div>}
              {value !== this.state.aciveBlock && <div id = {value} className = "square" ></div>}
            </React.Fragment>
          ))}
          {/* <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div> */}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick= {this.move}>LEFT</button>
          <button id="up" onClick= {this.move}>UP</button>
          <button id="right" onClick= {this.move}>RIGHT</button>
          <button id="down" onClick= {this.move}>DOWN</button>
          <button id="reset" onClick = {this.move}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
