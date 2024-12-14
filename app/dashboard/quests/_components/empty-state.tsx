import { Award } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const QuestEmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-[#1E1E1E]/50">
      <div className="rounded-full bg-gray-100 dark:bg-[#2A2A2A] p-3 mb-4">
        <Award className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default QuestEmptyState;