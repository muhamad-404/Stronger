import { Outlet } from 'react-router-dom';

/** Nested Food routes share AppLayout; this is a pass-through outlet. */
export default function EatLayout() {
  return <Outlet />;
}
