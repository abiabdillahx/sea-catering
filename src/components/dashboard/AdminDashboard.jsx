'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users, 
  CreditCard,
  RotateCcw,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: new Date()
  });
  const [quickFilter, setQuickFilter] = useState('30d');

  // Mock data - replace with actual API calls
  const metrics = {
    newSubscriptions: 156,
    monthlyRecurringRevenue: 24800000,
    reactivations: 23,
    activeSubscriptions: 1247,
    trends: {
      newSubscriptions: 12.5,
      monthlyRecurringRevenue: 8.2,
      reactivations: -5.1,
      activeSubscriptions: 15.3
    }
  };

  const handleQuickFilter = (value) => {
    setQuickFilter(value);
    const now = new Date();
    switch (value) {
      case '7d':
        setDateRange({ from: subDays(now, 7), to: now });
        break;
      case '30d':
        setDateRange({ from: subDays(now, 30), to: now });
        break;
      case '90d':
        setDateRange({ from: subDays(now, 90), to: now });
        break;
      case '1y':
        setDateRange({ from: subMonths(now, 12), to: now });
        break;
      default:
        break;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <>
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">SEA Catering business metrics and insights</p>
      </div>

      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Filter</CardTitle>
          <CardDescription>Select a date range to filter the dashboard metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="min-w-[200px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Pick a date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quick filters:</span>
              <Select value={quickFilter} onValueChange={handleQuickFilter}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                  <SelectItem value="1y">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* New Subscriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.newSubscriptions.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(metrics.trends.newSubscriptions)}
              <span className={`ml-1 ${getTrendColor(metrics.trends.newSubscriptions)}`}>
                {Math.abs(metrics.trends.newSubscriptions)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Recurring Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.monthlyRecurringRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(metrics.trends.monthlyRecurringRevenue)}
              <span className={`ml-1 ${getTrendColor(metrics.trends.monthlyRecurringRevenue)}`}>
                {Math.abs(metrics.trends.monthlyRecurringRevenue)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Reactivations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reactivations</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.reactivations.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(metrics.trends.reactivations)}
              <span className={`ml-1 ${getTrendColor(metrics.trends.reactivations)}`}>
                {Math.abs(metrics.trends.reactivations)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSubscriptions.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(metrics.trends.activeSubscriptions)}
              <span className={`ml-1 ${getTrendColor(metrics.trends.activeSubscriptions)}`}>
                {Math.abs(metrics.trends.activeSubscriptions)}% from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest subscription activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'new', user: 'John Doe', plan: 'Premium Weekly', time: '2 hours ago' },
                { type: 'pause', user: 'Jane Smith', plan: 'Basic Daily', time: '4 hours ago' },
                { type: 'reactivate', user: 'Bob Johnson', plan: 'Premium Monthly', time: '6 hours ago' },
                { type: 'cancel', user: 'Alice Brown', plan: 'Basic Weekly', time: '8 hours ago' },
                { type: 'new', user: 'Charlie Wilson', plan: 'Premium Daily', time: '10 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'new' ? 'bg-green-500' :
                      activity.type === 'pause' ? 'bg-yellow-500' :
                      activity.type === 'reactivate' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === 'new' ? 'Subscribed to' :
                         activity.type === 'pause' ? 'Paused' :
                         activity.type === 'reactivate' ? 'Reactivated' :
                         'Cancelled'} {activity.plan}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Plans</CardTitle>
            <CardDescription>Most subscribed meal plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Premium Weekly', subscribers: 342, revenue: 8500000 },
                { name: 'Basic Daily', subscribers: 289, revenue: 6200000 },
                { name: 'Premium Monthly', subscribers: 234, revenue: 7800000 },
                { name: 'Basic Weekly', subscribers: 198, revenue: 4100000 },
                { name: 'Premium Daily', subscribers: 184, revenue: 5200000 }
              ].map((plan, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">{plan.subscribers} subscribers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(plan.revenue)}</p>
                    <p className="text-xs text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}