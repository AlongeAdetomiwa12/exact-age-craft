import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit2, Gift, Heart, Star, Calendar, Bell } from 'lucide-react';
import { Event } from '@/hooks/useEvents';
import { format, differenceInYears } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface EventsListProps {
  events: (Event & { daysUntil?: number; nextOccurrence?: Date })[];
  onDelete?: (id: string) => void;
  onEdit?: (event: Event) => void;
  title?: string;
  emptyMessage?: string;
  showAge?: boolean;
}

const eventIcons: Record<string, React.ReactNode> = {
  birthday: <Gift className="h-4 w-4" />,
  anniversary: <Heart className="h-4 w-4" />,
  milestone: <Star className="h-4 w-4" />,
  memorial: <Bell className="h-4 w-4" />,
  other: <Calendar className="h-4 w-4" />,
};

const eventColors: Record<string, string> = {
  birthday: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  anniversary: 'bg-red-500/10 text-red-500 border-red-500/20',
  milestone: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  memorial: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  other: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

export const EventsList: React.FC<EventsListProps> = ({
  events,
  onDelete,
  onEdit,
  title = 'Events',
  emptyMessage = 'No events yet',
  showAge = true,
}) => {
  const getAge = (event: Event) => {
    if (!event.birth_year) return null;
    const eventDate = new Date(event.event_date);
    const today = new Date();
    let nextOccurrence = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    if (nextOccurrence < today) {
      nextOccurrence.setFullYear(today.getFullYear() + 1);
    }
    return nextOccurrence.getFullYear() - event.birth_year;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {title}
          <Badge variant="secondary" className="ml-auto">
            {events.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {events.map((event, index) => {
                const age = showAge ? getAge(event) : null;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    {/* Icon */}
                    <div className={`p-2 rounded-full ${eventColors[event.event_type] || eventColors.other}`}>
                      {eventIcons[event.event_type] || eventIcons.other}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{event.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{format(new Date(event.event_date), 'MMM d')}</span>
                        {age && (
                          <Badge variant="outline" className="text-xs">
                            Turning {age}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Days until */}
                    {event.daysUntil !== undefined && (
                      <div className="text-right">
                        {event.daysUntil === 0 ? (
                          <Badge className="bg-primary text-primary-foreground">Today! 🎉</Badge>
                        ) : event.daysUntil === 1 ? (
                          <Badge variant="secondary">Tomorrow</Badge>
                        ) : (
                          <div className="text-sm">
                            <span className="font-semibold text-primary">{event.daysUntil}</span>
                            <span className="text-muted-foreground ml-1">days</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    {(onEdit || onDelete) && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit(event)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDelete(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
