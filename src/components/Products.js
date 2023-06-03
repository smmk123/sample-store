import axios from '../api/axios';
import useAxios from '../hooks/useAxios';

import Card from './productCard';

export default function Products() {
  const [products, error, loading, axiosFetch] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/v1/products',
    requestConfig: {
      headers: {
        'Content-Language': 'en-US',
        //'Accept': 'text/html'
      },
    },
  });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products && products.results ? (
          <>
            {products.results.map((product) => (
              <Card
                id={product.id}
                pictureUrl={product.pictureURL}
                name={product.name}
                price={product.price}
                description={product.description}
                inStock={product.stock}
                key={product.id}
              />
            ))}
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
}
