import nc from 'next-connect';
import bcrypt from 'bcryptjs';

import { signToken } from '../../../utils/auth';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc();


handler.post(async (req, res) => {
  const user = await prisma.customers.create({
    data: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      user_type: 'buyer',
      address1: 'nairobi',
      city: 'Nairobi',
      state: 'N',
      phone: '0722123456',
      date_created: '2022-05-05T16:14:20.000Z',
    },
  });

  //console.log(customer);

  const token = signToken(user);
  res.send({
    token,
    id: user.id,
    first_name: user.first_name,
    email: user.email,
    user_type: user.user_type,
    adress1: user.address1,
    city: user.city,
    state: user.state,
    phone: user.phone,
    date_created: user.date_created,

  });
})

export default handler;