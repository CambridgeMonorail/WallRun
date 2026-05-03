import { FC } from 'react';
import { SignageExample } from './components/SignageExample';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  LayoutDashboard,
} from 'lucide-react';
import {
  CTABanner,
  SignageContainer,
  SignageHeader,
  MetricCard,
} from '@wallrun/shadcnui-signage';

export const KPIDashboard: FC = () => {
  return (
    <SignageExample>
      <SignageContainer variant="emerald" data-testid="kpi-dashboard">
        <SignageHeader
          tag="Live Metrics"
          tagVariant="emerald"
          title="Performance Dashboard"
          subtitle="Real-time metrics • Updated every 5 minutes"
        />

        <div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-10"
          data-testid="kpi-dashboard-grid"
        >
          <MetricCard
            title="Total Revenue"
            value="$1.2M"
            change="+12.5% vs last month"
            isPositive={true}
            icon={<DollarSign className="w-14 h-14" />}
          />
          <MetricCard
            title="Active Users"
            value="24,892"
            change="+8.3% vs last week"
            isPositive={true}
            icon={<Users className="w-14 h-14" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="-0.4% vs last month"
            isPositive={false}
            icon={<TrendingUp className="w-14 h-14" />}
          />
          <MetricCard
            title="Orders Today"
            value="1,847"
            change="+15.7% vs yesterday"
            isPositive={true}
            icon={<ShoppingCart className="w-14 h-14" />}
          />
        </div>

        <footer className="mt-10 text-center sm:mt-12 lg:mt-16">
          <CTABanner
            message="Dashboard powered by WallRun • Digital signage toolkit"
            icon={LayoutDashboard}
          />
        </footer>
      </SignageContainer>
    </SignageExample>
  );
};
