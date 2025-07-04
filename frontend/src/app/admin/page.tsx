"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Store,
  Truck,
  DollarSign,
  Search,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  BarChart3,
  Download,
  RefreshCw,
  Settings,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Ban,
  UserCheck,
  Crown,
  Zap,
  Target,
  Globe,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "customer",
    status: "active",
    joinDate: "2024-01-15",
    orders: 12,
    totalSpent: 156.78,
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    verified: true,
  },
  {
    id: 2,
    name: "Fresh Corner",
    email: "contact@freshcorner.com",
    type: "vendor",
    status: "active",
    joinDate: "2024-01-10",
    orders: 156,
    totalSpent: 2450.0,
    lastActive: "5 min ago",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Brooklyn, NY",
    verified: true,
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@example.com",
    type: "delivery",
    status: "active",
    joinDate: "2024-01-12",
    orders: 89,
    totalSpent: 445.25,
    lastActive: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Manhattan, NY",
    verified: true,
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "customer",
    status: "suspended",
    joinDate: "2024-01-08",
    orders: 3,
    totalSpent: 45.67,
    lastActive: "3 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Queens, NY",
    verified: false,
  },
];

const vendors = [
  {
    id: 1,
    name: "Fresh Corner",
    email: "contact@freshcorner.com",
    status: "active",
    revenue: 2450,
    orders: 156,
    rating: 4.8,
    commission: 245.0,
    joinDate: "2024-01-10",
    category: "Premium",
    growth: 12.5,
  },
  {
    id: 2,
    name: "Healthy Hub",
    email: "info@healthyhub.com",
    status: "active",
    revenue: 1890,
    orders: 98,
    rating: 4.9,
    commission: 189.0,
    joinDate: "2024-01-15",
    category: "Health",
    growth: 8.3,
  },
  {
    id: 3,
    name: "Berry Bliss",
    email: "hello@berrybliss.com",
    status: "pending",
    revenue: 0,
    orders: 0,
    rating: 0,
    commission: 0,
    joinDate: "2024-01-20",
    category: "Specialty",
    growth: 0,
  },
];

const deliveryPartners = [
  {
    id: 1,
    name: "Mike Wilson",
    email: "mike@example.com",
    status: "active",
    earnings: 340,
    deliveries: 89,
    rating: 4.9,
    efficiency: 95,
    joinDate: "2024-01-12",
    vehicle: "Bike",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    earnings: 280,
    deliveries: 67,
    rating: 4.7,
    efficiency: 88,
    joinDate: "2024-01-18",
    vehicle: "Scooter",
  },
  {
    id: 3,
    name: "Tom Brown",
    email: "tom@example.com",
    status: "inactive",
    earnings: 120,
    deliveries: 23,
    rating: 4.5,
    efficiency: 72,
    joinDate: "2024-01-25",
    vehicle: "Car",
  },
];

const platformStats = {
  totalUsers: 1234,
  activeVendors: 45,
  deliveryPartners: 89,
  totalRevenue: 45678,
  monthlyGrowth: 18.5,
  orderVolume: 2456,
  avgOrderValue: 18.65,
  customerSatisfaction: 4.7,
};

const recentActivity = [
  {
    id: 1,
    type: "vendor_registration",
    title: "New vendor registered",
    description: "Berry Paradise joined the platform",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    type: "large_order",
    title: "Large order completed",
    description: "$89.50 order delivered successfully",
    time: "5 min ago",
    status: "success",
  },
  {
    id: 3,
    type: "delivery_partner",
    title: "Delivery partner joined",
    description: "Alex Johnson started delivering",
    time: "12 min ago",
    status: "info",
  },
  {
    id: 4,
    type: "dispute",
    title: "Dispute reported",
    description: "Order #ORD-456 requires attention",
    time: "18 min ago",
    status: "warning",
  },
  {
    id: 5,
    type: "system",
    title: "System maintenance",
    description: "Scheduled maintenance completed",
    time: "1 hour ago",
    status: "info",
  },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "inactive":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "vendor_registration":
        return <Store className="h-4 w-4 text-emerald-600" />;
      case "large_order":
        return <DollarSign className="h-4 w-4 text-blue-600" />;
      case "delivery_partner":
        return <Truck className="h-4 w-4 text-purple-600" />;
      case "dispute":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "system":
        return <Settings className="h-4 w-4 text-slate-600" />;
      default:
        return <Activity className="h-4 w-4 text-slate-600" />;
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-emerald-50 border-emerald-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === "all" || user.type === userFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Executive Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                >
                  FreshJuice Admin
                </Link>
                <p className="text-sm text-slate-600 font-medium">
                  Enterprise Management Console
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-slate-700">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hover:bg-slate-50 rounded-xl border-slate-200 bg-transparent"
              >
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Alerts</span>
                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  3
                </Badge>
              </Button>

              <Button
                variant="outline"
                className="hover:bg-slate-50 rounded-xl border-slate-200 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>

              <Button
                variant="outline"
                className="hover:bg-slate-50 rounded-xl border-slate-200 bg-transparent"
              >
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>

              <Link href="/">
                <Button
                  variant="ghost"
                  className="hover:bg-slate-50 rounded-xl"
                >
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Executive Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card className="col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold">
                    {platformStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-blue-200 text-xs">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-100" />
                </div>
              </div>
              <div className="w-full bg-blue-500/30 rounded-full h-2">
                <div
                  className="bg-blue-200 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Platform Revenue
                  </p>
                  <p className="text-3xl font-bold">
                    ${platformStats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-emerald-200 text-xs">
                    +{platformStats.monthlyGrowth}% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-100" />
                </div>
              </div>
              <div className="w-full bg-emerald-500/30 rounded-full h-2">
                <div
                  className="bg-emerald-200 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs font-medium">
                    Active Vendors
                  </p>
                  <p className="text-2xl font-bold">
                    {platformStats.activeVendors}
                  </p>
                </div>
                <Store className="h-6 w-6 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-600 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs font-medium">
                    Delivery Partners
                  </p>
                  <p className="text-2xl font-bold">
                    {platformStats.deliveryPartners}
                  </p>
                </div>
                <Truck className="h-6 w-6 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-xs font-medium">
                    Order Volume
                  </p>
                  <p className="text-2xl font-bold">
                    {platformStats.orderVolume}
                  </p>
                </div>
                <BarChart3 className="h-6 w-6 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-600 to-teal-700 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-xs font-medium">Avg Order</p>
                  <p className="text-2xl font-bold">
                    ${platformStats.avgOrderValue}
                  </p>
                </div>
                <Target className="h-6 w-6 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Dashboard */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics Dashboard
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Shield className="h-4 w-4 mr-2" />
            Security Center
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Globe className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            System Health
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            <TabsTrigger
              value="users"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="vendors"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Store className="h-4 w-4 mr-2" />
              Vendor Oversight
            </TabsTrigger>
            <TabsTrigger
              value="delivery"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Truck className="h-4 w-4 mr-2" />
              Delivery Network
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Business Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    User Management Console
                  </CardTitle>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 rounded-xl border-slate-200"
                      />
                    </div>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-40 rounded-xl border-slate-200">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="customer">Customers</SelectItem>
                        <SelectItem value="vendor">Vendors</SelectItem>
                        <SelectItem value="delivery">
                          Delivery Partners
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="outline" className="px-3 py-1">
                      {filteredUsers.length} users
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-semibold">User</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">
                          Activity
                        </TableHead>
                        <TableHead className="font-semibold">
                          Performance
                        </TableHead>
                        <TableHead className="font-semibold">
                          Location
                        </TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className="hover:bg-slate-50/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={user.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-semibold">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-slate-900">
                                    {user.name}
                                  </p>
                                  {user.verified && (
                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                  )}
                                </div>
                                <p className="text-sm text-slate-600">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                user.type === "vendor"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : user.type === "delivery"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-purple-50 text-purple-700 border-purple-200"
                              } font-medium`}
                            >
                              {user.type === "vendor" && (
                                <Store className="h-3 w-3 mr-1" />
                              )}
                              {user.type === "delivery" && (
                                <Truck className="h-3 w-3 mr-1" />
                              )}
                              {user.type === "customer" && (
                                <Users className="h-3 w-3 mr-1" />
                              )}
                              {user.type.charAt(0).toUpperCase() +
                                user.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusColor(
                                user.status
                              )} font-medium`}
                            >
                              {user.status === "active" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {user.status === "suspended" && (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {user.status === "inactive" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900">
                                {user.orders} orders
                              </p>
                              <p className="text-xs text-slate-600">
                                Last: {user.lastActive}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-emerald-600">
                                ${user.totalSpent.toFixed(2)}
                              </p>
                              <p className="text-xs text-slate-600">
                                Total value
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-slate-600">
                              {user.location}
                            </p>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-lg"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {user.status === "active" ? (
                                    <>
                                      <Ban className="h-4 w-4 mr-2" />
                                      Suspend User
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Activate User
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  Vendor Management Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-semibold">Vendor</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">
                          Performance
                        </TableHead>
                        <TableHead className="font-semibold">Revenue</TableHead>
                        <TableHead className="font-semibold">
                          Commission
                        </TableHead>
                        <TableHead className="font-semibold">Growth</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow
                          key={vendor.id}
                          className="hover:bg-slate-50/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-400 text-white font-semibold">
                                  {vendor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-slate-900">
                                    {vendor.name}
                                  </p>
                                  {vendor.status === "active" && (
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                                <p className="text-sm text-slate-600">
                                  {vendor.email}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="text-xs mt-1"
                                >
                                  {vendor.category}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusColor(
                                vendor.status
                              )} font-medium`}
                            >
                              {vendor.status === "active" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {vendor.status === "pending" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {vendor.status.charAt(0).toUpperCase() +
                                vendor.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {vendor.orders} orders
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {vendor.rating > 0 && (
                                  <>
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-3 h-3 ${
                                            i < Math.floor(vendor.rating)
                                              ? "bg-yellow-400"
                                              : "bg-slate-200"
                                          } rounded-full mr-0.5`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-slate-600 ml-1">
                                      {vendor.rating}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-lg font-bold text-emerald-600">
                              ${vendor.revenue.toLocaleString()}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm font-semibold text-slate-900">
                              ${vendor.commission.toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-600">
                              Platform fee
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {vendor.growth > 0 ? (
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  vendor.growth > 0
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                }`}
                              >
                                {vendor.growth > 0 ? "+" : ""}
                                {vendor.growth}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-lg"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {vendor.status === "active"
                                    ? "Suspend"
                                    : "Approve"}
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Manage Settings
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  Delivery Network Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="font-semibold">Partner</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">
                          Performance
                        </TableHead>
                        <TableHead className="font-semibold">
                          Earnings
                        </TableHead>
                        <TableHead className="font-semibold">
                          Efficiency
                        </TableHead>
                        <TableHead className="font-semibold">Vehicle</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deliveryPartners.map((partner) => (
                        <TableRow
                          key={partner.id}
                          className="hover:bg-slate-50/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-semibold">
                                  {partner.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-slate-900">
                                  {partner.name}
                                </p>
                                <p className="text-sm text-slate-600">
                                  {partner.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusColor(
                                partner.status
                              )} font-medium`}
                            >
                              {partner.status === "active" && (
                                <Zap className="h-3 w-3 mr-1" />
                              )}
                              {partner.status === "inactive" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {partner.status.charAt(0).toUpperCase() +
                                partner.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {partner.deliveries} deliveries
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(partner.rating)
                                          ? "bg-yellow-400"
                                          : "bg-slate-200"
                                      } rounded-full mr-0.5`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-slate-600 ml-1">
                                  {partner.rating}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-lg font-bold text-emerald-600">
                              ${partner.earnings}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {partner.efficiency}%
                                </span>
                              </div>
                              <Progress
                                value={partner.efficiency}
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-50">
                              {partner.vehicle}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-lg"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  View Deliveries
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {partner.status === "active"
                                    ? "Deactivate"
                                    : "Activate"}
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Manage Settings
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                        <p className="text-3xl font-bold text-blue-600">
                          {platformStats.orderVolume}
                        </p>
                        <p className="text-sm text-blue-700 font-medium">
                          Total Orders
                        </p>
                        <p className="text-xs text-blue-600">
                          +23% vs last month
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                        <p className="text-3xl font-bold text-emerald-600">
                          ${platformStats.totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-emerald-700 font-medium">
                          Revenue
                        </p>
                        <p className="text-xs text-emerald-600">
                          +{platformStats.monthlyGrowth}% growth
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-medium">
                          Customer Satisfaction
                        </span>
                        <span className="font-bold text-slate-900">
                          {platformStats.customerSatisfaction}/5.0
                        </span>
                      </div>
                      <Progress
                        value={platformStats.customerSatisfaction * 20}
                        className="h-3"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-medium">
                          Platform Growth
                        </span>
                        <span className="font-bold text-emerald-600">
                          +{platformStats.monthlyGrowth}%
                        </span>
                      </div>
                      <Progress
                        value={platformStats.monthlyGrowth * 4}
                        className="h-3"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-start gap-3 p-4 rounded-2xl border ${getActivityStatusColor(
                          activity.status
                        )}`}
                      >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">
                            {activity.title}
                          </p>
                          <p className="text-slate-600 text-sm">
                            {activity.description}
                          </p>
                          <p className="text-slate-500 text-xs mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
