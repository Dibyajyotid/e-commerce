"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Clock,
  Star,
  ChefHat,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Phone,
  MessageCircle,
  BarChart3,
  Users,
  Target,
  Calendar,
  Filter,
  Search,
  Download,
  Settings,
  Zap,
  Award,
  TrendingDown,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

const incomingOrders = [
  {
    id: "ORD-101",
    customer: "John Doe",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    items: ["Orange Blast x2"],
    total: 17.98,
    time: "2 min ago",
    distance: "0.5 km",
    customerRating: 4.8,
    priority: "normal",
    estimatedPrep: "8 min",
    customerPhone: "+1 (555) 123-4567",
    orderType: "delivery",
    paymentMethod: "card",
    specialInstructions: "Extra pulp please",
  },
  {
    id: "ORD-102",
    customer: "Jane Smith",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    items: ["Green Detox x1", "Berry Mix x1"],
    total: 23.98,
    time: "5 min ago",
    distance: "1.2 km",
    customerRating: 4.9,
    priority: "high",
    estimatedPrep: "12 min",
    customerPhone: "+1 (555) 987-6543",
    orderType: "delivery",
    paymentMethod: "cash",
    specialInstructions: "",
  },
  {
    id: "ORD-103",
    customer: "Mike Johnson",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    items: ["Tropical Paradise x3"],
    total: 35.97,
    time: "8 min ago",
    distance: "0.8 km",
    customerRating: 4.6,
    priority: "normal",
    estimatedPrep: "15 min",
    customerPhone: "+1 (555) 456-7890",
    orderType: "pickup",
    paymentMethod: "card",
    specialInstructions: "No coconut",
  },
];

const activeOrders = [
  {
    id: "ORD-098",
    customer: "Sarah Wilson",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    items: ["Carrot Ginger x1"],
    total: 9.99,
    status: "preparing",
    acceptedAt: "10 min ago",
    progress: 60,
    estimatedCompletion: "5 min",
    customerPhone: "+1 (555) 111-2222",
    orderType: "delivery",
    assignedTo: "Chef Maria",
  },
  {
    id: "ORD-099",
    customer: "Tom Brown",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    items: ["Apple Cinnamon x2"],
    total: 18.98,
    status: "ready",
    acceptedAt: "15 min ago",
    progress: 100,
    estimatedCompletion: "Ready for pickup",
    customerPhone: "+1 (555) 333-4444",
    orderType: "pickup",
    assignedTo: "Chef Alex",
  },
];

const menuItems = [
  {
    id: 1,
    name: "Orange Blast",
    price: 8.99,
    originalPrice: 10.99,
    status: "active",
    sales: 45,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=120&width=120",
    category: "Citrus",
    prepTime: "5-8 min",
    ingredients: ["Fresh Oranges", "Natural Pulp"],
    discount: 18,
    inventory: 85,
    profit: 3.5,
    trending: "up",
  },
  {
    id: 2,
    name: "Green Detox",
    price: 12.99,
    status: "active",
    sales: 32,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=120&width=120",
    category: "Detox",
    prepTime: "8-12 min",
    ingredients: ["Spinach", "Apple", "Cucumber", "Lemon"],
    inventory: 92,
    profit: 5.2,
    trending: "up",
  },
  {
    id: 3,
    name: "Berry Mix",
    price: 10.99,
    status: "active",
    sales: 28,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=120&width=120",
    category: "Berry",
    prepTime: "6-10 min",
    ingredients: ["Mixed Berries", "Honey", "Yogurt"],
    inventory: 67,
    profit: 4.1,
    trending: "stable",
  },
  {
    id: 4,
    name: "Tropical Paradise",
    price: 11.99,
    status: "inactive",
    sales: 15,
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=120&width=120",
    category: "Tropical",
    prepTime: "7-11 min",
    ingredients: ["Mango", "Pineapple", "Coconut"],
    inventory: 23,
    profit: 4.8,
    trending: "down",
  },
];

const todayStats = {
  orders: 24,
  revenue: 342.5,
  pending: 3,
  rating: 4.8,
  avgOrderValue: 14.27,
  completionRate: 98,
  newCustomers: 8,
  repeatCustomers: 16,
};

const weeklyData = [
  { day: "Mon", orders: 18, revenue: 245 },
  { day: "Tue", orders: 22, revenue: 312 },
  { day: "Wed", orders: 19, revenue: 278 },
  { day: "Thu", orders: 25, revenue: 356 },
  { day: "Fri", orders: 28, revenue: 398 },
  { day: "Sat", orders: 32, revenue: 445 },
  { day: "Sun", orders: 24, revenue: 342 },
];

export default function VendorPage() {
  const [orders, setOrders] = useState(incomingOrders);
  const [active, setActive] = useState(activeOrders);
  const [menu, setMenu] = useState(menuItems);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orderFilter, setOrderFilter] = useState("all");
  const [menuFilter, setMenuFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const acceptOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setActive((prev) => [
        ...prev,
        { ...order, status: "preparing", acceptedAt: "Just now", progress: 10 },
      ]);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  const declineOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setActive((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          let progress = order.progress;
          let estimatedCompletion = order.estimatedCompletion;

          switch (newStatus) {
            case "preparing":
              progress = 10;
              estimatedCompletion = "15 min";
              break;
            case "ready":
              progress = 100;
              estimatedCompletion = "Ready for pickup";
              break;
          }

          return { ...order, status: newStatus, progress, estimatedCompletion };
        }
        return order;
      })
    );
  };

  const toggleMenuItemStatus = (itemId) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  const getPriorityColor = (priority) => {
    return priority === "high"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTrendingIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (orderFilter === "all") return true;
    if (orderFilter === "high-priority") return order.priority === "high";
    if (orderFilter === "delivery") return order.orderType === "delivery";
    if (orderFilter === "pickup") return order.orderType === "pickup";
    return true;
  });

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      menuFilter === "all" || item.category.toLowerCase() === menuFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Professional Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                >
                  Fresh Corner
                </Link>
                <p className="text-sm text-slate-600 font-medium">
                  Professional Kitchen Dashboard
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
              {/* Store Status */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
                <span className="text-sm font-semibold text-slate-700">
                  Store Status:
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isOnline}
                    onCheckedChange={setIsOnline}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                  <Badge
                    className={`${
                      isOnline
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-800"
                    } font-semibold`}
                  >
                    {isOnline ? "🟢 Open" : "⚫ Closed"}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                className="hover:bg-slate-50 rounded-xl border-slate-200 bg-transparent text-slate-600"
              >
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline ">Notifications</span>
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
        {/* Advanced Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <Card className="col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Today's Orders
                  </p>
                  <p className="text-3xl font-bold">{todayStats.orders}</p>
                  <p className="text-blue-200 text-xs">+12% vs yesterday</p>
                </div>
                <div className="w-12 h-12 bg-blue-400/30 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-100" />
                </div>
              </div>
              <div className="w-full bg-blue-400/30 rounded-full h-2">
                <div
                  className="bg-blue-200 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Revenue
                  </p>
                  <p className="text-3xl font-bold">${todayStats.revenue}</p>
                  <p className="text-emerald-200 text-xs">+18% vs yesterday</p>
                </div>
                <div className="w-12 h-12 bg-emerald-400/30 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-100" />
                </div>
              </div>
              <div className="w-full bg-emerald-400/30 rounded-full h-2">
                <div
                  className="bg-emerald-200 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs font-medium">Pending</p>
                  <p className="text-2xl font-bold">{todayStats.pending}</p>
                </div>
                <Bell className="h-6 w-6 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs font-medium">Rating</p>
                  <p className="text-2xl font-bold">{todayStats.rating}</p>
                </div>
                <Star className="h-6 w-6 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-xs font-medium">
                    Avg Order
                  </p>
                  <p className="text-2xl font-bold">
                    ${todayStats.avgOrderValue}
                  </p>
                </div>
                <Target className="h-6 w-6 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-xs font-medium">
                    Completion
                  </p>
                  <p className="text-2xl font-bold">
                    {todayStats.completionRate}%
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-600">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent "
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Award className="h-4 w-4 mr-2" />
            Promotions
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            <TabsTrigger
              value="orders"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Package className="h-4 w-4 mr-2" />
              Orders ({orders.length + active.length})
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Menu Management
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Order Filters */}
            <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-600" />
                    <Label className="text-sm font-medium">
                      Filter Orders:
                    </Label>
                  </div>
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-40 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="high-priority">
                        High Priority
                      </SelectItem>
                      <SelectItem value="delivery">Delivery Only</SelectItem>
                      <SelectItem value="pickup">Pickup Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="outline" className="ml-auto">
                    {filteredOrders.length} orders
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Incoming Orders */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  Incoming Orders ({filteredOrders.length})
                  {!isOnline && (
                    <Badge className="bg-red-100 text-red-800 ml-2">
                      Store Closed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isOnline ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ChefHat className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      Your store is currently closed
                    </h3>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                      Turn on your store status to start receiving orders from
                      customers
                    </p>
                    <Button
                      onClick={() => setIsOnline(true)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg"
                    >
                      Open Store Now
                    </Button>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      No new orders
                    </h3>
                    <p className="text-slate-600">
                      New orders will appear here when customers place them
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredOrders.map((order, index) => (
                      <div
                        key={order.id}
                        className="border border-slate-200 rounded-3xl p-6 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                              <AvatarImage
                                src={order.customerAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-lg">
                                {order.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">
                                Order {order.id}
                              </h3>
                              <p className="text-slate-600 font-medium">
                                {order.customer}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <Badge
                                  className={getPriorityColor(order.priority)}
                                >
                                  {order.priority === "high"
                                    ? "🔥 High Priority"
                                    : "📦 Normal"}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-white/50"
                                >
                                  {order.orderType === "delivery"
                                    ? "🚚 Delivery"
                                    : "🏪 Pickup"}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium text-slate-600">
                                    {order.customerRating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-slate-600 font-medium">
                              {order.distance} • {order.time}
                            </p>
                            <p className="text-sm text-orange-600 font-semibold">
                              Est. {order.estimatedPrep}
                            </p>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 mb-2">
                                Items ({order.items.length}):
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {order.items.map((item, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="bg-white/70 border-slate-300"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {order.specialInstructions && (
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-1">
                                  Special Instructions:
                                </p>
                                <p className="text-sm text-slate-600 bg-white/50 p-2 rounded-lg">
                                  {order.specialInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">
                                Payment Method:
                              </span>
                              <span className="font-medium text-slate-900 capitalize">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">
                                Customer Phone:
                              </span>
                              <span className="font-medium text-slate-900">
                                {order.customerPhone}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex gap-3">
                          <Button
                            onClick={() => acceptOrder(order.id)}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl py-6 text-lg font-semibold shadow-lg"
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Accept Order
                          </Button>
                          <Button
                            onClick={() => declineOrder(order.id)}
                            variant="outline"
                            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 rounded-2xl py-6 text-lg font-semibold"
                          >
                            <XCircle className="h-5 w-5 mr-2" />
                            Decline
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 border-slate-300 hover:bg-slate-50 rounded-2xl bg-transparent"
                          >
                            <Phone className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 border-slate-300 hover:bg-slate-50 rounded-2xl bg-transparent"
                          >
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Orders */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  Active Orders ({active.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {active.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ChefHat className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      No active orders
                    </h3>
                    <p className="text-slate-600">
                      Accepted orders will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {active.map((order, index) => (
                      <div
                        key={order.id}
                        className="border border-slate-200 rounded-3xl p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 hover:shadow-xl transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                              <AvatarImage
                                src={order.customerAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold text-lg">
                                {order.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">
                                Order {order.id}
                              </h3>
                              <p className="text-slate-600 font-medium">
                                {order.customer}
                              </p>
                              <p className="text-sm text-slate-500">
                                Accepted {order.acceptedAt} • Assigned to{" "}
                                {order.assignedTo}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={`${getStatusColor(
                                order.status
                              )} px-4 py-2 rounded-full font-semibold mb-3`}
                            >
                              {order.status === "preparing"
                                ? "👨‍🍳 Preparing"
                                : "✅ Ready"}
                            </Badge>
                            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-blue-600 font-semibold">
                              {order.estimatedCompletion}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-3">
                            <span className="font-semibold text-slate-700">
                              Preparation Progress
                            </span>
                            <span className="text-slate-500 font-medium">
                              {order.progress}%
                            </span>
                          </div>
                          <Progress
                            value={order.progress}
                            className="h-3 rounded-full"
                          />
                        </div>

                        {/* Items */}
                        <div className="mb-6">
                          <p className="font-semibold text-slate-700 mb-3">
                            Items:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-white/70 border-slate-300 py-1 px-3"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex gap-3">
                          {order.status === "preparing" ? (
                            <Button
                              onClick={() =>
                                updateOrderStatus(order.id, "ready")
                              }
                              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl py-4 font-semibold"
                            >
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Mark as Ready
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              disabled
                              className="flex-1 border-emerald-300 text-emerald-700 rounded-2xl py-4 bg-emerald-50"
                            >
                              <Clock className="h-5 w-5 mr-2" />
                              Waiting for Pickup
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="px-6 border-slate-300 hover:bg-slate-50 rounded-2xl bg-transparent"
                          >
                            <Phone className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 border-slate-300 hover:bg-slate-50 rounded-2xl bg-transparent"
                          >
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    Menu Items ({filteredMenu.length})
                  </CardTitle>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 rounded-xl border-slate-200"
                      />
                    </div>
                    <Select value={menuFilter} onValueChange={setMenuFilter}>
                      <SelectTrigger className="w-40 rounded-xl border-slate-200">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="citrus">Citrus</SelectItem>
                        <SelectItem value="detox">Detox</SelectItem>
                        <SelectItem value="berry">Berry</SelectItem>
                        <SelectItem value="tropical">Tropical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl px-6">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {filteredMenu.map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-3xl p-6 bg-white/70 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-6">
                        <div className="relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="rounded-2xl shadow-lg"
                          />
                          {item.discount && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {item.discount}% OFF
                            </Badge>
                          )}
                          <div className="absolute -bottom-2 -left-2 bg-white rounded-full p-2 shadow-lg">
                            {getTrendingIcon(item.trending)}
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {item.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs bg-slate-50"
                              >
                                {item.category}
                              </Badge>
                            </div>
                            <Badge
                              className={`${
                                item.status === "active"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-800"
                              } font-semibold`}
                            >
                              {item.status === "active"
                                ? "🟢 Active"
                                : "⚫ Inactive"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl font-bold text-emerald-600">
                                  ${item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-slate-500 line-through">
                                    ${item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                  {item.rating}
                                </span>
                                <span className="text-slate-500">
                                  ({item.reviews})
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-600">
                                <Clock className="h-3 w-3" />
                                <span>{item.prepTime}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Sales:</span>
                                <span className="font-semibold">
                                  {item.sales}/month
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Profit:</span>
                                <span className="font-semibold text-emerald-600">
                                  ${item.profit}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Stock:</span>
                                <span
                                  className={`font-semibold ${
                                    item.inventory < 30
                                      ? "text-red-600"
                                      : "text-emerald-600"
                                  }`}
                                >
                                  {item.inventory}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 rounded-xl bg-white/50"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 rounded-xl bg-white/50"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleMenuItemStatus(item.id)}
                              className={`flex-1 rounded-xl ${
                                item.status === "active"
                                  ? "border-red-300 text-red-700 hover:bg-red-50"
                                  : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              } bg-white/50`}
                            >
                              {item.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="px-2 rounded-xl bg-white/50"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Analytics</DropdownMenuItem>
                                <DropdownMenuItem>Promote</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {day.day.charAt(0)}
                          </div>
                          <span className="font-medium">{day.day}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            {day.orders} orders
                          </p>
                          <p className="text-sm text-emerald-600">
                            ${day.revenue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-slate-900 mb-2">
                        {todayStats.newCustomers + todayStats.repeatCustomers}
                      </p>
                      <p className="text-slate-600">Total Customers Today</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-emerald-50 rounded-xl">
                        <p className="text-2xl font-bold text-emerald-600">
                          {todayStats.newCustomers}
                        </p>
                        <p className="text-sm text-emerald-700">
                          New Customers
                        </p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-600">
                          {todayStats.repeatCustomers}
                        </p>
                        <p className="text-sm text-blue-700">
                          Repeat Customers
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">
                          Customer Retention
                        </span>
                        <span className="font-bold text-slate-900">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
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
