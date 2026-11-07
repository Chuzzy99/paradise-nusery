import { useState } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-shell">
      {showProducts ? (
        <ProductList onHomeClick={() => setShowProducts(false)} />
      ) : (
        <main className="landing-page">
          <header className="landing-nav">
            <a className="brand" href="#home" aria-label="Paradise Nursery home">
              <span className="brand-mark"><Leaf size={19} /></span>
              <span>paradise<span className="brand-light">nursery</span></span>
            </a>
            <span className="nav-note">A little more life, every day.</span>
          </header>
          <section className="landing-hero" id="home">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Houseplants, thoughtfully grown</p>
              <h1>Make room<br />for <em>green.</em></h1>
              <p className="hero-description">Bring a slower, softer kind of joy into your home with plants picked to thrive where you live.</p>
              <button className="button button-dark" onClick={() => setShowProducts(true)}>
                Get Started <ArrowRight size={17} />
              </button>
              <div className="hero-proof"><span className="proof-line" /> Carefully grown. Happily delivered.</div>
            </div>
            <div className="hero-image" role="img" aria-label="Sunlit collection of houseplants">
              <div className="image-caption"><span>01 / 03</span><span>Find your new favorite</span></div>
            </div>
            <div className="hero-side-note">GROW WELL, LIVE WELL</div>
          </section>
          <section className="about-band">
            <div className="about-label">OUR LITTLE CORNER</div>
            <AboutUs />
            <button className="text-link" onClick={() => setShowProducts(true)}>Meet the collection <ArrowRight size={16} /></button>
          </section>
          <footer className="site-footer"><span>Paradise Nursery</span><span>Rooted in good things.</span></footer>
        </main>
      )}
    </div>
  );
}

export default App;
