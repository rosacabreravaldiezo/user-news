import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';

import ErrorPage from "./ErrorPage";
import Root from "./routes/Root";
import Index from "./routes/Home";

import UserDetail, { loader as UserDetailLoader } from "./routes/users/UserDetail";
import UserForm from "./routes/users/UserForm";
import UserCreate from "./routes/users/UserCreate";
import UserList, { loader as UserListLoader } from './routes/users/UserList';
import NewsList, { loader as NewsListLoader } from './routes/news/NewsList';
import NewsDetail, { loader as NewsDetailLoader } from './routes/news/NewsDetail';

import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "users",
        element: <UserList />,
        loader: UserListLoader
      },
      {
        path: "users/:userId",
        element: <UserDetail />,
        loader: UserDetailLoader
      },
      {
        path: "users/:userId/edit",
        element: <UserForm />,
        loader: UserDetailLoader
      },
      {
        path: "user",
        element: <UserCreate />
      },
      {
        path: "news",
        element: <NewsList />,
        loader: NewsListLoader
      },
      {
        path: "news/:newsId",
        element: <NewsDetail />,
        loader: NewsDetailLoader
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </I18nextProvider>
);
