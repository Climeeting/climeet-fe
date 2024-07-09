import { useLocation } from "react-router-dom";

export default function useIsMine() {
  const { pathname } = useLocation()
  return pathname === '/user/my'
}