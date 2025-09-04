import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CreditCard, Search, Crown, UserX, Shield, Ban } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  provider: string;
  role: string;
  is_banned?: boolean;
  created_at: string;
}

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  method: string;
  transaction_id: string;
  status: string;
  created_at: string;
  profiles: {
    display_name: string;
    email: string;
  } | null;
}

const AdminPage = () => {
  const { user, userRole, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (!loading && userRole !== 'admin') {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      return;
    }

    if (user && userRole === 'admin') {
      fetchData();
    }
  }, [user, userRole, loading, navigate]);

  const fetchData = async () => {
    await Promise.all([fetchUsers(), fetchPayments()]);
    setLoadingData(false);
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users data",
          variant: "destructive"
        });
      } else {
        const usersWithRoles = (data || []).map(profile => ({
          ...profile,
          role: Array.isArray(profile.user_roles) && profile.user_roles.length > 0 
            ? profile.user_roles[0].role 
            : 'user'
        }));
        setUsers(usersWithRoles);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const promoteToAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User promoted to admin successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Error",
        description: "Failed to promote user to admin",
        variant: "destructive"
      });
    }
  };

  const removeAdminRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'user' })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin role removed successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error('Error removing admin role:', error);
      toast({
        title: "Error",
        description: "Failed to remove admin role",
        variant: "destructive"
      });
    }
  };

  const banUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: true } as any)
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User banned successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      toast({
        title: "Error",
        description: "Failed to ban user",
        variant: "destructive"
      });
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_banned: false } as any)
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User unbanned successfully",
      });
      fetchUsers();
    } catch (error) {
      console.error('Error unbanning user:', error);
      toast({
        title: "Error",
        description: "Failed to unban user",
        variant: "destructive"
      });
    }
  };

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          user_id,
          amount,
          currency,
          method,
          transaction_id,
          status,
          created_at,
          profiles(display_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        toast({
          title: "Error", 
          description: "Failed to load payments data",
          variant: "destructive"
        });
      } else {
        const formattedData = (data || []).map(payment => ({
          ...payment,
          profiles: payment.profiles || { display_name: 'Unknown', email: 'Unknown' }
        }));
        setPayments(formattedData as Payment[]);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = !filterProvider || user.provider === filterProvider;
    return matchesSearch && matchesProvider;
  });

  const filteredPayments = payments.filter(payment => {
    const profiles = payment.profiles;
    const matchesSearch = 
      profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users and view payment transactions
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users, emails, or transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterProvider === '' ? 'default' : 'outline'}
                    onClick={() => setFilterProvider('')}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterProvider === 'google' ? 'default' : 'outline'}
                    onClick={() => setFilterProvider('google')}
                    size="sm"
                  >
                    Google
                  </Button>
                  <Button
                    variant={filterProvider === 'github' ? 'default' : 'outline'}
                    onClick={() => setFilterProvider('github')}
                    size="sm"
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users ({filteredUsers.length})
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payments ({filteredPayments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.display_name || 'N/A'}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.provider}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.role === 'admin' ? 'default' : 'secondary'}
                            >
                              {user.role === 'admin' ? (
                                <><Crown className="w-3 h-3 mr-1" />Admin</>
                              ) : (
                                <><Users className="w-3 h-3 mr-1" />User</>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.is_banned ? 'destructive' : 'outline'}
                            >
                              {user.is_banned ? 'Banned' : 'Active'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(user.created_at), 'PPP')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {user.role === 'admin' ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <UserX className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove Admin Role</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove admin role from {user.display_name}? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => removeAdminRole(user.user_id)}>
                                        Remove Admin
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Shield className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Promote to Admin</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to promote {user.display_name} to admin? They will have full access to the admin dashboard.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => promoteToAdmin(user.user_id)}>
                                        Promote to Admin
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                              
                              {user.is_banned ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Users className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Unban User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to unban {user.display_name}? They will regain access to the application.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => unbanUser(user.user_id)}>
                                        Unban User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Ban className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Ban User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to ban {user.display_name}? This will prevent them from accessing the application.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => banUser(user.user_id)}>
                                        Ban User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {payment.profiles?.display_name || 'N/A'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {payment.profiles?.email || 'Unknown'}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {payment.currency.toUpperCase()} {payment.amount}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{payment.method}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {payment.transaction_id}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={payment.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(payment.created_at), 'PPP')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;