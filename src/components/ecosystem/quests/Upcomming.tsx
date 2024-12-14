import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Quest Completion Deadline for "Pump TOKEN to $1"',
    date: "2023-10-20",
    description: "Ensure to complete the quest before the deadline.",
  },
  {
    id: 2,
    title: 'New Quest Release: "Staking Challenge"',
    date: "2023-10-25",
    description: "Participate in the new staking challenge.",
  },
];

export default function UpcomingEvents() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Don’t miss out on these events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-4 p-2 rounded-lg bg-muted"
            >
              <Calendar className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
                <p className="text-sm mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
