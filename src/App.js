import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'; 


class App extends Component {
	constructor() {
		super();
		this.state = {
			taskname: '',
			date: '',
			notes: '' ,
			items: [] // hold all of  items that are currently being tracked inside of our Firebase database
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	handleSubmit(e){
		e.preventDefault();
		const itemsRef=firebase.database().ref('items'); //by calling the ref method and passing in the destination
		const item = { //we grab the item the user typed in  from the state and package it into an object so we ship it off to our Firebase database
			taskname: this.state.taskname,
			date: this.state.date,
			notes: this.state.notes
		}
		itemsRef.push(item); //copy of our object so that it can be stored in Firebase
		this.setState({ //we can clear out the inputs so that an additional item can be added
			taskname: '',
			date: '',
			notes: ''
		});
	}

	
	
	componentDidMount(){
		 const itemsRef = firebase.database().ref('items');
		itemsRef.on('value', (snapshot) => {
			let items = snapshot.val();
			let newState = [];
			for (let item in items){
				
				newState.push({
					id:item,
					taskname: items[item].taskname,
					date: items[item].date,
					notes: items[item].notes
				});
			}
			this.setState({
				items: newState
			});
		});
	}
	removeItem(itemId) {
		const itemRef = firebase.database().ref(`/items/${itemId}`);
		itemRef.remove();
	}
	
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>To-Do List</h1>
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="taskname" placeholder="What's your task?" onChange={this.handleChange} value={this.state.taskname}  />
                <input type="date" name="date" min="2017-08-01" max="2020-08-15" placeholder="When is the deadline?" onChange={this.handleChange} value={this.state.date} />
				<input type="text" name="notes" placeholder="Details of the task!" onChange={this.handleChange} value={this.state.notes} />
                <button>Add Task</button>
              </form>
          </section>
		 </div>
		 <div className='container'>
           <section className='display-item'>
            <div className='wrapper'>
              <ul>
				{this.state.items.map((item) => {
					return (
                      <li key={item.id}>
						<h3>{item.taskname}</h3>
						<h4> Deadline till: {item.date}</h4>
						<p> <strong>Notes:</strong> {item.notes}</p>
						<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
						</li>
					)
				})}	
              </ul>
            </div>
           </section>
        </div>
      </div>
    );
  }
}
export default App;