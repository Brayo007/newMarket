import nc from 'next-connect';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const handler = nc();

handler.get(async (req, res) => {

    const type = 'common';
    const sp_cat =2;

  //await db.connect();
  const products = await prisma.$queryRaw`CALL select_products(${type}, ${sp_cat})`;
  //await db.disconnect();
  res.send(products);
});

export default handler;

// export async function getServerSideProps() {
  
//     const type = 'common';
//     const sp_cat =2;
  
//     const allProducts = await prisma.$queryRaw `CALL select_products(${type}, ${sp_cat})`;
//     return {
//       props: {
//         products: allProducts,
//       },
//     };
//   }