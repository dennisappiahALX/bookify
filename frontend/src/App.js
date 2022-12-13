import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import ProtectedRoute from './components/common/protectedRoute';
import {ToastContainer} from 'react-toastify'
import Books from './components/books';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound'
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import BookForm from './components/booksForm';
import LogOut from './components/logout';
import { getCurrentUser } from './services/authService';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';



// getting current user implementation
class App extends Component {
  state = {} 

  componentDidMount() {
    const user = getCurrentUser();

    this.setState({user})
  }

  render() { 
    const {user} = this.state;

    return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user}/>
      <main className="container">
      <Switch>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/logout" component={LogOut}></Route>
        <ProtectedRoute path="/books/:id" component={BookForm} />
        <Route path="/books" render={props => <Books {...props} user={this.state.user}/>}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from='/' exact to="/books"/>
        <Redirect  to="/not-found"/>
      </Switch>
    </main>
    </React.Fragment>);
  }
}
 
export default App;



