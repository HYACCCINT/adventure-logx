import './styles/App.css';
import Cards from './components/Cards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"

function App() {
	return (
		<div className="App h-screen">
			<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path="/" component={Dashboard} />
					<Route path="/signup" component={Signup} />
              		<Route path="/login" component={Login} />
					<Route path="/:slug">
						<Cards />
					</Route>
				</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
