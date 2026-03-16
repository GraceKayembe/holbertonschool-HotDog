import { Nav } from "react-bootstrap";
import "../../pages/UserProfile/UserProfile.css";

export default function FormNav({ tabs, activeTab, setActiveTab }) {
  return (
    <Nav className="flex-column">
      {tabs.map((tab) => (
        <Nav.Link
          key={tab.value}
          className={activeTab === tab.value ? "active" : ""}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </Nav.Link>
      ))}
    </Nav>
  );
}