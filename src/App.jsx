import { useState, useEffect } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import StatsBar from './components/StatsBar';
import BloodGroupFilter from './components/BloodGroupFilter';
import SearchBar from './components/SearchBar';
import DonorList from './components/DonorList';
import LoadingSpinner from './components/LoadingSpinner';
import NoDonorsFound from './components/NoDonorsFound';

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'];

function mapUserToDonor(user) {
  const bloodGroup = BLOOD_GROUPS[user.id % BLOOD_GROUPS.length];
  const available = user.id % 3 !== 0;
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    city: user.address.city,
    bloodGroup,
    available,
  };
}

function App() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [citySearch, setCitySearch] = useState('');
  const [requestStatus, setRequestStatus] = useState({});

  useEffect(() => {
    async function fetchDonors() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        const mappedDonors = users.map(mapUserToDonor);
        setDonors(mappedDonors);
      } catch (err) {
        setError('Failed to load donors. Please check your connection and try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const matchesBloodGroup =
      selectedBloodGroup === 'All' || donor.bloodGroup === selectedBloodGroup;

    const matchesCity =
      citySearch.trim() === '' ||
      donor.city.toLowerCase().includes(citySearch.toLowerCase().trim());

    return matchesBloodGroup && matchesCity;
  });

  const availableCount = filteredDonors.filter((d) => d.available).length;
  const requestedCount = Object.values(requestStatus).filter(Boolean).length;

  function handleRequest(donorId) {
    setRequestStatus((prev) => ({
      ...prev,
      [donorId]: true,
    }));
  }

  return (
    <div className="app">
      <NavBar />

      <main className="main-content">
        <div className="container">
          <StatsBar
            total={filteredDonors.length}
            available={availableCount}
            requested={requestedCount}
          />

          <div className="controls-row">
            <BloodGroupFilter
              value={selectedBloodGroup}
              onFilterChange={setSelectedBloodGroup}
            />
            <SearchBar
              value={citySearch}
              onSearchChange={setCitySearch}
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="center-box">
              <p style={{ color: 'var(--red-primary)', fontWeight: 600 }}>⚠️ {error}</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <NoDonorsFound
              selectedBloodGroup={selectedBloodGroup}
              citySearch={citySearch}
            />
          ) : (
            <DonorList
              donors={filteredDonors}
              requestStatus={requestStatus}
              onRequest={handleRequest}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;