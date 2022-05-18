import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        user_type: user.user_type,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export { signToken };