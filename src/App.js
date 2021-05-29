import React, { useState } from 'react';
import { useStorageState } from 'react-storage-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import './custom.scss';

import Header from './components/Header';
import Home from './components/Home';


import List from './components/List';
import AddItemForm from './components/AddItemForm';
import Login from './components/Login';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [listItems, setListItems] = useStorageState(localStorage, `state-list-items`, []);

  const handleButtonClick = () => {
    setShowModal(true);
  }

  const handleHide = () => {
    setShowModal(false);
  }

  const addNewItem = (item) => {
    const updatedList = listItems.concat(item);
    setListItems(updatedList);
  }

  const deleteItem = (item) => {
    const index = listItems.indexOf(item);
    const updatedList = [...listItems];
    updatedList.splice(index, 1);
    setListItems(updatedList);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                listItems={listItems}
                deleteItem={deleteItem}
                showModal={showModal}
                addNewItem={addNewItem}
                handleButtonClick={handleButtonClick}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <Login />}
          />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
