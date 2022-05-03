import Head from 'next/head'
import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({children}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <div>
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
    <div className="px-6 w-full flex flex-wrap items-center justify-between">
      <div className="flex items-center">
        <button
          className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContentY"
          aria-controls="navbarSupportedContentY"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          
        </button>
      </div>
      <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
        <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
          <li className="nav-item">
            <Link href="/" passHref>
            <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Wreina</a>
            </Link>
          </li>

          <li className="nav-item">
          <Link href="/cart" passHref>
            <div className="flex space-x-2 justify-center">
              <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
              Cart
              <span className="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">{cart.cartItems.length}</span>
              </button>
            </div>
            </Link>
          </li>

          <li className="nav-item">
          <Link href="/login" passHref>
            <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Login</a>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
        <div>{children}</div>
        <footer className=" bg-gray-100 sticky top-[100vh] lg:text-left">
  

        <div className="text-center text-gray-700 p-4">
            © 2022 Copyright: 
            <a className="text-gray-800" href="#">Wreina Market</a>
        </div>
    </footer>
    </div>
  )
}
