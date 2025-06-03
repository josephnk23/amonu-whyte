"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Plus, X, Upload, Image as ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useRef, use } from "react"
import Image from "next/image"

// Update the ProductImage interface to include filename
interface ProductImage {
  id: string
  url: string
  alt: string
  filename?: string  // Add this
}

export default function EditProduct({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [selectedDisplayImage, setSelectedDisplayImage] = useState<string>("")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [stockLevel, setStockLevel] = useState(0)

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  // File upload handler
  const handleFileUpload = (file: File, callback: (url: string, filename: string) => void) => {
    const url = URL.createObjectURL(file)
    callback(url, file.name)
  }

  // Image management functions
  const addProductImage = () => {
    const newImage: ProductImage = {
      id: Date.now().toString(),
      url: "",
      alt: ""
    }
    setProductImages([...productImages, newImage])
  }

  const removeProductImage = (id: string) => {
    setProductImages(productImages.filter(img => img.id !== id))
    if (selectedDisplayImage === id) {
      setSelectedDisplayImage("")
    }
  }

  const updateProductImage = (id: string, field: keyof ProductImage, value: string, filename?: string) => {
    setProductImages(productImages.map(img => 
      img.id === id ? { 
        ...img, 
        [field]: value,
        ...(filename && { filename })
      } : img
    ))
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size))
    }
  }

  // Image Upload Component
  const ImageUpload = ({ 
    value, 
    onChange, 
    label,
    onRemove,
    filename
  }: { 
    value: string
    onChange: (value: string, filename?: string) => void
    label: string
    onRemove?: () => void
    filename?: string
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, (url, filename) => {
          onChange(url, filename)
        })
      }
    }

    // Extract filename from URL or file path
    const getFileName = (url: string, storedFilename?: string) => {
      console.log("getFileName called with url:", url, "filename:", storedFilename)
      if (!url) return ""
      
      // If we have a stored filename (from file upload), use it
      if (storedFilename) return storedFilename
      
      // For blob URLs without stored filename, return generic name
      if (url.startsWith("blob:")) return "Uploaded file"
      
      // For regular URLs, extract the filename
      return url.split('/').pop() || url
    }

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 relative">
          {value ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{getFileName(value, filename)}</p>
                    <p className="text-xs text-gray-500">Image uploaded</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImagePreviewModal src={value} alt={label} />
                  {onRemove && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={onRemove}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <p className="text-sm text-gray-500">or enter URL below</p>
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter image URL"
                  className="mt-2"
                />
              </div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    )
  }

  // Update the ImagePreviewModal component to work as a standalone button
  const ImagePreviewModal = ({ src, alt }: { src: string; alt: string }) => {
    if (!src) return null
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img 
              src={src} 
              alt={alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
              </Button>
            </Link>
            <div className="h-4 w-px bg-border mx-2" />
            <h1 className="text-xl font-semibold">
              {resolvedParams.slug === 'new' ? 'Add New Product' : `Edit Product`}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Basic Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Product Details</CardTitle>
            <CardDescription>Enter the core product information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-description">Color Description</Label>
                <Input id="color-description" placeholder="Enter color description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₵</span>
                  <Input id="price" placeholder="0.00" className="pl-8" type="number" step="0.01" />
                </div>
              </div>
             
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twinsets">Twinsets</SelectItem>
                    <SelectItem value="shirts">Shirts</SelectItem>
                    <SelectItem value="shorts">Shorts</SelectItem>
                    <SelectItem value="jeans">Jeans</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Upload and manage product images (up to 7 images)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {productImages.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded</h3>
                <p className="text-gray-500 mb-4">Add your first product image to get started</p>
                <Button onClick={addProductImage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Image
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {productImages.map((image, index) => (
                  <div key={image.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Product Image {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeProductImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <ImageUpload
                          value={image.url}
                          onChange={(value, filename) => {
                            updateProductImage(image.id, 'url', value, filename)
                          }}
                          label={`Image ${index + 1}`}
                          filename={image.filename}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                      
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {productImages.length > 0 && productImages.length < 7 && (
              <Button
                type="button"
                variant="outline"
                onClick={addProductImage}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            )}

            {productImages.length > 0 && (
              <>
                <Separator />
                {/* Product Listing Display Image */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Product Listing Display Image</Label>
                    <p className="text-sm text-muted-foreground">Choose which image appears on the product listing page</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedDisplayImage}
                      onValueChange={setSelectedDisplayImage}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select display image" />
                      </SelectTrigger>
                      <SelectContent>
                        {productImages.map((image, index) => (
                          <SelectItem key={image.id} value={image.id}>
                            Product Image {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDisplayImage && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Preview:</span>
                        <div className="h-12 w-12 rounded border bg-muted flex items-center justify-center overflow-hidden">
                          {(() => {
                            const selectedImage = productImages.find(img => img.id === selectedDisplayImage)
                            return selectedImage?.url ? (
                              <img
                                src={selectedImage.url}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            )
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Product Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
            <CardDescription>Select available sizes for this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-base font-medium">Available Sizes</Label>
              <div className="flex flex-wrap gap-4">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                    />
                    <Label htmlFor={size} className="text-sm font-medium">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSizes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Selected sizes:</span>
                  {selectedSizes.map((size) => (
                    <Badge key={size} variant="secondary">
                      {size}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Availability & Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Stock status and inventory levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stock-status">Stock Status</Label>
                <Input id="stock-status" placeholder="e.g., In stock, and ready to ship" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock-level">Stock Level (%)</Label>
                <Input 
                  id="stock-level" 
                  type="number" 
                  min="0" 
                  max="100"
                  value={stockLevel}
                  onChange={(e) => setStockLevel(Number(e.target.value))}
                  placeholder="Enter stock percentage" 
                />
                <Progress value={stockLevel} className="w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Shipping countdown and delivery details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="countdown-hours">Hours</Label>
                  <Input id="countdown-hours" type="number" min="0" placeholder="16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="countdown-minutes">Minutes</Label>
                  <Input id="countdown-minutes" type="number" min="0" max="59" placeholder="12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="countdown-seconds">Seconds</Label>
                  <Input id="countdown-seconds" type="number" min="0" max="59" placeholder="52" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Delivery Date</Label>
                <Input id="delivery-date" placeholder="e.g., Friday, 23 May" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reward-points">Reward Points</Label>
                <Input id="reward-points" type="number" min="0" placeholder="375" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Features */}
        <Card>
          <CardHeader>
            <CardTitle>Product Features</CardTitle>
            <CardDescription>Detailed product specifications and features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tee-features">Tee Features</Label>
              <Textarea
                id="tee-features"
                placeholder="Enter tee features (use • for bullet points)&#10;• Feature 1&#10;• Feature 2"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="short-features">Short Features</Label>
              <Textarea
                id="short-features"
                placeholder="Enter short features (use • for bullet points)&#10;• Feature 1&#10;• Feature 2"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model-info">Model Information</Label>
              <Input
                id="model-info"
                placeholder="e.g., Model is 6ft and wears a size M top and bottom."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">Product Description</Label>
              <Textarea
                id="product-description"
                placeholder="Enter detailed product description..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tab Content Management */}
        <Card>
          <CardHeader>
            <CardTitle>Tab Content Management</CardTitle>
            <CardDescription>Manage content for product page tabs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-2">
                <Label htmlFor="description-tab">Description Tab Content</Label>
                <Textarea id="description-tab" placeholder="Enter description tab content..." rows={6} />
              </TabsContent>
              <TabsContent value="shipping" className="space-y-2">
                <Label htmlFor="shipping-tab">Shipping Tab Content</Label>
                <Textarea id="shipping-tab" placeholder="Enter shipping information and policies..." rows={6} />
              </TabsContent>
              <TabsContent value="returns" className="space-y-2">
                <Label htmlFor="returns-tab">Returns Tab Content</Label>
                <Textarea id="returns-tab" placeholder="Enter returns and exchange policies..." rows={6} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Save & Publish</Button>
        </div>
      </div>
    </div>
  )
}