"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/src/lib/supabase';
import { MapPin, Car, Building2, Calendar, Plus, ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function AdminDashboardHome() {
  const [counts, setCounts] = useState({
    tours: 0,
    cars: 0,
    accommodations: 0,
    events: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      const [{ count: tours }, { count: cars }, { count: accommodations }, { count: events }] = await Promise.all([
        supabase.from('tours').select('*', { count: 'exact', head: true }),
        supabase.from('cars').select('*', { count: 'exact', head: true }),
        supabase.from('accommodations').select('*', { count: 'exact', head: true }),
        supabase.from('upcoming_events').select('*', { count: 'exact', head: true }),
      ]);
      setCounts({
        tours: tours ?? 0,
        cars: cars ?? 0,
        accommodations: accommodations ?? 0,
        events: events ?? 0,
      });
      setLoading(false);
    }
    fetchCounts();
  }, []);

  const stats = [
    { 
      label: 'Total Tours', 
      value: counts.tours, 
      icon: MapPin,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      listHref: '/admin/tours' 
    },
    { 
      label: 'Fleet Vehicles', 
      value: counts.cars, 
      icon: Car,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      textColor: 'text-emerald-600',
      listHref: '/admin/cars' 
    },
    { 
      label: 'Accommodations', 
      value: counts.accommodations, 
      icon: Building2,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
      listHref: '/admin/accommodations' 
    },
    { 
      label: 'Upcoming Events', 
      value: counts.events, 
      icon: Calendar,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-600',
      listHref: '/admin/events' 
    },
  ];

  const actions = [
    { 
      label: 'Add New Tour', 
      description: 'Create exciting travel experiences',
      href: '/admin/tours/new', 
      gradient: 'from-blue-500 to-blue-600',
      icon: MapPin 
    },
    { 
      label: 'Add Vehicle', 
      description: 'Expand your fleet',
      href: '/admin/cars/new', 
      gradient: 'from-emerald-500 to-emerald-600',
      icon: Car 
    },
    { 
      label: 'Add Accommodation', 
      description: 'Partner with new properties',
      href: '/admin/accommodations/new', 
      gradient: 'from-purple-500 to-purple-600',
      icon: Building2 
    },
    { 
      label: 'Manage Events', 
      description: 'Create memorable experiences',
      href: '/admin/events/new', 
      gradient: 'from-orange-500 to-orange-600',
      icon: Calendar 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with Royal Routes today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="group relative">
                <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-10`}></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className={`text-2xl font-bold ${stat.textColor}`}>
                        {loading ? (
                          <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                        ) : (
                          stat.value.toLocaleString()
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                    <Link 
                      href={stat.listHref} 
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group-hover:translate-x-1 duration-200"
                    >
                      View all
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="relative p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} shadow-lg mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                      <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                        <Plus className="w-4 h-4 mr-1" />
                        Create new
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
      </div>
      </div>
    </div>
  );
} 