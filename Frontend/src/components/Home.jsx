import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { FaShieldAlt, FaLock, FaBolt } from 'react-icons/fa';
import bankingImage from '../assets/9094591.jpg';
import features from '../assets/features.jpg';
import Footer from './Footer'; // Import the Footer component

function Home() {
  const navigate = useNavigate(); // Use useNavigate hook
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      // If logged in, redirect to dashboard
      navigate('/dashboard'); // Use navigate instead of history.push
    } else {
      // If not logged in, redirect to register
      navigate('/register'); // Use navigate instead of history.push
    }
  };

  return (
    <div className="home-page">
      <header className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">Welcome to BankSys</h1>
              <p className="lead">Manage your finances with ease and security</p>
              <button onClick={handleGetStartedClick} className="btn btn-light btn-lg mt-3">
                Get Started
              </button>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img src={bankingImage} alt="Banking illustration" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <FaShieldAlt className="text-primary mb-3" size={48} />
                  <h5 className="card-title">Secure Banking</h5>
                  <p className="card-text">Manage your accounts with state-of-the-art security measures.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <FaLock className="text-primary mb-3" size={48} />
                  <h5 className="card-title">Data Protection</h5>
                  <p className="card-text">Your financial data is protected with advanced encryption.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <FaBolt className="text-primary mb-3" size={48} />
                  <h5 className="card-title">Fast Transactions</h5>
                  <p className="card-text">Experience lightning-fast transactions and account updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold">Why Choose BankSys?</h2>
              <p className="lead">We offer cutting-edge banking solutions tailored to your needs.</p>
              <ul className="list-unstyled">
                <li className="mb-2"><FaShieldAlt className="text-primary me-2" /> Enhanced security features</li>
                <li className="mb-2"><FaLock className="text-primary me-2" /> 24/7 account monitoring</li>
                <li className="mb-2"><FaBolt className="text-primary me-2" /> Instant transfers between accounts</li>
              </ul>
              <Link to="/about" className="btn btn-primary mt-3">Learn More</Link>
            </div>
            <div className="col-md-6">
              <img src={features} alt="Banking features" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      <Footer /> {/* Include the Footer component here */}
    </div>
  );
}

export default Home;
