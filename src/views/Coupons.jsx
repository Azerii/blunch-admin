import axios from "axios";
import AlertBox from "components/AlertBox";
import DashboardContent from "components/DashboardContent";
import { useEffect, useState } from "react";
import { API_HOST, API_HOST_MAIN, token } from "utils/config";
import formDataToJSON from "utils/formDataToJSON";

const COLUMNS = [
  {
    Header: "Coupon code",
    accessor: "code",
  },
  {
    Header: "Coupon type",
    accessor: "type",
  },
  {
    Header: "Date created",
    accessor: "date_created",
  },
  {
    Header: "Expires",
    accessor: "expires",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const getStatus = (utc_date) => {
  const d = Date.now();
  const expires = new Date(utc_date).getTime();
  const diff = expires - d;

  return diff > 0 ? "Active" : "Expired";
};

const getDuration = (utc_date) => {
  const d = Date.now();
  const expires = new Date(utc_date).getTime();
  const diff = expires - d;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  return days > 0 ? days : 0;
};

const Coupons = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [coupons, setCoupons] = useState([]);
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

  const getCoupons = async () => {
    try {
      setLoading(true);
      const res_coupons = await axios.get(`${API_HOST}/coupons`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const res_locations = await axios.get(`${API_HOST_MAIN}/locations`);

      if (res_coupons.data.length) {
        let _coupons = [...res_coupons.data].map((coupon) => ({
          ...coupon,
          date_created: new Date(coupon.created_at).toLocaleDateString(),
          expires: new Date(coupon.expires).toLocaleDateString(),
          status: getStatus(coupon.expires),
          duration: getDuration(coupon.expires),
        }));
        setCoupons(_coupons);
      }

      if (res_locations.data.locations) {
        setLocations(res_locations.data.locations);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const addCoupon = async (e, setShowAdd) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);
    const locationIds = JSON.parse(data.locations).map(
      (location) => locations.find((item) => item.name === location).id
    );

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${API_HOST}/coupons?type=${data.type}&discount=${data.discount}&expires=${data.expires}&code=${data.code}`,
        { locations: locationIds },
        {
          headers: { Authorization: `Bearer ${token()}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowAdd(false);
        getCoupons();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const editCoupon = async (e, record, setShowEdit) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);
    const locationIds = JSON.parse(data.locations).map(
      (location) => locations.find((item) => item.name === location).id
    );

    try {
      setSubmitting(true);
      const res = await axios.patch(
        `${API_HOST}/coupons/${record.id}?type=${data.type}&discount=${data.discount}&expires=${data.expires}&code=${data.code}`,
        { locations: locationIds },
        {
          headers: { Authorization: `Bearer ${token()}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowEdit(false);
        getCoupons();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const deleteCoupons = async (ids, setConfirmDelete) => {
    const couponIds = ids.map((id) => coupons[id].id);
    try {
      setSubmitting(true);
      const res = await axios.delete(`${API_HOST}/coupons`, {
        headers: { Authorization: `Bearer ${token()}` },
        data: { coupons: couponIds },
      });
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setConfirmDelete(false);
        getCoupons();
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
    getCoupons();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardContent
      data={coupons}
      columns={COLUMNS}
      title="Coupons"
      collectionType="coupon"
      loading={loading}
      handleAdd={addCoupon}
      handleEdit={editCoupon}
      handleDelete={deleteCoupons}
      submitting={submitting}
      extra={{ locations }}
    >
      <AlertBox className="alertBox" type={alertType} text={alertText} />
    </DashboardContent>
  );
};

export default Coupons;
