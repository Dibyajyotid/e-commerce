"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Clock,
  DollarSign,
  Package,
  Navigation,
  Phone,
  MessageCircle,
  Star,
  TrendingUp,
  Zap,
  Route,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const availableDeliveries = [
  {
    id: "DEL-201",
    orderId: "ORD-098",
    vendor: "Fresh Corner",
    customer: "Sarah Wilson",
    pickup: "123 Juice St",
    delivery: "456 Oak Ave",
    distance: "2.3 km",
    fee: 4.5,
    items: ["Carrot Ginger x1"],
    estimatedTime: "15 min",
    priority: "high",
    customerRating: 4.8,
    tips: 2.0,
  },
  {
    id: "DEL-202",
    orderId: "ORD-099",
    vendor: "Berry Bliss",
    customer: "Tom Brown",
    pickup: "789 Berry Rd",
    delivery: "321 Pine St",
    distance: "1.8 km",
    fee: 3.75,
    items: ["Berry Mix x2"],
    estimatedTime: "12 min",
    priority: "normal",
    customerRating: 4.5,
    tips: 1.5,
  },
  {
    id: "DEL-203",
    orderId: "ORD-100",
    vendor: "Tropical Treats",
    customer: "Lisa Garcia",
    pickup: "555 Palm Ave",
    delivery: "888 Beach Rd",
    distance: "3.2 km",
    fee: 6.25,
    items: ["Tropical Paradise x3", "Mango Delight x1"],
    estimatedTime: "20 min",
    priority: "high",
    customerRating: 4.9,
    tips: 3.0,
  },
];

const activeDeliveries = [
  {
    id: "DEL-199",
    orderId: "ORD-095",
    vendor: "Healthy Hub",
    customer: "Lisa Davis",
    pickup: "555 Green Ave",
    delivery: "777 Elm St",
    distance: "3.1 km",
    fee: 5.25,
    items: ["Green Detox x2", "Orange Blast x1"],
    status: "picked-up",
    acceptedAt: "10 min ago",
    progress: 65,
    customerPhone: "+1 (555) 123-4567",
    estimatedArrival: "8 min",
  },
];

const todayStats = {
  deliveries: 12,
  earnings: 48.75,
  tips: 15.5,
  rating: 4.9,
  distance: 45.2,
  hours: 6.5,
};

export default function DeliveryPage() {
  const [available, setAvailable] = useState(availableDeliveries);
  const [active, setActive] = useState(activeDeliveries);
  const [isOnline, setIsOnline] = useState(true);

  const acceptDelivery = (deliveryId) => {
    const delivery = available.find((d) => d.id === deliveryId);
    if (delivery) {
      setActive((prev) => [
        ...prev,
        {
          ...delivery,
          status: "accepted",
          acceptedAt: "Just now",
          progress: 10,
        },
      ]);
      setAvailable((prev) => prev.filter((d) => d.id !== deliveryId));
    }
  };

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setActive((prev) =>
      prev.map((delivery) => {
        if (delivery.id === deliveryId) {
          let progress = delivery.progress;
          switch (newStatus) {
            case "en-route-pickup":
              progress = 25;
              break;
            case "arrived-pickup":
              progress = 40;
              break;
            case "picked-up":
              progress = 65;
              break;
            case "en-route-delivery":
              progress = 85;
              break;
            case "delivered":
              progress = 100;
              break;
          }
          return { ...delivery, status: newStatus, progress };
        }
        return delivery;
      })
    );
  };

  const completeDelivery = (deliveryId) => {
    setActive((prev) => prev.filter((d) => d.id !== deliveryId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "en-route-pickup":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "picked-up":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "en-route-delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Go to Pickup";
      case "en-route-pickup":
        return "En Route to Pickup";
      case "arrived-pickup":
        return "Arrived at Pickup";
      case "picked-up":
        return "Order Picked Up";
      case "en-route-delivery":
        return "En Route to Customer";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  FreshJuice Delivery
                </Link>
                <p className="text-sm text-gray-600">
                  Delivery Partner Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Online/Offline Toggle */}
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isOnline}
                    onCheckedChange={setIsOnline}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Badge
                    className={
                      isOnline
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {isOnline ? "🟢 Online" : "⚫ Offline"}
                  </Badge>
                </div>
              </div>

              <Link href="/">
                <Button
                  variant="ghost"
                  className="hover:bg-blue-50 rounded-full"
                >
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Today's Deliveries</p>
                  <p className="text-2xl font-bold">{todayStats.deliveries}</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Earnings</p>
                  <p className="text-2xl font-bold">${todayStats.earnings}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Tips</p>
                  <p className="text-2xl font-bold">${todayStats.tips}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Rating</p>
                  <p className="text-2xl font-bold">{todayStats.rating}</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Distance</p>
                  <p className="text-2xl font-bold">{todayStats.distance}km</p>
                </div>
                <Route className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Hours</p>
                  <p className="text-2xl font-bold">{todayStats.hours}h</p>
                </div>
                <Clock className="h-8 w-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
            <TabsTrigger
              value="available"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Available Deliveries ({available.length})
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Active Deliveries ({active.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Available Deliveries
                  {!isOnline && (
                    <Badge className="bg-red-100 text-red-800 ml-2">
                      You're Offline
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isOnline ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">😴</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      You're currently offline
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Turn on your status to start receiving delivery requests
                    </p>
                    <Button
                      onClick={() => setIsOnline(true)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full px-8"
                    >
                      Go Online
                    </Button>
                  </div>
                ) : available.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No deliveries available
                    </h3>
                    <p className="text-gray-600">
                      New delivery requests will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {available.map((delivery, index) => (
                      <div
                        key={delivery.id}
                        className="border border-blue-200 rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                {delivery.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                Delivery {delivery.id}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Order {delivery.orderId} • {delivery.vendor}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  className={getPriorityColor(
                                    delivery.priority
                                  )}
                                >
                                  {delivery.priority === "high"
                                    ? "🔥 High Priority"
                                    : "📦 Normal"}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-600">
                                    {delivery.customerRating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                              ${(delivery.fee + delivery.tips).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {delivery.distance} • {delivery.estimatedTime}
                            </p>
                            <p className="text-xs text-green-600">
                              +${delivery.tips} tip
                            </p>
                          </div>
                        </div>

                        {/* Route Information */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                              <MapPin className="h-4 w-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Pickup from {delivery.vendor}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.pickup}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                              <MapPin className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Deliver to {delivery.customer}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.delivery}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="mb-4">
                          <p className="font-medium text-gray-900 mb-2">
                            Items ({delivery.items.length}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {delivery.items.map((item, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-white/50"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex gap-3">
                          <Button
                            onClick={() => acceptDelivery(delivery.id)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl py-6 text-lg font-semibold"
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Accept Delivery
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 border-gray-300 hover:bg-gray-50 rounded-xl bg-transparent"
                          >
                            <Navigation className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Route className="h-5 w-5 text-white" />
                  </div>
                  Active Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {active.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🚚</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No active deliveries
                    </h3>
                    <p className="text-gray-600">
                      Accepted deliveries will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {active.map((delivery, index) => (
                      <div
                        key={delivery.id}
                        className="border border-orange-200 rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-red-50"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                                {delivery.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                Delivery {delivery.id}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Order {delivery.orderId} • {delivery.vendor}
                              </p>
                              <p className="text-xs text-gray-500">
                                Accepted {delivery.acceptedAt}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={`${getStatusColor(
                                delivery.status
                              )} px-4 py-2 rounded-full font-semibold mb-2`}
                            >
                              {getStatusText(delivery.status)}
                            </Badge>
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                              ${delivery.fee.toFixed(2)}
                            </p>
                            {delivery.estimatedArrival && (
                              <p className="text-sm text-orange-600 font-medium">
                                ETA: {delivery.estimatedArrival}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">
                              Delivery Progress
                            </span>
                            <span className="text-gray-500">
                              {delivery.progress}%
                            </span>
                          </div>
                          <Progress value={delivery.progress} className="h-3" />
                        </div>

                        {/* Route Information */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                              <MapPin className="h-4 w-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Pickup: {delivery.vendor}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.pickup}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                              <MapPin className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Deliver to: {delivery.customer}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.delivery}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="mb-4">
                          <p className="font-medium text-gray-900 mb-2">
                            Items:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {delivery.items.map((item, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-white/50"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          {delivery.status === "accepted" && (
                            <Button
                              onClick={() =>
                                updateDeliveryStatus(
                                  delivery.id,
                                  "en-route-pickup"
                                )
                              }
                              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl"
                            >
                              Start Journey to Pickup
                            </Button>
                          )}
                          {delivery.status === "en-route-pickup" && (
                            <Button
                              onClick={() =>
                                updateDeliveryStatus(delivery.id, "picked-up")
                              }
                              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl"
                            >
                              Mark as Picked Up
                            </Button>
                          )}
                          {delivery.status === "picked-up" && (
                            <Button
                              onClick={() =>
                                updateDeliveryStatus(
                                  delivery.id,
                                  "en-route-delivery"
                                )
                              }
                              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl"
                            >
                              Start Delivery
                            </Button>
                          )}
                          {delivery.status === "en-route-delivery" && (
                            <Button
                              onClick={() => completeDelivery(delivery.id)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
                            >
                              Mark as Delivered
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            className="px-4 border-gray-300 hover:bg-gray-50 rounded-xl bg-transparent"
                          >
                            <Navigation className="h-4 w-4" />
                          </Button>

                          {delivery.customerPhone && (
                            <>
                              <Button
                                variant="outline"
                                className="px-4 border-green-300 text-green-700 hover:bg-green-50 rounded-xl bg-transparent"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                className="px-4 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl bg-transparent"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
