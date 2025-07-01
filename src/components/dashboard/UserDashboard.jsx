'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar as CalendarIcon, 
  CreditCard, 
  Play, 
  Pause, 
  X, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

export default function UserDashboard() {
  const [pauseDate, setPauseDate] = useState();
  const [resumeDate, setResumeDate] = useState();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);

  // Mock subscription data
  const subscription = {
    id: '1',
    planName: 'Premium Weekly Plan',
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    totalPrice: 299000,
    status: 'active',
    nextDelivery: '2025-01-20',
    startDate: '2025-01-01'
  };

  const handlePauseSubscription = () => {
    if (pauseDate && resumeDate) {
      console.log('Pausing subscription from', pauseDate, 'to', resumeDate);
      setShowPauseDialog(false);
      setPauseDate(undefined);
      setResumeDate(undefined);
    }
  };

  const handleCancelSubscription = () => {
    console.log('Cancelling subscription');
    setShowCancelDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'paused':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your SEA Catering subscription</p>
      </div>

      {/* Active Subscription Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Active Subscription</CardTitle>
              <CardDescription>Your current meal plan details</CardDescription>
            </div>
            <Badge className={`${getStatusColor(subscription.status)} flex items-center gap-1`}>
              {getStatusIcon(subscription.status)}
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
              <p className="text-lg font-semibold">{subscription.planName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Meal Types</p>
              <div className="flex flex-wrap gap-1">
                {subscription.mealTypes.map((meal) => (
                  <Badge key={meal} variant="secondary" className="text-xs">
                    {meal}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Delivery Days</p>
              <div className="flex flex-wrap gap-1">
                {subscription.deliveryDays.map((day) => (
                  <Badge key={day} variant="outline" className="text-xs">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Price</p>
              <p className="text-lg font-semibold text-primary">
                Rp {subscription.totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Next Delivery</p>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                {format(new Date(subscription.nextDelivery), 'EEEE, MMMM dd, yyyy')}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Subscription Start</p>
              <p className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                {format(new Date(subscription.startDate), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause Subscription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pause Subscription</DialogTitle>
                  <DialogDescription>
                    Select the date range for pausing your subscription. No charges will be applied during this period.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pause From</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pauseDate ? format(pauseDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={pauseDate}
                            onSelect={setPauseDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resume On</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {resumeDate ? format(resumeDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={resumeDate}
                            onSelect={setResumeDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  {pauseDate && resumeDate && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your subscription will be paused from {format(pauseDate, 'PPP')} to {format(resumeDate, 'PPP')}.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPauseDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePauseSubscription}
                    disabled={!pauseDate || !resumeDate}
                  >
                    Pause Subscription
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Cancel Subscription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Subscription</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel your subscription? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You will lose access to your meal plan and all future deliveries will be stopped.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Subscription
                  </Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Yes, Cancel Subscription
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">Rp 1,196,000</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Delivery</p>
                <p className="text-2xl font-bold">2 days</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}