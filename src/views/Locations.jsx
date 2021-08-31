import axios from "axios";
import DashboardContent from "components/DashboardContent";
import { useEffect, useState } from "react";
import { API_HOST, API_HOST_MAIN, token } from "utils/config";
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

  const getLocations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_HOST_MAIN}/locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.locations) {
        setLocations(res.data.locations);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const addLocation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${API_HOST}/locations?name=${data.name}&delivery_price=${data.delivery_price}&active=${data.active}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        console.log(res.data.message);
      }
    } catch (e) {
      setSubmitting(false);
      alert("An error occurred");
      console.log(e.message);
    }
  };

  const editLocation = async (e, record) => {
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
        alert(res.data.message);
        console.log(res.data.message);
      }
    } catch (e) {
      setSubmitting(false);
      alert("An error occurred");
      console.log(e.message);
    }
  };

  useEffect(() => getLocations(), []);

  return (
    <DashboardContent
      data={locations}
      columns={COLUMNS}
      title="Locations"
      collectionType="location"
      loading={loading}
      handleAdd={addLocation}
      handleEdit={editLocation}
      submitting={submitting}
    />
  );
};

export default Locations;
