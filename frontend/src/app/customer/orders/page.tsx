"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    items: ["Orange Blast x2", "Green Detox x1"],
    total: 30.97,
    vendor: "Fresh Corner",
    deliveryTime: "Delivered at 2:30 PM",
    rating: 5,
    progress: 100,
  },
  {
    id: "ORD-002",
    date: "2024-01-16",
    status: "en-route",
    items: ["Berry Mix x1", "Tropical Paradise x1"],
    total: 22.98,
    vendor: "Berry Bliss",
    deliveryTime: "Expected: 3:15 PM",
    deliveryPartner: "Mike Johnson",
    progress: 75,
    estimatedMinutes: 12,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "en-route":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "preparing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "en-route":
      return "En Route";
    case "preparing":
      return "Preparing";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return "✅";
    case "en-route":
      return "🚚";
    case "preparing":
      return "👨‍🍳";
    case "cancelled":
      return "❌";
    default:
      return "❓";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      try {
        const newOrders = JSON.parse(stored);
        if (Array.isArray(newOrders)) {
          // Combine mock and new orders (show new ones first)
          setOrders([...newOrders, ...mockOrders]);
        }
      } catch (err) {
        console.error("Error parsing localStorage orders:", err);
      }
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/customer">
              <Button
                variant="ghost"
                className="hover:bg-orange-50 rounded-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                My Orders
              </h1>
              <p className="text-sm text-gray-600">Track your juice orders</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Order {order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {order.date} • {order.vendor}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} px-4 py-2 rounded-full font-semibold`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress Bar */}
                {order.status !== "delivered" &&
                  order.status !== "cancelled" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          Order Progress
                        </span>
                        <span className="text-gray-500">{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                      {order.estimatedMinutes && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Estimated {order.estimatedMinutes} minutes remaining
                        </p>
                      )}
                    </div>
                  )}

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">🥤</span>
                    Items Ordered:
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                {/* Order Details */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{order.deliveryTime}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Status-specific content */}
                {order.status === "en-route" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">
                          Your order is on the way!
                        </p>
                        <p className="text-sm text-blue-700">
                          {order.deliveryPartner} is delivering your order
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Track Live
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full bg-transparent"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Driver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                )}

                {order.status === "preparing" && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">👨‍🍳</span>
                      </div>
                      <div>
                        <p className="font-semibold text-yellow-900">
                          Your order is being prepared
                        </p>
                        <p className="text-sm text-yellow-700">
                          The vendor is working on your fresh juices
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === "delivered" && (
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✅</span>
                        </div>
                        <div>
                          <p className="font-semibold text-green-900">
                            Order delivered successfully!
                          </p>
                          <p className="text-sm text-green-700">
                            Hope you enjoyed your fresh juices
                          </p>
                        </div>
                      </div>
                      {order.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(order.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 rounded-full"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Rate Order
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 rounded-full bg-transparent"
                      >
                        Reorder
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by ordering some delicious fresh juices
              </p>
              <Link href="/customer">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-full px-8">
                  Browse Juices
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
