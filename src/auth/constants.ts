export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: 1000000, // 1.000.000 seconds = ~11.57 days
};
