import { metrics } from "../_utils/analytics-data";
import { ComparisonBarChart } from "./_components/comparision-chart";
import { Sales } from "./_components/line-chart";
import { MetricCard } from "./_components/metric-cards";

const Analytics = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl space-y-8 font-inter">
      <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Analytics
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={`${metric.title}-${index}`} {...metric} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight pt-4">
          Real-Time Analysis
        </div>
        <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-sm text-white/40 font-inter leading-tight">
          Live data updates every 5 seconds
        </div>
      </div>
      <div>
        <Sales />
      </div>
      <div className="flex flex-col gap-1">
        <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight pt-4">
          Comparision
        </div>
        <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-sm text-white/40 font-inter leading-tight">
          Live data updates every 5 seconds
        </div>
        <div className="pt-6">
            <ComparisonBarChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
