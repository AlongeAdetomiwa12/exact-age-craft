-- Create events/birthdays table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'birthday',
  event_date DATE NOT NULL,
  birth_year INTEGER,
  notes TEXT,
  notify_days_before INTEGER DEFAULT 7,
  is_recurring BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own events"
ON public.events FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own events"
ON public.events FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
ON public.events FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
ON public.events FOR DELETE
USING (auth.uid() = user_id);

-- Update trigger
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create push subscriptions table for web push notifications
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, endpoint)
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own subscriptions"
ON public.push_subscriptions FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);