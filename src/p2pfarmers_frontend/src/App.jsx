// src/App.jsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import createBrowserRouter and RouterProvider
import Landing from './components/Landing';
import UserForm from './components/UserForm';
import AgentForm from './components/AgentForm';
// import Simple from './components/Products';
import ProductList from './components/ProductList';
import UserType from './components/UserType';
import AddFarmer from './components/RegisterFarmer';

// Create the router with path-to-component mappings
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />, // Route for the Landing page
  },
  {
    path: '/registeruser',
    element: <UserForm />, 
  },
  {
    path: '/registeragent',
    element: <AgentForm />, 
  },
  {
    path: '/addfarmer',
    element: <AddFarmer />, 
  },

  {
    path: '/usertype',
    element: <UserType />, 
  },
  {
    path: '/productlist',
    element: <ProductList />, 
  },
  
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} /> {/* Use RouterProvider with the created router */}
    </ChakraProvider>
  );
}

export default App;
