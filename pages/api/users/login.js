import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc();

handler.post(async (req, res) => {
  //const theEmail = req.body.email

  const user = await prisma.customers.findMany({
    where: {
      email: req.body.email,
    },
  });
  console.log(user[0])
  if (user[0] && bcrypt.compareSync(req.body.password, user[0].password)) {
    console.log(user[0].password)
    console.log(req.body.password)
    const token = signToken(user);
    res.send({
      token,
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      user_type: user.user_type,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});
// console.log(user);


export default handler;