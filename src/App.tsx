import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Satellite } from './pages/Satellite';
import { Laboratory } from './pages/Laboratory';
import { Events } from './pages/Events';
import { Team } from './pages/Team';
import { ContactPage } from './pages/ContactPage'; // Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/satellite" element={<Satellite />} />
      <Route path="/laboratory" element={<Laboratory />} />
      <Route path="/events" element={<Events />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<ContactPage />} /> {/* Add route for ContactPage */}
    </Routes>
  );
}

export default App;
