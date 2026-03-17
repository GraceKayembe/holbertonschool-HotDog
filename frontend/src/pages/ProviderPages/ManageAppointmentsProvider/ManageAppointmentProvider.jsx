import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModalCustom from '../../../components/modals/ConfirmModalCustom';
import { cancelAppointment } from '../../../api/providerBookings';
import './ManageAppointmentProvider.css';
import LocationIcon from '../../../assets/icons/geo-alt.svg';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Days from "../../../assets/icons/calendar-icon.png";
import Bookingicon from "../../../assets/icons/book_icon.png";
import Customericon from "../../../assets/icons/customer.png"

dayjs.extend(utc);

export default function ManageAppointmentProvider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);

  // Modal states
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  // Set selected appointment from navigation state
  useEffect(() => {
    if (location.state?.appointment) {
      setSelectedAppt(location.state.appointment);
    } else {
      setError("No appointment selected. Please select an appointment from the bookings list.");
    }
  }, [location.state]);

  // Handle cancel button click
  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelConfirm(true);
  };

  // Handle confirm cancel
  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;

    try {
      setCancellingId(selectedBookingId);
      const token = localStorage.getItem('token');
      await cancelAppointment(token, selectedBookingId);

      setShowCancelConfirm(false);
      setShowCancelSuccess(true);

      // Close success modal after 2 seconds and navigate back
      setTimeout(() => {
        setShowCancelSuccess(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.error('Error cancelling booking:', err);
      setShowCancelConfirm(false);
    } finally {
      setCancellingId(null);
      setSelectedBookingId(null);
    }
  };

  return (
    <div className="provider-manage-appt-container">
      <div className="manage-appointment-provider">
        <div className="manage-appointment-provider-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            &lt;
          </button>
          <h1>Manage Appointments</h1>
        </div>

        {error && <p className="error">Error: {error}</p>}

        <div className="bookings-list">
          {selectedAppt && (
            <div key={selectedAppt.id} className="booking-card">
              <div className="booking-details">
                {/* Pet Name */}
                <div className="detail-row">
                  <div className="detail-label">
                    <img
                      src={Customericon}
                      alt="location"
                      className="location-icon"
                    />
                    <span>Pet:</span>
                  </div>
                  <span className="detail-value">{selectedAppt.pet_name}</span>
                </div>
                {/* Date & Time */}
                <div className="detail-row">
                  <div className="detail-label">
                    <img
                      src={Days}
                      alt="location"
                      className="location-icon"
                    />
                    <span>Date & Time:</span>
                  </div>
                  <span className="detail-value">
                    {selectedAppt.date_time 
                      ? dayjs.utc(selectedAppt.date_time).format('DD/MM/YYYY HH:mm')
                      : '-'
                    }
                  </span>
                </div>
                {/* Service Type */}
                <div className="detail-row">
                  <div className="detail-label">
                    <img
                      src={Bookingicon}
                      alt="location"
                      className="location-icon"
                    />
                    <span>Service:</span>
                  </div>
                  <span className="detail-value">{selectedAppt.service_type}</span>
                </div>
              </div>
              <button
                className="cancel-btn"
                onClick={() => handleCancelClick(selectedAppt.id)}
                disabled={cancellingId === selectedAppt.id || selectedAppt.status === 'CANCELLED'}
              >
                {cancellingId === selectedAppt.id 
                  ? 'Cancelling...' 
                  : selectedAppt.status === 'CANCELLED'
                  ? 'Cancelled'
                  : 'Cancel'
                }
              </button>
            </div>
          )}
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <ConfirmModalCustom
            title="Are you sure you want to cancel this booking?"
            onConfirm={handleConfirmCancel}
            onClose={() => {
              setShowCancelConfirm(false);
              setSelectedBookingId(null);
            }}
            confirmText="Confirm"
            isLoading={cancellingId !== null}
          />
        )}

        {/* Cancel Success Modal */}
        {showCancelSuccess && (
          <div className="success-modal">
            <div className="success-modal-content">
              <h2>Booking Cancelled</h2>
              <p>This booking has been successfully cancelled.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
