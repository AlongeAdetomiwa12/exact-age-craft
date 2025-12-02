import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Download, 
  Plus, 
  Share2, 
  Bell, 
  BellOff, 
  Clock, 
  Gift, 
  FileJson, 
  FileSpreadsheet,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { EventForm } from '@/components/EventForm';
import { EventsList } from '@/components/EventsList';
import { AgeCard } from '@/components/AgeCard';
import { Link } from 'react-router-dom';

const zodiacSigns: Record<number, string> = {
  1: 'Capricorn/Aquarius',
  2: 'Aquarius/Pisces',
  3: 'Pisces/Aries',
  4: 'Aries/Taurus',
  5: 'Taurus/Gemini',
  6: 'Gemini/Cancer',
  7: 'Cancer/Leo',
  8: 'Leo/Virgo',
  9: 'Virgo/Libra',
  10: 'Libra/Scorpio',
  11: 'Scorpio/Sagittarius',
  12: 'Sagittarius/Capricorn',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { events, loading, addEvent, deleteEvent, getUpcomingEvents, getRecentEvents, exportData } = useEvents();
  const { isSupported, isSubscribed, subscribe, unsubscribe } = usePushNotifications();
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAgeCard, setShowAgeCard] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState<{name: string; date: Date; zodiac: string} | null>(null);

  const upcomingEvents = useMemo(() => getUpcomingEvents(), [getUpcomingEvents]);
  const recentEvents = useMemo(() => getRecentEvents(), [getRecentEvents]);

  // Find user's own birthday event
  const userBirthday = useMemo(() => {
    return events.find(e => e.event_type === 'birthday' && e.name.toLowerCase().includes('my') || e.name.toLowerCase().includes('me'));
  }, [events]);

  const handleGenerateAgeCard = (event?: typeof events[0]) => {
    if (event && event.birth_year) {
      const date = new Date(event.event_date);
      date.setFullYear(event.birth_year);
      setSelectedBirthday({
        name: event.name.replace(/['']s?\s*(birthday|bday)/gi, '').trim() || 'You',
        date,
        zodiac: zodiacSigns[date.getMonth() + 1] || 'Unknown',
      });
    } else {
          // Default to a sample
          setSelectedBirthday({
            name: user?.email?.split('@')[0] || 'You',
        date: new Date(1995, 5, 15),
        zodiac: 'Gemini',
      });
    }
    setShowAgeCard(true);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sign in to track birthdays, events, and create beautiful age cards to share!
          </p>
          <Link to="/auth">
            <Button variant="blue" size="lg">
              Sign In to Continue
            </Button>
          </Link>
        </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Track your important dates and never miss a celebration.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{events.length}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
                <Calendar className="h-8 w-8 text-primary opacity-60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border-pink-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming (30d)</p>
                </div>
                <Gift className="h-8 w-8 text-pink-500 opacity-60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{events.filter(e => e.event_type === 'birthday').length}</p>
                  <p className="text-sm text-muted-foreground">Birthdays</p>
                </div>
                <Users className="h-8 w-8 text-green-500 opacity-60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{recentEvents.length}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-500 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
              <DialogTrigger asChild>
                <Button variant="blue">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <EventForm 
                  onSubmit={(data) => {
                    addEvent(data);
                    setShowEventForm(false);
                  }}
                  onCancel={() => setShowEventForm(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={showAgeCard} onOpenChange={setShowAgeCard}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => handleGenerateAgeCard()}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Create Age Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Your Age Card</DialogTitle>
                </DialogHeader>
                {selectedBirthday && (
                  <AgeCard 
                    name={selectedBirthday.name}
                    birthDate={selectedBirthday.date}
                    zodiacSign={selectedBirthday.zodiac}
                  />
                )}
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => exportData('json')}>
              <FileJson className="mr-2 h-4 w-4" />
              Export JSON
            </Button>

            <Button variant="outline" onClick={() => exportData('csv')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export CSV
            </Button>

            {isSupported && (
              <Button 
                variant={isSubscribed ? "secondary" : "outline"}
                onClick={isSubscribed ? unsubscribe : subscribe}
              >
                {isSubscribed ? (
                  <>
                    <BellOff className="mr-2 h-4 w-4" />
                    Disable Notifications
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Enable Notifications
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="upcoming">
                <Clock className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="all">
                <Calendar className="mr-2 h-4 w-4" />
                All Events
              </TabsTrigger>
              <TabsTrigger value="add">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <EventsList
                  events={upcomingEvents}
                  onDelete={deleteEvent}
                  title="Coming Up"
                  emptyMessage="No events in the next 30 days"
                />
                
                {/* Next up highlight */}
                {upcomingEvents[0] && (
                  <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Next Celebration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="text-4xl mb-2">
                          {upcomingEvents[0].event_type === 'birthday' ? '🎂' : '🎉'}
                        </div>
                        <h3 className="text-xl font-bold mb-1">{upcomingEvents[0].name}</h3>
                        <p className="text-muted-foreground mb-4">
                          {upcomingEvents[0].daysUntil === 0 
                            ? "Today!" 
                            : upcomingEvents[0].daysUntil === 1 
                              ? "Tomorrow!" 
                              : `In ${upcomingEvents[0].daysUntil} days`}
                        </p>
                        {upcomingEvents[0].birth_year && (
                          <Button 
                            variant="blue" 
                            size="sm"
                            onClick={() => handleGenerateAgeCard(upcomingEvents[0])}
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Create Age Card
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <EventsList
                events={events}
                onDelete={deleteEvent}
                title="All Events"
                emptyMessage="No events added yet. Add your first event!"
                showAge={true}
              />
            </TabsContent>

            <TabsContent value="add">
              <EventForm 
                onSubmit={(data) => {
                  addEvent(data);
                }}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
  );
}
