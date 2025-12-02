import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { EventInput } from '@/hooks/useEvents';

interface EventFormProps {
  onSubmit: (event: EventInput) => void;
  onCancel?: () => void;
  initialData?: Partial<EventInput>;
  mode?: 'create' | 'edit';
}

const eventTypes = [
  { value: 'birthday', label: '🎂 Birthday' },
  { value: 'anniversary', label: '💍 Anniversary' },
  { value: 'memorial', label: '🕯️ Memorial' },
  { value: 'milestone', label: '🎯 Milestone' },
  { value: 'other', label: '📅 Other' },
];

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  mode = 'create',
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [eventType, setEventType] = useState(initialData?.event_type || 'birthday');
  const [date, setDate] = useState<Date | undefined>(
    initialData?.event_date ? new Date(initialData.event_date) : undefined
  );
  const [birthYear, setBirthYear] = useState<string>(
    initialData?.birth_year?.toString() || ''
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [notifyDaysBefore, setNotifyDaysBefore] = useState(
    initialData?.notify_days_before?.toString() || '7'
  );
  const [isRecurring, setIsRecurring] = useState(initialData?.is_recurring ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    onSubmit({
      name,
      event_type: eventType,
      event_date: format(date, 'yyyy-MM-dd'),
      birth_year: birthYear ? parseInt(birthYear) : null,
      notes: notes || null,
      notify_days_before: parseInt(notifyDaysBefore) || 7,
      is_recurring: isRecurring,
    });

    if (mode === 'create') {
      setName('');
      setDate(undefined);
      setBirthYear('');
      setNotes('');
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="h-5 w-5" />
          {mode === 'create' ? 'Add New Event' : 'Edit Event'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Mom's Birthday"
                required
              />
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Birth Year (optional) */}
            <div className="space-y-2">
              <Label htmlFor="birthYear">Birth Year (optional)</Label>
              <Input
                id="birthYear"
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="e.g., 1990"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Notify Days Before */}
            <div className="space-y-2">
              <Label htmlFor="notify">Notify days before</Label>
              <Select value={notifyDaysBefore} onValueChange={setNotifyDaysBefore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recurring */}
            <div className="space-y-2">
              <Label>Recurring yearly</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="recurring"
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
                <Label htmlFor="recurring" className="text-sm text-muted-foreground">
                  {isRecurring ? 'Yes' : 'No'}
                </Label>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
            <Button type="submit" variant="blue" disabled={!name || !date}>
              <Plus className="mr-2 h-4 w-4" />
              {mode === 'create' ? 'Add Event' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
