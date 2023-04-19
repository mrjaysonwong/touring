import Dashboard from './Dashboard';
import SideMenuList from '../SideMenuList';

export default function General() {
  return (
    <SideMenuList subHeader={'GENERAL'}>
      <Dashboard />
    </SideMenuList>
  );
}
