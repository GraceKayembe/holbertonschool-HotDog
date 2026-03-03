import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import FormLabel from "../../../components/Form/FormLabel.jsx";
import SuccessToast from "../../../components/toasts/SuccessToast.jsx";
import ConfirmModal from "../../../components/modals/ConfirmModal.jsx";
<<<<<<< HEAD

=======
// import Header from "../../components/Header/Header.jsx";
// import "../../components/Header/Header.css";
// import "../PaitentList/ProviderPetProfile.jsx";
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30
import "../../../styles/common.css";
import "./account.css";

export default function Account() {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const [activeTab, setActiveTab] = useState("details");
  const [editMode, setEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // =======================
  // LOAD USER + PROVIDER
  // =======================
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Load user info
      const userRes = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!userRes.ok) return alert("Failed to load user");
      const userData = await userRes.json();
      setUser(userData);

      // Load provider info
      const providerRes = await fetch("/api/providers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (providerRes.status === 404) {
        // No provider yet, show empty form
        setNeedsOnboarding(true);
        setProvider({
          name: "",
          phone: userData.phone_number || "",
          address: "",
          description: "",
          opening_time: "",
          closing_time: "",
          slot_duration: 30,
          img_url: "",
          logo_url: "",
        });
        return;
      }

      if (!providerRes.ok) return alert("Failed to load provider");
      const providerData = await providerRes.json();
      setProvider(providerData);
    };

    loadData();
  }, []);

  // =======================
  // FORM HANDLERS
  // =======================
  const updateField = (field, value) => {
    setProvider(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const saveChanges = async () => {
    if (!dirty) {
      setEditMode(false);
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const payload = {
        name: provider.name,
        phone: provider.phone,
        address: provider.address,
        description: provider.description,
        opening_time: provider.opening_time,
        closing_time: provider.closing_time,
        slot_duration: provider.slot_duration,
        img_url: provider.img_url,
        logo_url: provider.logo_url,
        email: user.email,
      };

      let res;
      if (needsOnboarding) {
        res = await fetch("/api/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/providers/${provider.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save profile");
      const data = await res.json();
      setProvider(data);
      setDirty(false);
      setEditMode(false);
      setNeedsOnboarding(false);
      setShowToast(true);
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  // =======================
  // DELETE ACCOUNT
  // =======================
  const deleteAccount = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");

      const meRes = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await meRes.json();

      const res = await fetch(`/api/users/${userData.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (!user || !provider) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="mb-5" style={{ fontWeight: 800, color: "#1f3a5f" }}>
          My Profile
        </h1>
<<<<<<< HEAD
=======
        <div className="form">
          <div className="form-nav">
            <div>
              <h3
                style={{
                  paddingLeft: "16px",
                  paddingTop: "30px",
                  color: "#1f3a5f",
                  fontWeight: "800",
                }}
              >
                Account
              </h3>
              <FormNav
                nav1="My Details"
                nav2="Manage Password"
                nav3="Manage Account"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="link-style"
              />
            </div>
          </div>
          <div className="form-panel">
            {activeTab === "details" && (
              <>
                <h6
                  id="mydetails"
                  style={{ fontWeight: 700, color: "#1f3a5f" }}
                >
                  My Details
                </h6>
                <div className="form-block mb-3">
                  <Form>
                    <FormLabel
                      className="justify-left mb-1"
                      controlId="userFirstName"
                      type="firstname"
                      name="Company Name"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    {/* <FormLabel
                      className="justify-left mb-1"
                      controlId="userLastName"
                      type="lastname"
                      name="Last Name"
                      disabled={!editMode}
                      readOnly={!editMode}
                    /> */}
                    <FormLabel
                      className="justify-left mb-1"
                      controlId="userEmail"
                      type="email"
                      name="Email"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-1"
                      controlId="userMobile"
                      type="mobile"
                      name="Address"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-3"
                      controlId="emergencyNumber"
                      type="secondaryNumber"
                      name="Other locations"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-3"
                      controlId="emergencyNumber"
                      type="secondaryNumber"
                      name="Other locations"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />

                    {/* Profile Info */}
                    <FormLabel
                      className="justify-left mb-1"
                      controlId="userEmail"
                      type="email"
                      name="Services you provide"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-1"
                      controlId="userMobile"
                      type="mobile"
                      name="Phone"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-3"
                      controlId="emergencyNumber"
                      type="secondaryNumber"
                      name="Description"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-3"
                      controlId="emergencyNumber"
                      type="secondaryNumber"
                      name="Opening hours"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                    <FormLabel
                      className="justify-left mb-3"
                      controlId="emergencyNumber"
                      type="secondaryNumber"
                      name="Closing hours"
                      disabled={!editMode}
                      readOnly={!editMode}
                    />
                  </Form>

                  {editMode ? (
                    <div>
                      <button
                        onClick={closeEditMode}
                        className="btn-layout btn-yellow"
                      >
                        Save details
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={openEditMode}
                      className="btn-layout btn-yellow"
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              </>
            )}
            {activeTab === "password" && (
              <>
                <h6
                  id="mngpwd"
                  style={{ margin: "0px", fontWeight: 700, color: "#1f3a5f" }}
                >
                  Manage Password
                </h6>
>>>>>>> d2ba4548a21f4d648414b5a269bbe245c3682f30

        {/* Tabs */}
        <div className="tab-menu mb-4">
          <button
            className={activeTab === "details" ? "active-tab" : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={activeTab === "account" ? "active-tab" : ""}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </div>

        <div className="form-panel">
          {/* ================= DETAILS ================= */}
          {activeTab === "details" && (
            <div className="provider-form-block">
              <Form>
                {/* USER INFO */}
                <FormLabel name="First Name" value={user.first_name} disabled={!editMode} onChange={e => setUser(prev => ({ ...prev, first_name: e.target.value }))} />
                <FormLabel name="Last Name" value={user.last_name} disabled={!editMode} onChange={e => setUser(prev => ({ ...prev, last_name: e.target.value }))} />
                <FormLabel name="Email" value={user.email} disabled={!editMode} onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))} />

                {/* PROVIDER INFO */}
                <FormLabel name="Business Name" value={provider.name} disabled={!editMode} onChange={e => updateField("name", e.target.value)} />
                <FormLabel name="Phone" value={provider.phone} disabled={!editMode} onChange={e => updateField("phone", e.target.value)} />
                <FormLabel name="Address" value={provider.address} disabled={!editMode} onChange={e => updateField("address", e.target.value)} />
                <FormLabel name="Description" value={provider.description} disabled={!editMode} onChange={e => updateField("description", e.target.value)} />
                <FormLabel type="time" name="Opening Hours" value={provider.opening_time} disabled={!editMode} onChange={e => updateField("opening_time", e.target.value)} />
                <FormLabel type="time" name="Closing Hours" value={provider.closing_time} disabled={!editMode} onChange={e => updateField("closing_time", e.target.value)} />
                <FormLabel name="Slot Duration (mins)" value={provider.slot_duration} disabled={!editMode} onChange={e => updateField("slot_duration", e.target.value)} />
                <FormLabel name="Business Image URL" value={provider.img_url} disabled={!editMode} onChange={e => updateField("img_url", e.target.value)} />
                <FormLabel name="Logo Image URL" value={provider.logo_url} disabled={!editMode} onChange={e => updateField("logo_url", e.target.value)} />
              </Form>

              <button
                className="btn-layout btn-yellow mt-3"
                onClick={editMode ? saveChanges : () => setEditMode(true)}
                disabled={saving}
              >
                {saving ? "Saving..." : editMode ? "Save Details" : "Edit Details"}
              </button>
            </div>
          )}

          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (
            <div className="form-block">
              <p>This action cannot be undone. All provider data will be permanently removed.</p>
              <button className="btn-layout btn-navy mt-3" onClick={() => setShowDeleteModal(true)} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          )}
        </div>

        <SuccessToast showToast={showToast} onClose={() => setShowToast(false)} message="Profile saved successfully!" />

        <ConfirmModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          heading="Delete Account"
          body="Are you sure you want to permanently delete your account?"
          primaryButton="Delete Account"
          secondaryButton="Cancel"
          onPrimaryClick={deleteAccount}
        />
      </div>
    </div>
  );
}