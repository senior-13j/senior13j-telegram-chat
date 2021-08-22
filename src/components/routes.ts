import { Chat } from './Chat/Chat';
import { Login } from './Login/Login';
export const CHAT_ROUTE = '/chat';
export const LOGIN_ROUTE = '/login';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: Login
  }
]

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    component: Chat
  }
]