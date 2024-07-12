import { getDailyUsers } from "../features/Users/usersSlice";
import moment from "moment";
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

// const data = [
//   { name: "Mon", value: 10 },
//   { name: "Tues", value: 20 },
//   { name: "Wed", value: 30 },
//   { name: "Thur", value: 30 },
//   { name: "Fri", value: 30 },
//   { name: "Sat", value: 7 },
//   { name: "Sun", value: 30 },
// ];

function DailyUsers() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  let dailyUsers = usersState?.dailyUser;

  useEffect(() => {
    dispatch(getDailyUsers(token));
  }, []);

  const dailyU = [];
  if (dailyUsers) {
    dailyUsers?.forEach((key) => {
      dailyU.push({
        name: moment(key?.date).format("dddd").slice(0, 3),
        value: key?.userCount,
      });
    });
  }

  // console.log(dailyU);
  // console.log(dailyUsers);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={"100%"} height={320} data={dailyU}>
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

export default DailyUsers;
