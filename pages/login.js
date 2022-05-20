import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';




export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();

    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      //alert('succss login');
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
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
          <form onSubmit={handleSubmit(submitHandler)}>

            <ul>
              <li>
                <div className="mb-6">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="email"
                        placeholder="Email address"
                        inputProps={{ type: 'email' }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === 'pattern'
                              ? 'Email is not valid'
                              : 'Email is required'
                            : ''
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
                </div>
              </li>

              <li>
                <div className="mb-6">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 6,


                    }}
                    render={({ field }) => (
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="Password"
                        inputProps={{ type: 'password' }}

                        helperText={
                          errors.password
                            ? errors.password.type === 'minLength'
                              ? 'Password length is more than 5'
                              : 'Password is required'
                            : ''
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
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
