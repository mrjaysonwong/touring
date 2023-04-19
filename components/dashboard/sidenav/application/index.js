import Email from './components/Email';
import Calendar from './components/Calendar';
import SideMenuList from '../SideMenuList';

export default function Application() {
  return (
    <SideMenuList subHeader="APPLICATION">
      <Email />
      <Calendar />
    </SideMenuList>
  );
}
