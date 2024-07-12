import { getDailyPosts } from "../features/Post/postSlice";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    value: 3490,
  },
];

const DailyPosts = () => {
  // user token

  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  let dailyPosts = postState?.dailyPosts;

  useEffect(() => {
    dispatch(getDailyPosts(token));
  }, []);

  const dailyP = [];
  if (dailyPosts) {
    dailyPosts?.forEach((key) => {
      dailyP.push({
        name: moment(key?.date).format("dddd").slice(0, 3),
        value: key?.postCount,
      });
    });
  }

  // console.log(dailyP);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={"100%"}
        height={400}
        data={dailyP}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default DailyPosts;

// import { getDailyPosts } from "features/Post/postSlice";
// import moment from "moment";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// // const data = [
// //   { name: "Mon", value: 10 },
// //   { name: "Tues", value: 20 },
// //   { name: "Wed", value: 30 },
// //   { name: "Thur", value: 30 },
// //   { name: "Fri", value: 30 },
// //   { name: "Sat", value: 7 },
// //   { name: "Sun", value: 30 },
// // ];

// function DailyPosts() {
//   // user token
//   //
//   const userDataToken = useSelector((state) => state.auth.user);
//   const token = userDataToken?.data?.token;
//   //
//   // user token
//   const dispatch = useDispatch();
//   const postState = useSelector((state) => state.post);
//   let dailyUsers = postState?.dailyPosts;

//   useEffect(() => {
//     dispatch(getDailyPosts(token));
//   }, []);

//   const dailyP = [];
//   if (dailyUsers) {
//     dailyUsers?.forEach((key) => {
//       dailyP.push({
//         name: moment(key?.date).format("dddd").slice(0, 3),
//         value: key?.postCount,
//       });
//     });
//   }

//   // console.log(dailyU);
//   return (
//     <BarChart width={300} height={320} data={dailyP}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="value" fill="#8884d8" />
//     </BarChart>
//   );
// }

// export default DailyPosts;
