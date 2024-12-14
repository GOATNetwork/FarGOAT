import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Award, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  reward: {
    amount: number;
    currency: string;
  };
  tags: string[];
  timeLeft?: string;
  status: 'active' | 'completed';
  participants?: number;
  onClick?: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  reward,
  tags,
  timeLeft,
  status,
  participants = 0,
  onClick
}) => {
  const isActive = status === 'active';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full w-full"
    >
      <Card 
        onClick={onClick}
        className={cn(
          "flex flex-col h-full",
          "bg-gray-100 dark:bg-[#121212]",
          "cursor-pointer transition-all duration-200 hover:shadow-lg"
        )}
      >
        <CardHeader className="flex-none">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 min-w-0">
              <CardTitle className="text-xl text-yellow-500 dark:text-[#FAF186] font-inter leading-tight truncate">
                {title}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="text-xs bg-[#9F9FF8] text-black dark:bg-[#92BFFF] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(
              "flex-none font-semibold text-right whitespace-nowrap",
              isActive ? "text-[#FAF186]" : "text-gray-500"
            )}>
              {reward.amount} {reward.currency}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 justify-between gap-4">
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>

          <div className="grid grid-cols-3 gap-2">
            {isActive && timeLeft && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-500 truncate">{timeLeft}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-500 truncate">
                {participants} users
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {status === 'active' ? (
                  <div className="flex items-center gap-1">
                    Active
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                ) : (
                  'Completed'
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestCard;