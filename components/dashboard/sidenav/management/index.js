import Tours from './Tours';
import Users from './Users';
import Invoice from './Invoice';
import Account from './Account';
import SideMenuList from '../SideMenuList';

export default function Management() {
  return (
    <SideMenuList subHeader="MANAGEMENT">
      <Tours />
      <Users />
      <Invoice />
      <Account />
    </SideMenuList>
  );
}
