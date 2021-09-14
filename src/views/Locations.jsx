import axios from "axios";
import AlertBox from "components/AlertBox";
import DashboardContent from "components/DashboardContent";
import { useEffect, useState } from "react";
import { API_HOST, token } from "utils/config";
import formDataToJSON from "utils/formDataToJSON";

const COLUMNS = [
  {
    Header: "Location",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "delivery_price",
  },
  {
    Header: "Active",
    accessor: "active",
  },
];

const Locations = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [locations, setLocations] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");

  const showAlert = (msg = "...", type) => {
    // e.preventDefault();
    setAlertType(type);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const getLocations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_HOST}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.length) {
        setLocations(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const addLocation = async (e, setShowAdd) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${API_HOST}/locations?name=${data.name}&delivery_price=${data.delivery_price}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowAdd(false);
        getLocations();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const editLocation = async (e, record, setShowEdit) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    try {
      setSubmitting(true);
      const res = await axios.patch(
        `${API_HOST}/locations/${record.id}?name=${data.name}&delivery_price=${data.delivery_price}&active=${data.active}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowEdit(false);
        getLocations();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const deleteLocations = async (ids, setConfirmDelete) => {
    const locationIds = ids.map((id) => locations[id].id);
    try {
      setSubmitting(true);
      const res = await axios.delete(`${API_HOST}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { locations: locationIds },
      });
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setConfirmDelete(false);
        getLocations();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  useEffect(() => {
    getLocations();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardContent
      data={locations}
      columns={COLUMNS}
      title="Locations"
      collectionType="location"
      loading={loading}
      handleAdd={addLocation}
      handleEdit={editLocation}
      handleDelete={deleteLocations}
      submitting={submitting}
    >
      <AlertBox className="alertBox" type={alertType} text={alertText} />
    </DashboardContent>
  );
};

export default Locations;
