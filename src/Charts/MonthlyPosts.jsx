import { getMonthlyPost } from "../features/Post/postSlice";
import { getDailyPosts } from "../features/Post/postSlice";
// import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 30 },
  { name: "May", value: 30 },
  { name: "Jun", value: 7 },
  { name: "Jul", value: 30 },
  { name: "Aug", value: 15 },
  { name: "Sept", value: 60 },
  { name: "Oct", value: 40 },
  { name: "Nov", value: 20 },
  { name: "Dec", value: 10 },
];

function MonthlyPosts() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { monthlyPosts } = postState;

  useEffect(() => {
    dispatch(getMonthlyPost(token));
  }, []);

  let monthly = [];

  if (monthlyPosts) {
    monthlyPosts?.forEach((key) => {
      monthly.push({
        name: key?.month.slice(0, 3),
        value: key?.postCount,
      });
    });
  }

  console.log(monthly);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={"100%"} height={320} data={monthly}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyPosts;
