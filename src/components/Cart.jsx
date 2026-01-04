function Cart({ cart, removeFromCart, updateQuantity }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ width: '300px', border: '1px solid #ddd', padding: '15px', background: 'white', borderRadius: '8px' }}>
      <h2 style={{ margin: '0 0 15px 0' }}>Cart</h2>
      <p style={{ margin: '5px 0' }}>Items: <strong>{totalItems}</strong></p>
      <p style={{ margin: '5px 0', fontSize: '18px' }}>Total: <strong>${total.toFixed(2)}</strong></p>
      <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
      {cart.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        cart.map(item => (
          <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>{item.title}</strong></p>
            <p style={{ margin: '5px 0', color: '#007bff' }}>${item.price}</p>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '8px' }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '4px 10px' }}>-</button>
              <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '4px 10px' }}>+</button>
              <button onClick={() => removeFromCart(item.id)} style={{ background: '#dc3545', marginLeft: '10px' }}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
