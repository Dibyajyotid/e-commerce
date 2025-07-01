"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BaseProduct, CartItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock cart data - in real app this would come from state management
// const initialCart = [
//   {
//     id: 1,
//     name: "Orange Blast",
//     price: 8.99,
//     originalPrice: 10.99,
//     vendor: "Fresh Corner",
//     image: "/placeholder.svg?height=120&width=120",
//     quantity: 2,
//     preparationTime: "5-8 min",
//     discount: 18,
//   },
//   {
//     id: 2,
//     name: "Green Detox",
//     price: 12.99,
//     vendor: "Healthy Hub",
//     image: "/placeholder.svg?height=120&width=120",
//     quantity: 1,
//     preparationTime: "8-12 min",
//   },
// ];

// export interface CartItem extends BaseProduct {
//   quantity: number;
//   originalPrice?: number;
//   preparationTime?: string;
//   discount?: number;
// }

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "fresh20") {
      setIsPromoApplied(true);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const promoDiscount = isPromoApplied ? subtotal * 0.2 : 0;
  const total = subtotal + deliveryFee - promoDiscount;

  const router = useRouter();

  const handleCheckout = () => {
    if (!deliveryAddress.trim() || cart.length === 0) return;

    const newOrder = {
      id: "ORD-" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      status: "preparing",
      items: cart.map((item) => `${item.product.name} x${item.quantity}`),
      total: total,
      vendor: "Mixed Vendors",
      deliveryTime: "Expected: 25-35 minutes",
      progress: 10,
      estimatedMinutes: 25,
    };

    // Add to localStorage
    const stored = localStorage.getItem("orders");
    const existingOrders = stored ? JSON.parse(stored) : [];
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));


    toast.success("Order placed successfully! You'll receive a confirmation shortly.")
    // Clear cart and form
    setCart([]);
    setDeliveryAddress("");
    setSpecialInstructions("");
    setPromoCode("");
    setIsPromoApplied(false);
    localStorage.removeItem("cart");

    // Redirect to orders page
    router.push("/customer/orders");
  };

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
                Your Cart
              </h1>
              <p className="text-sm text-gray-600">
                Review your order and checkout
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🛒</span>
                  </div>
                  Order Items ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add some delicious juices to get started
                    </p>
                    <Link href="/customer">
                      <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-full px-8">
                        Browse Juices
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 p-6 border border-orange-100 rounded-2xl bg-white/50 hover:bg-white/80 transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            width={120}
                            height={120}
                            className="rounded-xl shadow-md"
                          />
                          {item.product.discount && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {item.product.discount}% OFF
                            </Badge>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            by {item.product.vendor}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.product.preparationTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">
                              ${item.product.price}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-orange-50 rounded-full p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-10 h-10 rounded-full hover:bg-orange-100"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-orange-600 min-w-[30px] text-center text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-600"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Details */}
            {cart.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    Delivery Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-base font-semibold text-gray-900"
                    >
                      Delivery Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full delivery address..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-2 border-2 border-orange-200 focus:border-orange-400 rounded-xl"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="instructions"
                      className="text-base font-semibold text-gray-900"
                    >
                      Special Instructions (Optional)
                    </Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special delivery instructions..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="mt-2 border-2 border-orange-200 focus:border-orange-400 rounded-xl"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Promo Code */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                    <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                      Promo Code
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                        disabled={isPromoApplied}
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        disabled={isPromoApplied}
                      >
                        {isPromoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {isPromoApplied && (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        ✅ 20% discount applied!
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        Delivery Fee
                      </span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    {isPromoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full py-6 text-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-xl shadow-lg"
                    onClick={handleCheckout}
                    disabled={!deliveryAddress.trim()}
                  >
                    Place Order
                    <CreditCard className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      Estimated delivery: 25-35 minutes
                    </p>
                    <p className="text-xs text-gray-500">
                      Free delivery on orders over $25
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
