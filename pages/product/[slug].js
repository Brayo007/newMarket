import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../lib/prisma';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const { product } = props;
  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product[0].f2}`);
    console.log('Heey');
    console.log(data);
    console.log('Yooo');

    if (data.f8 <= 0) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };


  return (
    <Layout title={product[0].f5} description={product[0].f4}>
      <Link href={`/`} passHref>
        <p>Back to products</p>
      </Link>

      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <Image
            src={product[0].f7}
            alt={product[0].f5}
            width={500}
            height={500}

            className="rounded-t-lg md:rounded-none md:rounded-l-lg"
          >
          </Image>


          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{product[0].f5}</h5>
            <ul>
              <li>
                <p className="text-gray-700 text-base mb-4">
                  Category: {product[0].f0}
                </p>
              </li>

              <li>
                <p className="text-gray-700 text-base mb-4">
                  Description: {product[0].f4}
                </p>
              </li>

              <li>
                <p className="text-gray-700 text-base mb-4">
                  Rating: reviews
                </p>
              </li>

              <li>
                <p className="text-gray-700 text-base mb-4">
                  Rating:  reviews
                </p>
              </li>
              <li>
                <p>Price</p>
                <p className="text-gray-600 text-base mb-4">Ksh{product[0].f8}</p>
              </li>

              <li>
                <p>Status</p>
                <p className="text-gray-600 text-xs">{product[0].f9 > 0 ? 'In stock' : 'Unavailable'}</p>
              </li>
              <li>
                <button onClick={addToCartHandler}>
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>



    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const type = 'common';
  const sp_cat = 2;
  const dog = slug.slice(1);
  console.log(dog);


  const product = await prisma.$queryRaw`CALL select_single_product(${type}, ${sp_cat}, ${dog})`;
  return {
    props: {
      product,
    },
  };
}