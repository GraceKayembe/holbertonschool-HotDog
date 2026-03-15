import WomanWithDog from "../../assets/images/woman-with-dog.jpg";
import ManWithCat from "../../assets/images/man-with-cat.jpg";

const advert_Data = [
  {
    id: 1,
    img: WomanWithDog,
    name: "Jamie Jason",
    description:
      "HotDog made it really easy to find a reliable dog walker for my Labrador. I love being able to keep all of my pet’s details and bookings in one place.",
    showButton: false,  
  },
  {
    id: 2,
    img: ManWithCat,
    name: "Tony Samuels",
    description:
      "I booked a vet appointment through HotDog and the provider was able to update my cat’s details during the visit. It’s great having everything kept up to date in one place.",
    showButton: false,
  },
  {
    id: 3,
    title: "Are you a pet care provider looking to join our network?",
    subtitle: "Connect with pet owners, manage bookings, and grow your services in one place.",
    showButton: true,
  },
  {
    id: 4,
    dashboardSubtitle: "See what other pet owners are saying about HotDog!",
    showButton: true,
  },
];

export default advert_Data;
