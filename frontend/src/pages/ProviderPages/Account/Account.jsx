import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import FormLabel from "../../../components/Form/FormLabel.jsx";
import FormNav from "../../../components/Form/FormNav.jsx";
import SuccessToast from "../../../components/toasts/SuccessToast.jsx";
import ConfirmModal from "../../../components/modals/ConfirmModal.jsx";

import Appointments from "../../Appointments/Appointments.jsx";

import "./account.css";
import "../../../styles/common.css";

export default function Account() {
  const { user, logout } = useContext(AuthContext);

  const [provider, setProvider] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const [activeTab, setActiveTab] = useState("details");

  const [editMode, setEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  cconst [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // ============================
  // LOAD USER + PROVIDER
  // ============================

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userRes = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = await userRes.json();
      setUser(userData);

      const providerRes = await fetch("/api/providers/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (providerRes.status === 404) {
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
      const providerData = await providerRes.json();
      setProvider(providerData);
    };

    loadData();
  }, []);


  // ============================
  // UPDATE FIELD
  // ============================

  const updateField = (field, value) => {
    setProvider(prev => ({
      ...prev,
      [field]: value
    }));

    setDirty(true);
  };

  // ============================
  // SAVE PROFILE
  // ============================

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
        email: user.email
      };

      let res;

      if (needsOnboarding) {
        res = await fetch("/api/providers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

      } else {

        res = await fetch(`/api/providers/${provider.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

      }

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

  // ============================
  // UPDATE PASSWORD
  // ============================

  const updatePassword = async () => {

    setPasswordError("");

    if (!newPassword) {
      return setPasswordError("Password cannot be empty");
    }

    if (newPassword !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    try {

      const token = localStorage.getItem("token");

      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      // SUCCESS
      setShowPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowPasswordSuccess(false);
      }, 1500);

    } catch (err) {

      console.error(err);
      setPasswordError(err.message);

    }
  };


  // ============================
  // DELETE ACCOUNT
  // ============================

  const deleteAccount = async () => {
    try {

      setDeleting(true);

      const token = localStorage.getItem("token");

      const meRes = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = await meRes.json();

      await fetch(`/api/users/${userData.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      try {
        const result = await deleteUser(user, token);
        console.log(result.message);
        setShowModal(false);
        setShowDeleteSuccess(true);
        setTimeout(() => {
          logout(); // log the usr out after account is deleted
        }, 1500); // Delay logout for 1.5 seconds to show toast
      } catch (err) {
        console.error(err);
      }

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
    <div className="profile-background">
      <div className="user-profile-container">
        <h1 className="account-mb-5">Business Profile</h1>
        <div className="form">

          {/* LEFT NAV */}
          <div className="form-nav">
            <div>
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 2.25vw, 1.5rem)",
                  paddingLeft: "16px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  color: "#1f3a5f",
                  fontWeight: "800",
                }}
              >
                Account
              </h3>
              <FormNav
                tabs={[
                  { label: "Business Details", value: "details" },
                  { label: "Manage Account", value: "account" },
                  { label: "Business Page Preview", value: "preview" }
                ]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>


          {/* RIGHT PANEL */}
          <div className="form-panel">

            {/* DETAILS TAB */}
            {activeTab === "details" && (
              <>
                <h6>Business Details</h6>
                <div className="form-block">
                  <Form>
                    <FormLabel
                      name="First Name"
                      value={user.first_name}
                      disabled={!editMode}
                      onChange={e =>
                        setUser(prev => ({
                          ...prev,
                          first_name: e.target.value
                        }))
                      }
                    />

                    <FormLabel
                      name="Last Name"
                      value={user.last_name}
                      disabled={!editMode}
                      onChange={e =>
                        setUser(prev => ({
                          ...prev,
                          last_name: e.target.value
                        }))
                      }
                    />

                    <FormLabel
                      name="Email"
                      value={user.email}
                      disabled={!editMode}
                      onChange={e =>
                        setUser(prev => ({
                          ...prev,
                          email: e.target.value
                        }))
                      }
                    />

                    <FormLabel
                      name="Business Name"
                      value={provider.name}
                      disabled={!editMode}
                      onChange={e => updateField("name", e.target.value)}
                    />

                    <FormLabel
                      name="Phone"
                      value={provider.phone}
                      disabled={!editMode}
                      onChange={e => updateField("phone", e.target.value)}
                    />
      
                    <FormLabel 
                      name="Address"
                      value={provider.address}
                      disabled={!editMode}
                      onChange={e => updateField("address", e.target.value)}
                    />

                    {/* DESCRIPTION */}
                    <Form.Group className="form-label-group">
                      <Form.Label>Description</Form.Label>
                      <textarea
                        name="Description"
                        value={provider.description}
                        disabled={!editMode}
                        onChange={e => updateField("description", e.target.value)}
                        className="form-control business-description"
                      />
                    </Form.Group>

                    <FormLabel
                      type="time"
                      name="Opening Time"
                      value={provider.opening_time}
                      disabled={!editMode}
                      onChange={e => updateField("opening_time", e.target.value)}
                    />

                    <FormLabel
                      type="time"
                      name="Closing Time"
                      value={provider.closing_time}
                      disabled={!editMode}
                      onChange={e => updateField("closing_time", e.target.value)}
                    />
                  </Form>

                  {editMode ? (
                    <button
                      className="btn-style button-yellow"
                      onClick={saveChanges}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Details"}
                    </button>

                  ) : (

                    <button
                      className="btn-style button-yellow"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === "account" && (
              <>
                <h6>Manage Account</h6>
                <div className="form-block">

                  {/* CHANGE PASSWORD */}
                  <h6 style={{ marginBottom: "10px", fontSize: "1.25rem" }}>Change Password</h6>
                  <Form>

                    <FormLabel
                      name="New Password"
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />

                    <FormLabel
                      name="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </Form>

                  {passwordError && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {passwordError}
                    </p>
                  )}

                  <button
                    className="btn-style button-yellow"
                    onClick={updatePassword}
                    disabled={!newPassword || !confirmPassword}
                    style={{ marginTop: "10px" }}
                  >
                    Change Password
                  </button>

                  {/* DIVIDER */}
                  <hr style={{ margin: "35px 0" }} />

                  {/* DELETE ACCOUNT */}
                  <h6 style={{ fontSize: "1.25rem"}}>Delete Account</h6>
                  <p>
                    We're sorry to see you go 😢
                    <br /><br />
                    This action cannot be undone and all provider data will be permanently removed.
                  </p>

                  <button
                    className="btn-style button-navy"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </>
            )}

            {/* BUSINESS PAGE PREVIEW TAB */}
            {activeTab === "preview" && (
              <div className="form-block">
                <h6>Business Page Preview</h6>
                  <div className="preview"> 
                    <Appointments previewMode providerData={provider} />
                  </div>
              </div>
            )}
          </div>
        </div>

        {showDeleteSuccess && (
          <div className="success-modal">
            <div className="success-modal-content">
              <h2>Account Deleted</h2>
              <p>Your account has been permanently deleted.</p>
            </div>
          </div>
        )}

        {showPasswordSuccess && (
          <div className="success-modal">
            <div className="success-modal-content">
              <h2>Password Updated</h2>
              <p>Your password was successfully updated.</p>
            </div>
          </div>
        )}

        <ConfirmModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handlePrimary={deleteAccount}
          heading="Delete Account"
          body="Are you sure you want to permanently delete your account?"
          primaryButton="Delete Account"
          secondaryButton="Cancel"
        />
      </div>
    </div>
  );
}

