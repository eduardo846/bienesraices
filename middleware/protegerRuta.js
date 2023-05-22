const protegerRuta = async (req, res, next) => {
  console.log("Desde el Middleware");
  next();
};
export default protegerRuta;
