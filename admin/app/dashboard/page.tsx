import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Package, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your content efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/landing-page"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <ImageIcon className="h-5 w-5" />
                <div>
                  <p className="font-medium">Landing Page Content</p>
                  <p className="text-sm text-muted-foreground">Update hero sections, features, and new arrivals</p>
                </div>
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <Package className="h-5 w-5" />
                <div>
                  <p className="font-medium">Products Management</p>
                  <p className="text-sm text-muted-foreground">Add and edit product information and images</p>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest content updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-sm">Hero carousel updated</p>
                  <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <p className="text-sm">New product added</p>
                  <span className="ml-auto text-xs text-muted-foreground">4 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <p className="text-sm">Feature cards modified</p>
                  <span className="ml-auto text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
