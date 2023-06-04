import { Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

const Home = () => {
  return (
    <>
      <div className="relative">
        <img src="hero.jpg" alt="Hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-white text-xl">Discover Amazing Products</p>
          <Link
            to="/products"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-6 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container my-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <ShoppingCart fontSize="large" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Free Shipping</h2>
            <p className="text-gray-600">
              Enjoy free shipping on all orders over $50.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <ShoppingCart fontSize="large" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              24/7 Customer Support
            </h2>
            <p className="text-gray-600">
              Our customer support team is available 24/7 to assist you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <ShoppingCart fontSize="large" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Easy Returns</h2>
            <p className="text-gray-600">
              We offer hassle-free returns within 30 days of purchase.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
