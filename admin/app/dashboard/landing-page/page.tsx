"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useRef } from "react"
import { Plus, X, Upload, Image as ImageIcon, Eye } from "lucide-react"

interface HeroSlide {
  id: string
  image: string
  headline: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

interface FeatureCard {
  id: string
  image: string
  overlayText: string
  buttonText: string
  buttonLink: string
}

interface Product {
  id: string
  image: string
  title: string
  description: string
  price: string
}

export default function LandingPageContent() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [primaryHeadline, setPrimaryHeadline] = useState("")
  const [sectionTitle, setSectionTitle] = useState("")

  // File upload handlers
  const handleFileUpload = (file: File, callback: (url: string) => void) => {
    // In a real app, you'd upload to a server/cloud storage
    // For now, we'll create a local object URL for preview
    const url = URL.createObjectURL(file)
    callback(url)
  }

  // Hero slide management
  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      image: "",
      headline: "",
      subtitle: "",
      buttonText: "",
      buttonLink: ""
    }
    setHeroSlides([...heroSlides, newSlide])
  }

  const removeHeroSlide = (id: string) => {
    setHeroSlides(heroSlides.filter(slide => slide.id !== id))
  }

  const updateHeroSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setHeroSlides(heroSlides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ))
  }

  // Feature card management
  const addFeatureCard = () => {
    const newCard: FeatureCard = {
      id: Date.now().toString(),
      image: "",
      overlayText: "",
      buttonText: "",
      buttonLink: ""
    }
    setFeatureCards([...featureCards, newCard])
  }

  const removeFeatureCard = (id: string) => {
    setFeatureCards(featureCards.filter(card => card.id !== id))
  }

  const updateFeatureCard = (id: string, field: keyof FeatureCard, value: string) => {
    setFeatureCards(featureCards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ))
  }

  // Product management
  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      image: "",
      title: "",
      description: "",
      price: ""
    }
    setNewArrivals([...newArrivals, newProduct])
  }

  const removeProduct = (id: string) => {
    setNewArrivals(newArrivals.filter(product => product.id !== id))
  }

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setNewArrivals(newArrivals.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ))
  }

  // Image preview modal component
  const ImagePreviewModal = ({ src, alt }: { src: string; alt: string }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute top-2 left-2 bg-white/90 hover:bg-white"
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

  // Image upload component
  const ImageUpload = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: string
    onChange: (value: string) => void
    label: string 
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, onChange)
      }
    }

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {value ? (
            <div className="space-y-3">
              <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={value} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <ImagePreviewModal src={value} alt={label} />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => onChange("")}
                >
                  <X className="h-4 w-4" />
                </Button>
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

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-xl font-semibold">Landing Page Content</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        
        {/* Hero Carousel Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Carousel Section</CardTitle>
            <CardDescription>Manage the main hero carousel slides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {heroSlides.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No slides yet. Add your first slide to get started.</p>
              </div>
            ) : (
              heroSlides.map((slide, index) => (
                <div key={slide.id} className="space-y-4 p-4 border rounded-lg relative">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Slide {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeHeroSlide(slide.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <ImageUpload
                        value={slide.image}
                        onChange={(value) => updateHeroSlide(slide.id, 'image', value)}
                        label="Slide Image"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Main Headline</Label>
                      <Input
                        value={slide.headline}
                        onChange={(e) => updateHeroSlide(slide.id, 'headline', e.target.value)}
                        placeholder="Enter headline"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(slide.id, 'subtitle', e.target.value)}
                        placeholder="Enter subtitle"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={slide.buttonText}
                        onChange={(e) => updateHeroSlide(slide.id, 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input
                        value={slide.buttonLink}
                        onChange={(e) => updateHeroSlide(slide.id, 'buttonLink', e.target.value)}
                        placeholder="Enter button link"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button
              type="button"
              variant="outline"
              onClick={addHeroSlide}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </CardContent>
        </Card>

        {/* Main Headline Section */}
        <Card>
          <CardHeader>
            <CardTitle>Main Headline Section</CardTitle>
            <CardDescription>Primary headline for the page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Primary Headline</Label>
              <Textarea
                value={primaryHeadline}
                onChange={(e) => setPrimaryHeadline(e.target.value)}
                placeholder="Enter primary headline"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Three Feature Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Cards Section</CardTitle>
            <CardDescription>Manage feature cards displayed on the homepage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {featureCards.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No feature cards yet. Add your first card to get started.</p>
              </div>
            ) : (
              featureCards.map((card, index) => (
                <div key={card.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Feature Card {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeatureCard(card.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <ImageUpload
                        value={card.image}
                        onChange={(value) => updateFeatureCard(card.id, 'image', value)}
                        label="Background Image"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Overlay Text</Label>
                      <Input
                        value={card.overlayText}
                        onChange={(e) => updateFeatureCard(card.id, 'overlayText', e.target.value)}
                        placeholder="Enter overlay text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={card.buttonText}
                        onChange={(e) => updateFeatureCard(card.id, 'buttonText', e.target.value)}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Button Link</Label>
                      <Input
                        value={card.buttonLink}
                        onChange={(e) => updateFeatureCard(card.id, 'buttonLink', e.target.value)}
                        placeholder="Enter button link"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button
              type="button"
              variant="outline"
              onClick={addFeatureCard}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature Card
            </Button>
          </CardContent>
        </Card>

        {/* Fashion Boutique Section */}
        <Card>
          <CardHeader>
            <CardTitle>Fashion Boutique Section</CardTitle>
            <CardDescription>Manage the boutique information section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ImageUpload
                  value=""
                  onChange={() => {}}
                  label="Logo Image"
                />
              </div>
              <div>
                <ImageUpload
                  value=""
                  onChange={() => {}}
                  label="Side Image"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Main Heading</Label>
              <Textarea
                placeholder="Enter main heading"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input placeholder="Enter button text" />
              </div>
              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input placeholder="Enter button link" />
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input placeholder="Enter background color" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Arrivals Section */}
        <Card>
          <CardHeader>
            <CardTitle>New Arrivals Section</CardTitle>
            <CardDescription>Manage the new arrivals product showcase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input 
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Enter section title" 
              />
            </div>
            <Separator />
            {newArrivals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No products yet. Add your first product to get started.</p>
              </div>
            ) : (
              newArrivals.map((product, index) => (
                <div key={product.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Product {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <ImageUpload
                        value={product.image}
                        onChange={(value) => updateProduct(product.id, 'image', value)}
                        label="Product Image"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={product.title}
                        onChange={(e) => updateProduct(product.id, 'title', e.target.value)}
                        placeholder="Enter product title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price</Label>
                      <Input
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={product.description}
                        onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                        placeholder="Enter product description"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button
              type="button"
              variant="outline"
              onClick={addProduct}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg">Save All Changes</Button>
        </div>
      </div>
    </div>
  )
}
