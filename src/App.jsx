import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  let filtered = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'all' || p.category === category);

  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const updateQuantity = (id, qty) => {
    const product = products.find(p => p.id === id);
    if (qty < 1 || qty > product.stock) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  if (loading) {
    return (
      <div>
        <h1>Mini E-commerce</h1>
        <p style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Mini E-commerce</h1>
        <p style={{ textAlign: 'center', padding: '40px', color: 'red', fontSize: '18px' }}>Error: {error}. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Mini E-commerce</h1>

      <div style={{ display: 'flex', gap: '20px', padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ order: 1 }}>
          <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        </div>

        <div style={{ flex: 1, order: 2 }}>
          <div style={{ marginBottom: '20px', background: 'white', padding: '15px', borderRadius: '8px' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
              <option value="">Default</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
            <button onClick={() => { setSearch(''); setCategory('all'); setSort(''); }}>Clear Filters</button>
          </div>

          <ProductList products={filtered} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
