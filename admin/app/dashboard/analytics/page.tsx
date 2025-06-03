"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, Download } from "lucide-react"
import { useState } from "react"

// Mock data for charts
const salesData = [
  { month: "Jan", revenue: 12000, orders: 156 },
  { month: "Feb", revenue: 15000, orders: 192 },
  { month: "Mar", revenue: 18000, orders: 230 },
  { month: "Apr", revenue: 22000, orders: 270 },
  { month: "May", revenue: 28000, orders: 320 },
  { month: "Jun", revenue: 32000, orders: 380 },
  { month: "Jul", revenue: 38000, orders: 430 },
]

const topProducts = [
  { name: "DREAM IS FREE TWINSET 2.0", sales: 245, revenue: 18375, growth: 12.5 },
  { name: "BORDEUX BAG", sales: 189, revenue: 60480, growth: 8.2 },
  { name: "YELLOW BAG", sales: 176, revenue: 44000, growth: -2.4 },
  { name: "BROWN LEATHER JACKET", sales: 154, revenue: 61600, growth: 15.7 },
  { name: "SILK SCARF", sales: 132, revenue: 13200, growth: 5.3 },
]

const customerSegments = [
  { segment: "New Customers", count: 1245, percentage: 28 },
  { segment: "Returning Customers", count: 2876, percentage: 65 },
  { segment: "Inactive Customers", count: 312, percentage: 7 },
]

const trafficSources = [
  { source: "Direct", visits: 12500, percentage: 35 },
  { source: "Organic Search", visits: 9800, percentage: 27 },
  { source: "Social Media", visits: 7200, percentage: 20 },
  { source: "Email", visits: 4500, percentage: 13 },
  { source: "Referral", visits: 1800, percentage: 5 },
]

export default function AnalyticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£165,480</div>
              <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[70%] bg-green-500 rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,978</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[60%] bg-blue-500 rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,433</div>
              <p className="text-xs text-muted-foreground">+8.3% from last month</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[45%] bg-purple-500 rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-muted-foreground">+0.7% from last month</p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[38%] bg-amber-500 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue and order trends</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-sm">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                    <span className="text-sm">Orders</span>
                  </div>
                </div>
                <div className="flex-1 flex items-end">
                  <div className="w-full flex justify-between items-end h-[220px]">
                    {salesData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 w-1/7">
                        <div className="relative w-12 flex flex-col items-center">
                          <div
                            className="w-8 bg-blue-400 rounded-sm"
                            style={{ height: `${(data.orders / 430) * 100}%` }}
                          />
                          <div
                            className="w-8 bg-primary rounded-sm mt-1"
                            style={{ height: `${(data.revenue / 38000) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different analytics */}
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="customers">Customer Segments</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Products with the highest sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                    <div className="col-span-5">Product</div>
                    <div className="col-span-2 text-right">Sales</div>
                    <div className="col-span-3 text-right">Revenue</div>
                    <div className="col-span-2 text-right">Growth</div>
                  </div>
                  {topProducts.map((product, i) => (
                    <div key={i} className="grid grid-cols-12 items-center">
                      <div className="col-span-5 font-medium">{product.name}</div>
                      <div className="col-span-2 text-right">{product.sales}</div>
                      <div className="col-span-3 text-right">£{product.revenue.toLocaleString()}</div>
                      <div
                        className={`col-span-2 text-right ${product.growth > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Breakdown of customer types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerSegments.map((segment, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{segment.segment}</span>
                        <span className="text-sm text-muted-foreground">
                          {segment.count.toLocaleString()} ({segment.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-orange-500"
                          }`}
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                    <div className="col-span-4">Source</div>
                    <div className="col-span-4 text-right">Visits</div>
                    <div className="col-span-4 text-right">Percentage</div>
                  </div>
                  {trafficSources.map((source, i) => (
                    <div key={i} className="grid grid-cols-12 items-center">
                      <div className="col-span-4 font-medium">{source.source}</div>
                      <div className="col-span-4 text-right">{source.visits.toLocaleString()}</div>
                      <div className="col-span-4 text-right">{source.percentage}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-4 w-full flex rounded-full overflow-hidden">
                  {trafficSources.map((source, i) => (
                    <div
                      key={i}
                      className={`h-4 ${
                        i === 0
                          ? "bg-blue-500"
                          : i === 1
                            ? "bg-green-500"
                            : i === 2
                              ? "bg-purple-500"
                              : i === 3
                                ? "bg-amber-500"
                                : "bg-red-500"
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  {trafficSources.map((source, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          i === 0
                            ? "bg-blue-500"
                            : i === 1
                              ? "bg-green-500"
                              : i === 2
                                ? "bg-purple-500"
                                : i === 3
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm">{source.source}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
