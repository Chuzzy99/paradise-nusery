import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const cartTotal = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const changeQuantity = (item, amount) => {
    const quantity = item.quantity + amount;
    if (quantity < 1) dispatch(removeItem(item.id));
    else dispatch(updateQuantity({ id: item.id, quantity }));
  };

  return (
    <main className="cart-container">
      <header className="cart-heading"><p className="section-kicker">Your selection</p><h1>Shopping cart</h1><p>{totalCount} {totalCount === 1 ? 'plant' : 'plants'} ready for a new home</p></header>
      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon"><span aria-hidden="true">&#x1F331;</span></div>
          <h2>Your cart is ready to grow.</h2><p>Browse the collection and find a plant to bring home.</p>
          <button className="button button-dark" onClick={onContinueShopping}>Explore the plants <ArrowLeft size={15} /></button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-label="Cart items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3><p>Unit price: ${item.cost.toFixed(2)}</p>
                  <div className="quantity-controls" aria-label={`${item.name} quantity`}>
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item, -1)}><Minus size={13} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item, 1)}><Plus size={13} /></button>
                  </div>
                  <p className="line-total">Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
                </div>
                <button className="delete-btn" aria-label={`Remove ${item.name}`} onClick={() => dispatch(removeItem(item.id))}><Trash2 size={16} /></button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Order summary</h2>
            <div className="summary-line"><span>Plants ({totalCount})</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Complimentary</span></div>
            <div className="summary-line total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
            <button className="button button-dark checkout-button" onClick={() => setCheckoutMessage('Checkout is coming soon. Your plants are saved in your cart.')}>Continue to checkout <ArrowLeft size={15} /></button>
            {checkoutMessage && <p className="checkout-notice" role="status">{checkoutMessage}</p>}
            <button className="continue-button" onClick={onContinueShopping}><ArrowLeft size={14} /> Continue shopping</button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartItem;