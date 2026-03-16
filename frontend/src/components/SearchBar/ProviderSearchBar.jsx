import React, { useState, useEffect, useRef } from "react";
import "./searchbar.css";
import Fuse from "fuse.js";

const dobFilters = [
  "All",
  "Puppies (< 1 year)",
  "Young (1-5 years)",
  "Adult (5-10 years)",
  "Senior (10+ years)"
];

function ProviderSearchBar({
  patients = [],
  onServiceChange,
  onSearchChange,
  onSearch,
  service,
  searchValue,
}) {

  const serviceInput = service;    
  const searchInput = searchValue;   

  const [serviceResults, setServiceResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [showServices, setShowServices] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [fuse, setFuse] = useState(null);

  const wrapperRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  
  // Build Fuse index for patient search
  useEffect(() => {
    if (!patients.length) return;

    const fuseInstance = new Fuse(
      patients.map((p) => ({ ...p, owner_name: p.owner_name || "" })),
      {
        keys: [
          { name: "name", weight: 0.6 },
          { name: "owner_name", weight: 0.4 }
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2
      }
    );

    setFuse(fuseInstance);
  }, [patients]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowServices(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // AGE FILTER HANDLERS
  const handleServiceInput = (value) => {
    onServiceChange?.(value);
    setShowServices(true);

    if (!value.trim()) {
      setServiceResults(dobFilters);
      return;
    }

    const filtered = dobFilters.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setServiceResults(filtered);
  };

  const selectService = (value) => {
    const filter = value === "All" ? "" : value;

    onServiceChange(filter);
    onSearchChange("");

    onSearch?.(filter);   

    setShowServices(false);
  };

  // PET / OWNER SEARCH HANDLERS
  const handleSearchInput = (value) => {
    onSearchChange?.(value); 

    if (!value.trim()) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    let results = [];
    if (fuse) results = fuse.search(value).map(r => r.item);

    // fallback in case Fuse finds nothing
    if (results.length === 0) {
      results = patients.filter(p =>
        p.name?.toLowerCase().includes(value.toLowerCase()) ||
        (p.owner_name || "").toLowerCase().includes(value.toLowerCase())
      );
    }

    setSearchResults(results);
    setShowSearch(true);
  };

  const selectResult = (patient) => {
    onSearchChange(patient.name); 
    setShowSearch(false);
  };

  const isActive =
    showServices || showSearch || serviceInput.trim() !== "" || searchInput.trim() !== "";

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <div className="search-bar">

        {/* AGE FILTER */}
        <div className={`service-input-wrapper ${isActive ? "active" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`dropdown-icon ${showServices ? "open" : ""}`}
            onClick={() => {
              setServiceResults(dobFilters);
              setShowServices(true);
              setShowSearch(false);
              setIsExpanded(true);
            }}
          >
            <polyline points="6 9 12 3 18 9"></polyline>
          </svg>

          <input
            type="text"
            placeholder="Select Age Group"
            value={serviceInput}
            readOnly
            onFocus={() => {
              setServiceResults(dobFilters);
              setShowServices(true);
              setShowSearch(false);
              setIsExpanded(true);
            }}
            className="provider-search-filter"
          />

          {showServices && (
            <ul className="search-dropdown">
              {serviceResults.map((s, idx) => (
                <li
                  key={idx}
                  className="dropdown-item"
                  onClick={() => selectService(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          className="search-btn"
          onClick={() => {
            onSearch?.();
            setShowSearch(false);
            setShowServices(false);
            setIsExpanded(false);

            onServiceChange?.("");  
            onSearchChange?.("");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="searchbar-icon">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>

        {/* PET / OWNER SEARCH */}
        <div className={`provider-input-wrapper ${isActive ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Search Pet or Owner"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => {
              setShowServices(false);
              if (searchInput.trim().length >= 2) setShowSearch(true);
            }}
            className="provider-search-filter"
          />

          {showSearch && (
            <ul className="search-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map(p => (
                  <li
                    key={p.id}
                    className="dropdown-item"
                    onClick={() => selectResult(p)}
                  >
                    {p.name} — {p.owner_name || "Unknown Owner"}
                  </li>
                ))
              ) : (
                <li className="no-results">No patients found</li>
              )}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProviderSearchBar;