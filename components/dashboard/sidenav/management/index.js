import Tour from './Tour';
import User from './User';
import Invoice from './Invoice';
import Account from './Account';
import SideMenuList from '../SideMenuList';

export default function Management() {
  return (
    <SideMenuList subHeader="MANAGEMENT">
      <Tour />
      <User />
      <Invoice />
      <Account />
    </SideMenuList>
  );
}
