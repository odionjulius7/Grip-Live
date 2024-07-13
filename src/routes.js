/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Dashboard from "./views/Dashboard.js";
import UserProfile from "./views/UserProfile.js";
import Icons from "./views/Icons.js";
import Upgrade from "./views/Upgrade.js";
import Post from "./views/Post";
import Users from "./views/Users";
import Creators from "./views/Creators";
import SuspendedAcct from "./views/SuspendedAcct";
import CreatePost from "./views/CreatePost";
import Account from "./views/Account";
import Posts from "./views/Posts";
import CreateTags from "./views/CreateTags";
import Tags from "./views/Tags";
import SchedulePosts from "./views/SchedulePosts.jsx";
import PublishedPosts from "./views/PublishedPosts.jsx";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    // path: "/Tags",
    name: "Tags",
    icon: "nc-icon nc-badge",
    // component: CreatePost,
    layout: "/admin",
    children: [
      {
        path: "/create-tag",
        name: "Create Tag",
        icon: "nc-icon nc-circle-09",
        component: CreateTags,
        layout: "/admin",
      },
      {
        path: "/tag-list",
        name: "Tag List",
        icon: "nc-icon nc-circle-09",
        component: Tags,
        layout: "/admin",
      },
    ],
  },
  // {
  //   path: "/posts",
  //   name: "Post List",
  //   icon: "nc-icon nc-notes",
  //   component: Posts,
  //   layout: "/admin",
  // },
  {
    // path: "/posts",
    name: "Content Management",
    icon: "nc-icon nc-notes",
    layout: "/admin",
    children: [
      {
        path: "/posts",
        name: "Post List",
        icon: "nc-icon nc-notes",
        component: Posts,
        layout: "/admin",
      },
      {
        path: "/published-posts",
        name: "Published Posts",
        icon: "nc-icon nc-notes",
        component: PublishedPosts,
        layout: "/admin",
      },
      {
        path: "/scheduled-posts",
        name: "Scheduled Posts",
        icon: "nc-icon nc-notes",
        component: SchedulePosts,
        layout: "/admin",
      },
      {
        path: "/create-post",
        name: "Create Post",
        icon: "nc-icon nc-badge",
        component: CreatePost,
        layout: "/admin",
      },
    ],
  },

  {
    name: "User Management",
    icon: "nc-icon nc-single-02",
    layout: "/admin",
    children: [
      {
        path: "/users",
        name: "Users List",
        icon: "nc-icon nc-circle-09",
        component: Users,
        layout: "/admin",
      },
      {
        path: "/creators",
        name: "Creators List",
        icon: "nc-icon nc-circle-09",
        component: Creators,
        layout: "/admin",
      },
      {
        path: "/suspended",
        name: "Suspended Users",
        icon: "nc-icon nc-badge",
        component: SuspendedAcct,
        layout: "/admin",
      },
    ],
  },
  //
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/creators",
    name: "Creators",
    icon: "nc-icon nc-circle-09",
    component: Creators,
    layout: "/admin",
  },
  {
    path: "/suspended",
    name: "Suspended Users",
    icon: "nc-icon nc-badge",
    component: SuspendedAcct,
    layout: "/admin",
  },
  {
    path: "/create-post",
    name: "Create Post",
    icon: "nc-icon nc-badge",
    component: CreatePost,
    layout: "/admin",
  },
  //

  {
    path: "/posts",
    name: "Post List",
    icon: "nc-icon nc-notes",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/published-posts",
    name: "Published Post List",
    icon: "nc-icon nc-notes",
    component: PublishedPosts,
    layout: "/admin",
  },
  {
    path: "/scheduled-posts",
    name: "Scheduled Post List",
    icon: "nc-icon nc-notes",
    component: SchedulePosts,
    layout: "/admin",
  },

  {
    path: "/create-tag",
    name: "Create Tag",
    icon: "nc-icon nc-circle-09",
    component: CreateTags,
    layout: "/admin",
  },
  {
    path: "/tag-list",
    name: "Tag List",
    icon: "nc-icon nc-circle-09",
    component: Tags,
    layout: "/admin",
  },
  // {
  //   path: "/create-post",
  //   name: "Create Post",
  //   icon: "nc-icon nc-chat-round",
  //   component: CreatePost,
  //   layout: "/admin",
  // },
  {
    path: "/account",
    name: "Account",
    icon: "nc-icon nc-button-play",
    component: Account,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // ... Other routes
  {
    path: "/user/:id", // Use route parameter ":id"
    name: "User Profile", // Update the name
    icon: "nc-icon nc-single-02", // Update the icon
    component: UserProfile, // Create a new component for single user page
    layout: "/admin",
  },
  {
    path: "/post/:id", // post route parameter ":id"
    name: "Single Post", // Update the name
    icon: "nc-icon nc-single-02", // Update the icon
    component: Post, // Create a new component for single user page
    layout: "/admin",
  },
];

export default dashboardRoutes;
