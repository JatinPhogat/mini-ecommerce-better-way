import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => setProducts(data.products));
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
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
              <option value="">Sort</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
            <button onClick={() => { setSearch(''); setCategory('all'); setSort(''); }}>Clear</button>
          </div>

          <ProductList products={filtered} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
