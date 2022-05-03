import nc from 'next-connect';
import prisma from '../../../lib/prisma';

const handler = nc();

handler.get(async (req, res) => {
  //await db.connect();


  const bidhaa = req.query.id;
  console.log(bidhaa);
  const type = 'common';
  const sp_cat =2;
  const dog=bidhaa.slice(1);
  console.log(dog);

  const product = await prisma.$queryRaw`CALL select_single_product(${type}, ${sp_cat}, ${dog})`;
  //await db.disconnect();
  res.send(product);
});

export default handler;