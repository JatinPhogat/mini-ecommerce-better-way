function ProductCard({ product, addToCart }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', background: 'white', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{product.title}</h3>
      <p style={{ color: '#666', fontSize: '14px', margin: '4px 0' }}>{product.category}</p>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff', margin: '8px 0' }}>${product.price}</p>
      <p style={{ fontSize: '14px', color: product.stock > 0 ? 'green' : 'red', margin: '8px 0' }}>
        {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
      </p>
      <button onClick={() => addToCart(product)} disabled={product.stock === 0} style={{ width: '100%' }}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
