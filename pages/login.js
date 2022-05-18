import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';



export default function Login() {

  
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      //alert('succss login');
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response=await axios.post('/api/users/login', {
  //       email,
  //       password,
  //     });
  //     // console.log(response)
  //     return response.data && alert('succss login');
  //   } catch (err) {
  //     alert(err.response.data ? err.response.data.message : err.message);
  //   }
  // };
  

  return (
    <Layout title="Login">
        <div className="px-6 h-full text-gray-800">
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
      <form onSubmit={submitHandler}>
        
        <ul>
          <li>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Email address"
              inputProps={{ type: 'email'}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          </li>

          <li>
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              placeholder="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          </li>
          
          <div className="text-center lg:text-left">
          
          <li>
            <button className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
              Login
            </button>
            </li>
            </div>
          <li>
            Dont have an account? &nbsp;
            <Link href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </Link>
          </li>
        </ul>
      </form>
      </div>
      </div>
    </Layout>
  )
}
