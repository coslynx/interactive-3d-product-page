import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Header, MinimalLayout, Footer } from "./components/layout";
import { LandingHero } from './components/sections';
import './index.css';

const App = () => {

  return (
    <Router>
      <MinimalLayout>
        <Suspense fallback={<div>Loading header...</div>}>
          <Header />
        </Suspense>
        <Suspense fallback={<div>Loading Hero...</div>}>
        <LandingHero title="Engaging 3D Experience" description="Immersive visualizations for potential customers." ctaText="Learn More" />
        </Suspense>
        <main>
          <Routes>
            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}>
            <div>3D coming soon</div>
              </Suspense>} />
          </Routes>
        </main>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </MinimalLayout>
    </Router>
  );
};

export default App;