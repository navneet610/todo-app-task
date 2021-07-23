import React from 'react';
import './App.css';
import ListItems from './ListItems';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from'@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:window.localStorage.getItem('items') ? JSON.parse(window.localStorage.getItem('items')) : [],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem= this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
   handleInput(e){
     this.setState({
       currentItem:{
         text: e.target.value,
         key:Date.now()
       }
     })
   }
   addItem(e){
     e.preventDefault();
     
       const newItem=this.state.currentItem;
       if(newItem.text !==""){
         const Items=[...this.state.items, newItem];
           this.setState({
           items:Items,
           currentItem:{
             text:"",
             key:""
           }
         })
         localStorage.setItem('items',JSON.stringify(Items))
       }
   }
   deleteItem(key){
     const filteredItems = this.state.items.filter(item =>
     item.key!==key );
     this.setState({
     items:filteredItems
     })
   }

   setUpdate(text,key){

    console.log("items:"+this.state.items);

    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
  }

  render(){
    
    console.log(localStorage.getItem("items"))
  return (
    <div className="App">
      <header>
        <form id="todoform" onSubmit={this.addItem}>
           <input type="text" placeholder="enter text"
             value={this.state.currentItem.text}
             onChange={this.handleInput}/>
           <button type="submit" >Add</button>
        </form>
        <p>{this.state.items.text}</p>
      
       <ListItems items = {this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}>
       </ListItems>
       </header>
    </div>
  );
}
}
export default App;
