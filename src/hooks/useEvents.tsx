import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Event {
  id: string;
  user_id: string;
  name: string;
  event_type: string;
  event_date: string;
  birth_year: number | null;
  notes: string | null;
  notify_days_before: number;
  is_recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventInput {
  name: string;
  event_type: string;
  event_date: string;
  birth_year?: number | null;
  notes?: string | null;
  notify_days_before?: number;
  is_recurring?: boolean;
}

export function useEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents((data as Event[]) || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = async (eventData: EventInput) => {
    if (!user) {
      toast.error('Please sign in to add events');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => [...prev, data as Event].sort((a, b) => 
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      ));
      toast.success('Event added successfully!');
      return data;
    } catch (error: any) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
      return null;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<EventInput>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => prev.map(e => e.id === id ? (data as Event) : e));
      toast.success('Event updated!');
      return data;
    } catch (error: any) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
      return null;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setEvents(prev => prev.filter(e => e.id !== id));
      toast.success('Event deleted');
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  // Get upcoming events (next 30 days)
  const getUpcomingEvents = useCallback(() => {
    const today = new Date();
    const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      const thisYearEvent = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      
      if (thisYearEvent < today) {
        thisYearEvent.setFullYear(today.getFullYear() + 1);
      }
      
      return thisYearEvent >= today && thisYearEvent <= thirtyDaysLater;
    }).map(event => {
      const eventDate = new Date(event.event_date);
      const thisYearEvent = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      if (thisYearEvent < today) {
        thisYearEvent.setFullYear(today.getFullYear() + 1);
      }
      const daysUntil = Math.ceil((thisYearEvent.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { ...event, daysUntil, nextOccurrence: thisYearEvent };
    }).sort((a, b) => a.daysUntil - b.daysUntil);
  }, [events]);

  // Get recent events (past 7 days)
  const getRecentEvents = useCallback(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      const thisYearEvent = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return thisYearEvent >= sevenDaysAgo && thisYearEvent < today;
    });
  }, [events]);

  // Export data
  const exportData = (format: 'json' | 'csv') => {
    if (events.length === 0) {
      toast.error('No events to export');
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(events, null, 2);
      filename = 'age-events-export.json';
      mimeType = 'application/json';
    } else {
      const headers = ['Name', 'Type', 'Date', 'Birth Year', 'Notes', 'Notify Days Before', 'Recurring'];
      const rows = events.map(e => [
        e.name,
        e.event_type,
        e.event_date,
        e.birth_year || '',
        e.notes || '',
        e.notify_days_before,
        e.is_recurring
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      filename = 'age-events-export.csv';
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getRecentEvents,
    exportData,
    refetch: fetchEvents,
  };
}
