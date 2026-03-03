import './Dashboard.css';

import DashboardHero from '../../components/Dashboard/DashboardHero.jsx';
<<<<<<< HEAD
// import DashboardSearch from '../../components/Dashboard/DashboardSearch.jsx';
import SearchBar from '../../components/SearchBar/SearchButton.jsx';
import TopServicesAndEvents from '../../components/Dashboard/TopServicesAndEvents.jsx';
import DashboardBanner from '../../components/Dashboard/DashboardBanner.jsx';
import PetStylistReviews from '../../components/Dashboard/PetStylistReviews.jsx';
import Advert from '../../pages/Home/Advert.jsx';
import advert_Data from '../../pages/Home/advert_Data.js';
=======
import TopServicesAndEvents from '../../components/Dashboard/TopServicesAndEvents.jsx';
import DashboardBanner from '../../components/Dashboard/DashboardBanner.jsx';
import PetStylistReviews from '../../components/Dashboard/PetStylistReviews.jsx';
import SearchBar from '../../components/SearchBar/SearchButton.jsx';
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30

import { STYLISTS } from './dashboardData.js';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [topProviders, setTopProviders] = useState([]);

  useEffect(() => {
    const fetchTopProviders = async () => {
      try {
        const response = await fetch('/api/providers/top-rated');
        if (response.ok) {
          const data = await response.json();
          console.log('1. Raw data from backend:', data);
          const extractedArray = Array.isArray(data) ? data : data.providers;
          console.log('2. Array passed to React state:', extractedArray);
          setTopProviders(extractedArray || []);
        }
      } catch (error) {
        console.error('Failed to fetch top providers:', error);
      }
    };

    fetchTopProviders();
  }, []);

  return (
    <div className="dash">
      <div className="dash-container">
        <DashboardHero name={user?.first_name || 'User'} />

<<<<<<< HEAD
        {/* <DashboardSearch
          onSearch={(query) => {
            console.log('search:', query);
          }}
        /> */}
=======
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30
        <SearchBar />

        <TopServicesAndEvents
          topProviders={topProviders}
        />

        <DashboardBanner
          title="Tick season!"
          text="Get your furry friend the care they need!"
          ctaText="Find a Provider"
        />
      </div>

<<<<<<< HEAD
      {/* <PetStylistReviews
        stylists={STYLISTS}
        onBookClick={() => console.log('Book appointment')}
      /> */}
      <div className="banner-advert-container">
        {advert_Data
        .filter(ad => ad.id === 1 || ad.id === 2 || ad.dashboardSubtitle)
        .map(advert =>(
          <Advert
            key={advert.id}
            img={advert.img}
            name={advert.name}
            description={advert.description}
            dashboardSubtitle={advert.dashboardSubtitle}
          />
        ))}
      </div>

=======
      <PetStylistReviews stylists={STYLISTS} />
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30
    </div>
  );
}
