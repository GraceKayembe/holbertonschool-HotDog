import React from "react";
import "./bookingsteps.css";

function BookingSteps2({ closePopup, handleNext, goBack }) { 
  const handleAgree = () => {
    handleNext({ agreedToTerms: true });
  };

  return (
    <div className="bookingsequence2-container">
      <h4 className="bookingsequence-h4">Please note this appointment type is not suitable for procedures.</h4>
      <p>If you require a procedure, please call reception to allocate proper resources.</p>
      <hr />
      
      <p>We take pet insurance. All other patients will be privately billed at all times.</p>
      <p>Do you understand and agree to the fee schedule? 24 hours cancellation policy applies.</p>

      <div className="button-group">
        <button type="button" onClick={goBack} className="bookingsequence-backbutton">Back</button>
        <button type="button" onClick={handleAgree} className="bookingsequence-submitbutton">Yes</button>
        <button type="button" onClick={closePopup} className="bookingsequence-cancelbutton">No</button>
      </div>
    </div>
  );
}

export default BookingSteps2;