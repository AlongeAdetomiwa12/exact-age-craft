import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  CreditCard, 
  Layers, 
  Cloud, 
  Brain, 
  BeakerIcon,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

const SettingsPage = () => {
  const { user, userRole } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || '');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account preferences and application settings
            </p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Apps</span>
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                <span className="hidden sm:inline">Cloud</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Knowledge</span>
              </TabsTrigger>
              <TabsTrigger value="experimental" className="flex items-center gap-2">
                <BeakerIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Labs</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Settings */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and profile settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Role</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
                        {userRole || 'user'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {userRole === 'admin' ? 'You have administrative privileges' : 'Standard user account'}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the application looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Theme</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button
                        variant={theme === 'system' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('system')}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        System
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your calculations and milestones
                        </p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save Calculations</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your calculations to history
                        </p>
                      </div>
                      <Switch
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription & Tokens */}
            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription, payments, and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 border rounded-lg bg-gradient-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Free Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          Basic age calculation features
                        </p>
                      </div>
                      <Badge variant="secondary">Current Plan</Badge>
                    </div>
                    <ul className="text-sm space-y-2 mb-4 text-muted-foreground">
                      <li>• Basic age calculations</li>
                      <li>• Zodiac sign detection</li>
                      <li>• Birthday countdown</li>
                      <li>• Activity history (last 30 days)</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Upgrade to Premium
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Methods</h4>
                    <p className="text-sm text-muted-foreground">
                      No payment methods on file. Add a payment method to upgrade to premium.
                    </p>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applications */}
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Applications</CardTitle>
                  <CardDescription>
                    Manage third-party integrations and connected services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Layers className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No applications connected</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect external applications to enhance your experience
                    </p>
                    <Button variant="outline">Browse Integrations</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cloud */}
            <TabsContent value="cloud" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cloud Storage & Sync</CardTitle>
                  <CardDescription>
                    Manage your data synchronization and backup settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cloud Backup</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically backup your calculations and preferences
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cross-device Sync</Label>
                        <p className="text-sm text-muted-foreground">
                          Sync your data across all your devices
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Storage Usage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Calculations stored</span>
                        <span>0 / 1,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-0"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Knowledge */}
            <TabsContent value="knowledge" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>
                    Customize your learning preferences and knowledge insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Brain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Knowledge features coming soon</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're working on personalized insights and learning recommendations
                    </p>
                    <Button variant="outline" disabled>Join Waitlist</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experimental Features */}
            <TabsContent value="experimental" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Experimental Features</CardTitle>
                  <CardDescription>
                    Try out new features before they're officially released
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Age Prediction</Label>
                        <p className="text-sm text-muted-foreground">
                          Use AI to predict biological age from photos (Beta)
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Advanced Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Enhanced charts and insights (Beta)
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Social Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Share age cards and milestones (Alpha)
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Experimental features may be unstable and are subject to change.
                      Your feedback helps us improve these features before their official release.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;