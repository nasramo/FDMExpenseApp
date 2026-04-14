import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SubmitExpense } from './pages/SubmitExpense';
import { Requests } from './pages/Requests';
import { Approvals } from './pages/Approvals';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'submit',
        Component: SubmitExpense,
      },
      {
        path: 'requests',
        Component: Requests,
      },
      {
        path: 'approvals',
        Component: Approvals,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]);
