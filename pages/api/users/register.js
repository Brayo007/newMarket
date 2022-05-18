import nc from 'next-connect';
import bcrypt from 'bcryptjs';

import { signToken } from '../../../utils/auth';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc();


handler.post(async(req, res)=>{
    const customer = await prisma.customers.create ({
        first_name: req.body.name,
        last_name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        user_type: 'buyer',
        address1: req.body.adress1,
        city:'Nairobi',
        state: 'N',
        phone:'0722123456',
        date_created:'2022-05-05T16:14:20.000Z',
      });

      const token = signToken(customer);
  res.send({
    token,
    id: customer.id,
    first_name: customer.first_name,
    email: customer.email,
    user_type: customer.user_type,
    adress1: customer.address1,
    city: customer.city,
    state: customer.state,
    phone: customer.phone,
    date_created: customer.date_created,

});
})

export default handler;