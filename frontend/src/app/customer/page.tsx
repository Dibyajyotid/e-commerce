"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Search,
  Star,
  Plus,
  Minus,
  Heart,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BaseProduct, CartItem } from "@/lib/types";

const mockProducts: BaseProduct[] = [
  {
    id: 1,
    name: "Orange Blast",
    price: 8.99,
    originalPrice: 10.99,
    rating: 4.8,
    reviews: 124,
    vendor: "Fresh Corner",
    image: "/placeholder.svg?height=300&width=300",
    description: "Fresh orange juice with pulp",
    category: "Citrus",
    preparationTime: "5-8 min",
    distance: "0.8 km",
    isPopular: true,
    discount: 18,
  },
  {
    id: 2,
    name: "Green Detox",
    price: 12.99,
    rating: 4.9,
    reviews: 89,
    vendor: "Healthy Hub",
    image: "/placeholder.svg?height=300&width=300",
    description: "Spinach, apple, and cucumber blend",
    category: "Detox",
    preparationTime: "8-12 min",
    distance: "1.2 km",
    isNew: true,
  },
  {
    id: 3,
    name: "Berry Mix",
    price: 10.99,
    rating: 4.7,
    reviews: 156,
    vendor: "Berry Bliss",
    image: "/placeholder.svg?height=300&width=300",
    description: "Mixed berries with honey",
    category: "Berry",
    preparationTime: "6-10 min",
    distance: "0.5 km",
  },
  {
    id: 4,
    name: "Tropical Paradise",
    price: 11.99,
    rating: 4.6,
    reviews: 78,
    vendor: "Tropical Treats",
    image: "/placeholder.svg?height=300&width=300",
    description: "Mango, pineapple, and coconut",
    category: "Tropical",
    preparationTime: "7-11 min",
    distance: "1.5 km",
  },
  {
    id: 5,
    name: "Carrot Ginger",
    price: 9.99,
    rating: 4.5,
    reviews: 92,
    vendor: "Root & Fruit",
    image: "/placeholder.svg?height=300&width=300",
    description: "Fresh carrot with ginger kick",
    category: "Vegetable",
    preparationTime: "5-9 min",
    distance: "0.9 km",
  },
  {
    id: 6,
    name: "Apple Cinnamon",
    price: 9.49,
    rating: 4.8,
    reviews: 134,
    vendor: "Spice Garden",
    image: "/placeholder.svg?height=300&width=300",
    description: "Apple juice with cinnamon spice",
    category: "Spiced",
    preparationTime: "4-7 min",
    distance: "1.1 km",
  },
];

const categories = [
  "All",
  "Citrus",
  "Detox",
  "Berry",
  "Tropical",
  "Vegetable",
  "Spiced",
];

export default function CustomerPage() {
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [cart, setCart] = useState<CartItem<BaseProduct>[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/juices");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: BaseProduct[] = await res.json();
        setProducts(data.length > 0 ? data : mockProducts);
      } catch (err) {
        console.warn("Using mock products due to fetch error:", err);
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: BaseProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem: CartItem<BaseProduct> = {
        product,
        quantity: 1,
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                FreshJuice
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/customer/orders">
                <Button variant="ghost" className="hover:bg-orange-50">
                  <Clock className="h-4 w-4 mr-2" />
                  My Orders
                </Button>
              </Link>
              <Link href="/customer/cart">
                <Button className="relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 animate-pulse">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero and Filters */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
          Fresh Juices Delivered
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the freshest, most delicious juices from local vendors in
          your area
        </p>

        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for juices, vendors, or flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105"
                  : "border-orange-200 text-gray-600 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const cartItem = cart.find(
              (item) => item.product.id === product.id
            );
            return (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 border-0 backdrop-blur-sm"
              >
                <CardHeader className="p-0 relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-56 object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isPopular && (
                      <Badge className="bg-red-500 text-white">
                        🔥 Popular
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">✨ New</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-orange-500 text-white">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex justify-between mb-3">
                    <CardTitle className="text-xl font-bold group-hover:text-orange-600">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription className="mb-2 text-gray-600">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                        {product.vendor[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {product.vendor}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {product.preparationTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {product.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {cartItem ? (
                      <div className="flex items-center gap-3 bg-orange-50 rounded-full p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-bold text-orange-600">
                          {cartItem.quantity}
                        </span>
                        <Button
                          size="sm"
                          className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No juices found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {cartItemCount} items
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    ${cartTotal.toFixed(2)}
                  </p>
                </div>
                <Link href="/customer/cart">
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg rounded-full px-8">
                    View Cart <ShoppingCart className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
