import Layout from '@components/dashboard/Layout';
import ReportsOne from './components/Reports-1';
import ReportsTwo from './components/Reports-2';

export default function ReportsDashboard() {
  return (
    <Layout>
      <ReportsOne />
      <ReportsTwo />
    </Layout>
  );
}
