"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Copy, Eye, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: string
  category: string
  stock: number
  image: string
  lastModified: string
}

export default function ProductsOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "DREAM IS FREE TWINSET 2.0",
      price: "£75.00",
      category: "Twinsets",
      stock: 25,
      image: "/link---dream-is-free-twinset-2-0---light-grey-grey.png",
      lastModified: "2 hours ago"
    },
    {
      id: "2", 
      name: "General Cargo Short 2.0",
      price: "£48.00",
      category: "Shorts",
      stock: 12,
      image: "/placeholder.svg",
      lastModified: "1 day ago"
    },
    {
      id: "3",
      name: "Al Jean - Black",
      price: "£65.00", 
      category: "Jeans",
      stock: 0,
      image: "/placeholder.svg",
      lastModified: "3 days ago"
    }
  ])

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge className='max-w-[100px]' variant="destructive">Out of Stock</Badge>
    if (stock <= 5) return <Badge className="bg-orange-100 max-w-[70px]  text-orange-800 hover:bg-orange-100">Low Stock</Badge>
    return <Badge className="bg-green-100 text-green-800 max-w-[70px] hover:bg-green-100">In Stock</Badge>
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between gap-2">
          <h1 className="text-xl font-semibold">Products</h1>
          <Link href="/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </header>
    
       

      <div className="flex-1 space-y-6 p-4 md:p-8">
        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</div>
              <div className="text-sm text-muted-foreground">I n Stock Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{products.filter(p => p.stock <= 5).length}</div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Twinsets">Twinsets</SelectItem>
                  <SelectItem value="Shorts">Shorts</SelectItem>
                  <SelectItem value="Jeans">Jeans</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="h-12 w-12 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{product.stock} units</span>
                        {getStockBadge(product.stock)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {product.lastModified}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.id}`} className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Live
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || categoryFilter !== "all" 
                    ? "Try adjusting your filters or search terms"
                    : "Get started by adding your first product"
                  }
                </p>
                <Link href="/products/new">
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
       
      </div>
    </div>
  )
}
