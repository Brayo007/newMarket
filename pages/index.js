import { PrismaClient } from "@prisma/client";
import Image from 'next/image'
import Layout from '../components/Layout';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';

import Link from 'next/link';

const prisma = new PrismaClient();


export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const products = props.products;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x[0].f2 === product.f2);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product[0].f2}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">products on sale</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.f5} className="group relative">

                <Link href={`/product/${product.f2}`} passHref>
                  <div>
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <Image
                        src={product.f7}
                        alt={product.f5}
                        width={500}
                        height={500}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>



                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.f5}
                          </a>
                        </h3>

                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.f8}</p>

                    </div>
                  </div>
                </Link>


                <button onClick={() => addToCartHandler(product)}>Add to cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {

  const type = 'common';
  const sp_cat = 2;

  const allProducts = await prisma.$queryRaw`CALL select_products(${type}, ${sp_cat})`;
  return {
    props: {
      products: allProducts,
    },
  };
}
