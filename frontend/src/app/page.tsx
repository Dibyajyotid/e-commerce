"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Testimonial } from "@/lib/types";
import {
  ChevronRight,
  Clock,
  Play,
  Shield,
  ShoppingCart,
  Star,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Fresh juices delivered in under 30 minutes",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Local Vendors",
    description: "Supporting local juice bars in your neighborhood",
    color: "from-green-400 to-blue-500",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Real-time Tracking",
    description: "Track your order from preparation to delivery",
    color: "from-purple-400 to-pink-500",
  },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setIsVisible(true);

    setTestimonials([
      {
        name: "Test User",
        designation: "Beta Tester",
        content: "This is a sample testimonials for design testing.",
        rating: 5,
        avatar: "/placeholder.svg?height=60&width=60",
      },
    ]);

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              FreshJuice
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="hover:text-orange-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-orange-400 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="hover:text-orange-400 transition-colors"
              >
                Reviews
              </a>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-green-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1),transparent_70%)]" />

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
              🚀 Now delivering in 15+ cities
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-yellow-400 bg-clip-text text-transparent leading-tight">
              Fresh Juices
              <br />
              <span className="text-4xl md:text-6xl">Delivered Fast</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the freshest, most delicious juices delivered to your
              doorstep in under 30 minutes. From local vendors who care about
              quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/customer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold px-8 py-4 text-lg group"
                >
                  Order Now
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg group bg-transparent"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div>50,000+ Happy Customers</div>
              <div>30-Min Delivery</div>
            </div>
          </div>
        </div>

        {/* Floating juice images */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 opacity-20 animate-bounce delay-300">
          <div className="w-full h-full bg-orange-400 rounded-full blur-sm" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 opacity-20 animate-bounce delay-700">
          <div className="w-full h-full bg-green-400 rounded-full blur-sm" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 opacity-20 animate-bounce delay-1000">
          <div className="w-full h-full bg-yellow-400 rounded-full blur-sm" />
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're craving fresh juice, running a business, or looking
              to earn money, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <ShoppingCart className="h-12 w-12" />,
                title: "Customer",
                description: "Browse and order fresh juices from local vendors",
                href: "/customer",
                gradient: "from-blue-500 to-purple-600",
                hoverGradient: "hover:from-blue-600 hover:to-purple-700",
              },
              {
                icon: <Store className="h-12 w-12" />,
                title: "Vendor",
                description:
                  "Manage your business and reach more customers",
                href: "/vendor",
                gradient: "from-green-500 to-teal-600",
                hoverGradient: "hover:from-green-600 hover:to-teal-700",
              },
              {
                icon: <Truck className="h-12 w-12" />,
                title: "Delivery Partner",
                description: "Deliver orders and earn money on your schedule",
                href: "/delivery",
                gradient: "from-orange-500 to-red-600",
                hoverGradient: "hover:from-orange-600 hover:to-red-700",
              },
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Admin",
                description: "Manage the entire platform and monitor analytics",
                href: "/admin",
                gradient: "from-purple-500 to-pink-600",
                hoverGradient: "hover:from-purple-600 hover:to-pink-700",
              },
            ].map((role, index) => (
              <Link key={role.title} href={role.href}>
                <Card
                  className={`bg-gray-900/50 rounded-2xl border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer backdrop-blur-sm ${role.hoverGradient}`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${role.gradient} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {role.icon}
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      className={`w-full hover:cursor-pointer rounded-r-2xl rounded-tl-2xl bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white font-semibold group-hover:shadow-lg transition-all duration-300`}
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-orange-900/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose FreshJuice?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're revolutionizing how you get your daily dose of nutrition
              with cutting-edge technology and local partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <Card className="bg-gray-900/30 border-gray-800 hover:border-gray-600 transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white w-fit group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Getting your favorite fresh juice is as easy as 1-2-3
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Browse & Order",
                description:
                  "Choose from hundreds of fresh juices from local vendors near you",
                icon: "🥤",
              },
              {
                step: "02",
                title: "Track in Real-time",
                description:
                  "Watch your order being prepared and track your delivery partner",
                icon: "📱",
              },
              {
                step: "03",
                title: "Enjoy Fresh",
                description:
                  "Receive your fresh, delicious juice in under 30 minutes",
                icon: "😋",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section id="testimonials" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied customers who love our service
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <Image
                      src={
                        testimonials[currentTestimonial].avatar ||
                        "/placeholder.svg"
                      }
                      alt={testimonials[currentTestimonial].name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-white text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-400">
                        {testimonials[currentTestimonial].designation}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-orange-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-500">No testimonials available yet.</p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust FreshJuice for their daily
            nutrition needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold px-8 py-4 text-lg"
              >
                Start Ordering
              </Button>
            </Link>
            <Link href="/vendor">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
