import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Leaf, Plus, ShoppingBag } from 'lucide-react';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=82`;
const categories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Sculptural leaves, wonderfully low-fuss.', cost: 24, image: photo('photo-1501004318641-b39e6451bec6') },
      { name: 'Spider Plant', description: 'An easygoing favorite with arching leaves.', cost: 18, image: photo('photo-1497250681960-ef046c08a56e') },
      { name: 'Peace Lily', description: 'Glossy foliage with elegant white blooms.', cost: 29, image: photo('photo-1593691509543-c55fb32e5cee') },
      { name: 'Boston Fern', description: 'A lush, leafy classic for softer corners.', cost: 22, image: photo('photo-1509423350716-97f9360b4e09') },
      { name: 'Rubber Plant', description: 'Bold, dark leaves make a quiet statement.', cost: 34, image: photo('photo-1485955900006-10f4d324d411') },
      { name: 'Aloe Vera', description: 'Sun-loving succulent with soothing gel.', cost: 16, image: photo('photo-1501004318641-b39e6451bec6') },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', description: 'Fragrant purple blooms for a calm corner.', cost: 20, image: photo('photo-1499002238440-d264edd596ec') },
      { name: 'Jasmine', description: 'Sweet-scented flowers that love the light.', cost: 26, image: photo('photo-1497250681960-ef046c08a56e') },
      { name: 'Rosemary', description: 'A fresh, fragrant herb for your kitchen.', cost: 14, image: photo('photo-1501004318641-b39e6451bec6') },
      { name: 'Mint', description: 'Bright, refreshing leaves for pots and tea.', cost: 12, image: photo('photo-1497250681960-ef046c08a56e') },
      { name: 'Lemon Balm', description: 'Soft citrus fragrance, easy to grow.', cost: 15, image: photo('photo-1509423350716-97f9360b4e09') },
      { name: 'Sweet Basil', description: 'A sunny kitchen staple with lovely aroma.', cost: 13, image: photo('photo-1501004318641-b39e6451bec6') },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', description: 'Glossy, upright leaves that take it easy.', cost: 28, image: photo('photo-1485955900006-10f4d324d411') },
      { name: 'Golden Pothos', description: 'Trailing golden leaves for shelves and stands.', cost: 19, image: photo('photo-1497250681960-ef046c08a56e') },
      { name: 'Cast Iron Plant', description: 'Tough, handsome foliage for shady spots.', cost: 32, image: photo('photo-1509423350716-97f9360b4e09') },
      { name: 'Jade Plant', description: 'A compact succulent with rounded leaves.', cost: 17, image: photo('photo-1501004318641-b39e6451bec6') },
      { name: 'Succulent Trio', description: 'Three sculptural plants, ready to display.', cost: 25, image: photo('photo-1485955900006-10f4d324d411') },
      { name: 'Desert Cactus', description: 'A sun-loving little character for your sill.', cost: 14, image: photo('photo-1501004318641-b39e6451bec6') },
    ],
  },
].map((section) => ({
  ...section,
  plants: section.plants.map((plant) => ({ ...plant, id: plant.name.toLowerCase().replaceAll(' ', '-') })),
}));

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isAdded = (id) => items.some((item) => item.id === id);

  return (
    <main className="shop">
      <nav className="navbar" aria-label="Main navigation">
        <button className="nav-brand" onClick={onHomeClick}><Leaf size={18} /> Paradise Nursery</button>
        <div className="nav-links">
          <button className={`nav-link ${!showCart ? 'active' : ''}`} onClick={() => setShowCart(false)}>Plants</button>
          <button className={`nav-link ${showCart ? 'active' : ''}`} onClick={() => setShowCart(true)}>Cart</button>
          <button className="cart-nav" aria-label={`Open cart, ${totalCount} items`} onClick={() => setShowCart(true)}>
            <ShoppingBag size={18} />{totalCount > 0 && <span className="cart-count">{totalCount}</span>}
          </button>
        </div>
      </nav>
      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <>
          <header className="catalog-heading">
            <div><p className="section-kicker">The plant shop</p><h1>Find your kind of green.</h1></div>
            <p className="catalog-intro">Thoughtful plants for the spaces you call home.</p>
          </header>
          <div className="catalog-content">
            {categories.map((section) => (
              <section className="category-section" key={section.category}>
                <h2 className="category-title">{section.category}<span>{String(section.plants.length).padStart(2, '0')} plants</span></h2>
                <div className="product-grid">
                  {section.plants.map((plant) => {
                    const added = isAdded(plant.id);
                    return (
                      <article className="product-card" key={plant.id}>
                        <div className="product-image-wrap"><img src={plant.image} alt={plant.name} loading="lazy" /></div>
                        <div className="product-card-body">
                          <h3>{plant.name}</h3><p>{plant.description}</p>
                          <div className="product-price-row">
                            <span className="product-price">${plant.cost.toFixed(2)}</span>
                            <button className="add-button" disabled={added} onClick={() => dispatch(addItem(plant))}>
                              {added ? <><Check size={13} /> Added</> : <><Plus size={13} /> Add to cart</>}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
      <footer className="site-footer"><span>Paradise Nursery</span><span>Rooted in good things.</span></footer>
    </main>
  );
}

export default ProductList;