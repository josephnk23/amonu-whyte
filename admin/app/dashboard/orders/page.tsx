"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Filter, MoreHorizontal, Search, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock order data
const orders = [
  {
    id: "ORD-7652",
    customer: {
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-18",
    status: "delivered",
    total: 120.5,
    items: [
      {
        id: "PROD-001",
        name: "DREAM IS FREE TWINSET 2.0",
        price: 75.0,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      { id: "PROD-015", name: "SILK SCARF", price: 45.5, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
    ],
    shipping: {
      address: "123 High Street, London, UK",
      method: "Standard Delivery",
      tracking: "TRK123456789",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
    },
  },
  {
    id: "ORD-7651",
    customer: {
      name: "James Wilson",
      email: "james.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-17",
    status: "processing",
    total: 320.0,
    items: [
      { id: "PROD-003", name: "BORDEUX BAG", price: 320.0, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
    ],
    shipping: {
      address: "456 Main Road, Manchester, UK",
      method: "Express Delivery",
      tracking: "TRK987654321",
    },
    payment: {
      method: "PayPal",
      email: "james.wilson@example.com",
    },
  },
  {
    id: "ORD-7650",
    customer: {
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-16",
    status: "shipped",
    total: 250.0,
    items: [
      { id: "PROD-002", name: "YELLOW BAG", price: 250.0, quantity: 1, image: "/placeholder.svg?height=60&width=60" },
    ],
    shipping: {
      address: "789 Broadway, New York, USA",
      method: "International Shipping",
      tracking: "TRK456789123",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
    },
  },
  {
    id: "ORD-7649",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-15",
    status: "delivered",
    total: 640.0,
    items: [
      { id: "PROD-003", name: "BORDEUX BAG", price: 320.0, quantity: 2, image: "/placeholder.svg?height=60&width=60" },
    ],
    shipping: {
      address: "101 Harbour Street, Sydney, Australia",
      method: "International Express",
      tracking: "TRK789123456",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "5678",
    },
  },
  {
    id: "ORD-7648",
    customer: {
      name: "Olivia Davis",
      email: "olivia.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-05-14",
    status: "cancelled",
    total: 75.0,
    items: [
      {
        id: "PROD-001",
        name: "DREAM IS FREE TWINSET 2.0",
        price: 75.0,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    shipping: {
      address: "202 Queen Street, Toronto, Canada",
      method: "Standard Delivery",
      tracking: "",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "9012",
    },
  },
]

const statusColors: Record<string, string> = {
  processing: "bg-blue-500",
  shipped: "bg-amber-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
  returned: "bg-purple-500",
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Orders</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
           
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Order Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,978</div>
              <p className="text-xs text-muted-foreground">+43 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">-5 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+12 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵84.32</div>
              <p className="text-xs text-muted-foreground">+₵3.14 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage and track customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="highest">Highest Value</SelectItem>
                      <SelectItem value="lowest">Lowest Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b py-3 px-4 text-xs font-medium text-muted-foreground">
                    <div className="col-span-1">
                      <Checkbox />
                    </div>
                    <div className="col-span-2">Order</div>
                    <div className="col-span-3">Customer</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Total</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-12 items-center border-b py-3 px-4 hover:bg-muted/50">
                      <div className="col-span-1">
                        <Checkbox />
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">{order.id}</div>
                        <div className="text-xs text-muted-foreground">{order.date}</div>
                      </div>
                      <div className="col-span-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                          <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${statusColors[order.status]}`} />
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-right">₵{order.total.toFixed(2)}</div>
                      <div className="col-span-2 text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order)
                              setIsDialogOpen(true)
                            }}
                          >
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit Order</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Other tabs would have similar content but filtered by status */}
              <TabsContent value="processing" className="m-0">
                <div className="rounded-md border">{/* Similar structure but filtered for processing orders */}</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>View and manage order information</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedOrder.id}</h3>
                    <p className="text-sm text-muted-foreground">Placed on {selectedOrder.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${statusColors[selectedOrder.status]}`} />
                    <span className="capitalize font-medium">{selectedOrder.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedOrder.customer.avatar || "/placeholder.svg"}
                          alt={selectedOrder.customer.name}
                        />
                        <AvatarFallback>{selectedOrder.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedOrder.customer.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedOrder.customer.email}</div>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium mb-2">Shipping Information</h4>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm">{selectedOrder.shipping.address}</p>
                      <p className="text-sm">
                        <span className="font-medium">Method:</span> {selectedOrder.shipping.method}
                      </p>
                      {selectedOrder.shipping.tracking && (
                        <p className="text-sm">
                          <span className="font-medium">Tracking:</span> {selectedOrder.shipping.tracking}
                        </p>
                      )}
                    </div>

                    <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Method:</span> {selectedOrder.payment.method}
                      </p>
                      {selectedOrder.payment.cardLast4 && (
                        <p className="text-sm">
                          <span className="font-medium">Card:</span> •••• {selectedOrder.payment.cardLast4}
                        </p>
                      )}
                      {selectedOrder.payment.email && (
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> {selectedOrder.payment.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Order Summary</h4>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {selectedOrder.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="h-16 w-16 rounded border bg-muted flex items-center justify-center">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {item.quantity} x ₵{item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">₵{(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between">
                            <span className="font-medium">Subtotal</span>
                            <span>₵{selectedOrder.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Shipping</span>
                            <span>₵0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Tax</span>
                            <span>₵0.00</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>₵{selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Print Invoice</Button>
                  <Select defaultValue={selectedOrder.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
