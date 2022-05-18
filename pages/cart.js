import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';

import axios from 'axios';
import { useRouter } from 'next/router';

function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item[0].f2}`);
        if (data[0].f8 < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
      };
      const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      };
      const checkoutHandler = () => {
        router.push('/shipping');
      };


  return (
    <Layout title="Shopping Cart">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            Cart is empty.{' '}
          <Link href="/" passHref>
            <Link>Go shopping</Link>
          </Link>
          </div>
        ) : (
          <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Quantity
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Action
              </th>
              
              
              
            </tr>
          </thead>
          <tbody>
          {cartItems.map((item) => (
            <tr key={item[0].f2} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <Link href={`/product/${item[0].f2}`} passHref>
                          <Link>
                          <Image
                              src={item[0].f7}
                              alt={item[0].f5}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link href={`/product/${item[0].f2}`} passHref>
              {item[0].f5}
              </Link>
              
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              

                <div className="flex space-x-2 justify-center">
                <div>
    
                  <h4 value = {item.quantity} onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          } className="text-2xl font-medium leading-tight text-gray-800 mb-2.5">
                  {[...Array(item.countInStock).keys()].map((x) => (
                  <span key={x + 1} value={x + 1} className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                  {x + 1}
                  </span>
                  ))}
                </h4>
    
              </div>
              </div>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {item[0].f7}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button onClick={() => removeItemHandler(item)}>X</button>
              </td>
              
              
            </tr>
            
            
          ))}</tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : Ksh 
                    {cartItems.reduce((a, c) => a + c.quantity * c[0].f9, 0)}
                    </h5>

    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={checkoutHandler}>
      Check-out
    </button>
  </div>
</div>
</div>
        )}

      
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
