import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';


export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  // const [first_name, setFirstName] = useState('');
  // const [last_name, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  //const classes = useStyles();

  const submitHandler = async ({ first_name, last_name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        first_name,
        last_name,
        email,
        password,
      });
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

  return (
    <Layout>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">

              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (

                  <input type="text" className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white 
                focus:border-blue-600 focus:outline-none"
                    id="exampleInput123"
                    aria-describedby="emailHelp123"
                    placeholder="First name"
                    inputProps={{ type: 'first_name' }}
                    error={Boolean(errors.first_name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  />
                )}
              ></Controller>


            </div>
            <div className="form-group mb-6">
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <input type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white 
          focus:border-blue-600 focus:outline-none"
                    id="exampleInput124"
                    aria-describedby="emailHelp124"
                    placeholder="Last name"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.last_name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                    }
                    {...field} />
                )}
              ></Controller>
            </div>
          </div>
          <div className="form-group mb-6">

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <input type="email" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white 
        focus:border-blue-600 focus:outline-none"
                  id="exampleInput125"
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
                  {...field} />
              )}
            ></Controller>
          </div>
          <div className="form-group mb-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <input type="password" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white 
        focus:border-blue-600 focus:outline-none"
                  id="exampleInput126"
                  placeholder="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field} />
              )}
            ></Controller>
          </div>

          <div className="form-group mb-6">
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <input type="password" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white 
        focus:border-blue-600 focus:outline-none"
                  id="exampleInput126"
                  placeholder="confirm Password"
                  inputProps={{ type: 'password' }}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length is more than 5'
                        : 'Confirm  Password is required'
                      : ''
                  }
                  {...field} />
              )}
            ></Controller>
          </div>
          <div className="form-group form-check text-center mb-6">
            <input type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              id="exampleCheck25" checked />
            <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck25">Subscribe to our newsletter</label>
          </div>
          <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Register</button>
          <p>Already have an account? &nbsp;</p>
          <Link href={`/login?redirect=${redirect || '/'}`} passHref>
            <p>Login</p>
          </Link>
        </form>
      </div>

    </Layout>
  )
}
