// dynamically render the available times as indiv buttons when click on selected date
import "./BookingTimeStep.css";

export default function TimeStep({ times, setSelectedTime, selectedTime }) {
  const normalizedSlots = (times || []).map((slot) => {
    if (typeof slot === "string") {
      return { time: slot.trim(), is_booked: false };
    }

    const rawBooked = slot?.is_booked;
    let isBooked = false;
    if (typeof rawBooked === "boolean") {
      isBooked = rawBooked;
    } else if (typeof rawBooked === "number") {
      isBooked = rawBooked === 1;
    } else if (typeof rawBooked === "string") {
      isBooked = ["true", "1", "yes", "booked"].includes(rawBooked.toLowerCase());
    }

    return {
      time: (slot.time || "").trim(),
      is_booked: isBooked,
    };
  }).filter((slot) => slot.time);

  if (normalizedSlots.length === 0) {
    return "No times available";
  }

  const hasAvailableSlots = normalizedSlots.some((slot) => !slot.is_booked);

  return normalizedSlots.map((slot) => {
    const isSelected = slot.time === selectedTime && !slot.is_booked;
    const buttonClass = slot.is_booked
      ? "time-button time-button-unavailable"
      : isSelected
        ? "time-button time-button-selected"
        : "time-button time-button-available";

    return (
      <button
        key={slot.time}
        type="button"
        className={buttonClass}
        disabled={slot.is_booked}
        onClick={() => {
          if (slot.is_booked) {
            return;
          }

          setSelectedTime(slot.time);
        }}
        title={slot.is_booked ? "Unavailable" : "Available"}
      >
        {slot.time}
      </button>
    );
  }).concat(
    hasAvailableSlots
      ? []
      : [<p key="no-available-slots">No available times for this date.</p>]
  );
}
