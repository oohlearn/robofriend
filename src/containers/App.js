import React , {Component} from 'react';
import Cardist from '../components/CardList';
// import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: '' 
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({ robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}

	render() {
		const {robots, searchfield} = this.state; /*因為後面有重複多次this.state，所以設成常數*/
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return (!robots.length)?   /*等同於長度===0(沒有長度)*/
		<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<Cardist robots={filteredRobots}/>
				</Scroll>
			</div>
		);
	}	
}	

export default App;