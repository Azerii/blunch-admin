import axios from "axios";
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

// const days = [
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
// ];

const Meals = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [meals, setMeals] = useState([]);
  const [menu, setMenu] = useState([]);

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
      console.log(e.message);
    }
  };

  const addMeal = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${API_HOST}/meals?name=${data.name}&price=${data.price}`,
        { days: JSON.parse(data.days) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitting(false);
      if (res.data.status === "success") {
        console.log(res.data.message);
        alert("Meal added successfully");
        e.target.reset();
      } else {
        alert("Something went wrong. Try again");
      }
    } catch (e) {
      setSubmitting(false);
      alert("An error occurred");
      console.log(e.message);
    }
  };

  const editMeal = async (e, record) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const data = formDataToJSON(formData);

    try {
      setSubmitting(true);
      const res = await axios.patch(
        `${API_HOST}/meals/${record.id}`,
        formData,
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
      submitting={submitting}
      canEdit
    />
  );
};

export default Meals;
