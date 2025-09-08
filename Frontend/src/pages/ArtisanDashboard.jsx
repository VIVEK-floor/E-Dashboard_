import { useState, useEffect } from 'react';

const ArtisanDashboard = ({ user, logout }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Artisan Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user.email}</span>
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">My Products</h2>
          <div className="space-y-4">
            {products.filter(p => p.artisan === 'Sarah').map(product => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-medium">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium">Total Products</h3>
              <p className="text-2xl">2</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-medium">Monthly Sales</h3>
              <p className="text-2xl">$350</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;