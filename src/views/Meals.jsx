import axios from "axios";
import AlertBox from "components/AlertBox";
import DashboardContent from "components/DashboardContent";
import { useEffect, useState } from "react";
import { API_HOST, API_HOST_MAIN, token } from "utils/config";
import formDataToJSON from "utils/formDataToJSON";

const COLUMNS = [
  {
    Header: "Image",
    accessor: "photo",
  },
  {
    Header: "Meal name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  // {
  //   Header: "Day",
  //   accessor: "day",
  // },
];

const days = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const Meals = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [meals, setMeals] = useState([]);
  const [menu, setMenu] = useState([]);
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

  const getMealDays = (_menu, mealName) => {
    const mealDays = [];

    Object.keys(_menu).forEach((day) => {
      _menu[day].filter((meal) => meal.name === mealName).length &&
        mealDays.push(day);
    });

    return mealDays;
  };

  const setMealsData = (_menu, _meals) => {
    const data = _meals.map((meal) => ({
      ...meal,
      days: getMealDays(_menu, meal.name),
    }));

    setMeals(data);
  };

  const getMeals = async () => {
    try {
      setLoading(true);
      const res_meals = await axios.get(`${API_HOST}/meals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res_menu = await axios.get(`${API_HOST_MAIN}/menu`);

      if (res_menu.data?.status === "success") {
        const tempMenu = res_menu.data;
        delete tempMenu.status;
        setMenu(tempMenu);
      }
      if (res_meals.data?.length) {
        setMeals(res_meals.data);
      }
      if (meals && menu) {
        setMealsData(res_menu.data, res_meals.data);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const addMeal = async (e, setShowAdd) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);
    const dayIds = JSON.parse(data.days).map((day) => days[day.toLowerCase()]);

    dayIds.forEach((id) => {
      formData.append("days[]", id);
    });

    if (document.querySelector("#photoInput").files[0]) {
      formData.append("photo", document.querySelector("#photoInput").files[0]);
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${API_HOST}/meals`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowAdd(false);
        getMeals();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const editMeal = async (e, record, setShowEdit) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    const dayIds = JSON.parse(data.days).map((day) => days[day.toLowerCase()]);

    dayIds.forEach((id) => {
      formData.append("days[]", id);
    });

    if (document.querySelector("#photoInput").files[0]) {
      formData.append("photo", document.querySelector("#photoInput").files[0]);
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${API_HOST}/meals/${record.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setShowEdit(false);
        getMeals();
      } else {
        showAlert("Something went wrong", "danger");
      }
    } catch (e) {
      setSubmitting(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  const deleteMeals = async (ids, setConfirmDelete) => {
    const mealIds = ids.map((id) => meals[id].id);
    try {
      setSubmitting(true);
      const res = await axios.delete(`${API_HOST}/meals`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { meals: mealIds },
      });
      setSubmitting(false);
      if (res.data.status === "success") {
        showAlert(res.data.message, "success");
        setConfirmDelete(false);
        getMeals();
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
    getMeals();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardContent
      data={meals}
      columns={COLUMNS}
      title="Meals"
      collectionType="meal"
      loading={loading}
      handleAdd={addMeal}
      handleEdit={editMeal}
      handleDelete={deleteMeals}
      submitting={submitting}
      canEdit
    >
      <AlertBox className="alertBox" type={alertType} text={alertText} />
    </DashboardContent>
  );
};

export default Meals;
