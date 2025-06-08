import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Truck, User, Phone } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '../../../../contexts/CartContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../../../components/ui/radio-group';
import { Checkbox } from '../../../../components/ui/checkbox';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { BackgroundByAnima } from '../Header2';
import { FooterByAnima } from '../FooterByAnima';
import { FooterWrapperByAnima } from '../FooterWrapperByAnima/FooterWrapperByAnima';

// Helper function to format price
const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₵`;
};

// Checkout form validation schema
const checkoutSchema = z.object({
  // Customer Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  
  // Shipping Address
  streetAddress: z.string().min(5, 'Please enter a valid street address'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'Please select a state'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
  country: z.string().min(2, 'Please select a country'),
  
  // Payment Information (optional initially)
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
  momoNumber: z.string().optional(),
  
  // Options
  shippingMethod: z.enum(['standard', 'express'], {
    errorMap: () => ({ message: 'Please select a shipping method' })
  }),
  paymentMethod: z.enum(['card', 'momo'], {
    errorMap: () => ({ message: 'Please select a payment method' })
  }),
  
  // Agreements
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
}).superRefine((data, ctx) => {
  // Conditional validation for payment methods
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber || data.cardNumber.length < 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Card number is required and must be at least 13 digits',
        path: ['cardNumber']
      });
    }
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter expiry date in MM/YY format',
        path: ['expiryDate']
      });
    }
    if (!data.cvv || data.cvv.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CVV must be at least 3 digits',
        path: ['cvv']
      });
    }
    if (!data.cardholderName || data.cardholderName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cardholder name is required',
        path: ['cardholderName']
      });
    }
  }
  
  if (data.paymentMethod === 'momo') {
    if (!data.momoNumber || data.momoNumber.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mobile money number is required',
        path: ['momoNumber']
      });
    }
  }
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      shippingMethod: 'standard',
      paymentMethod: 'card',
      termsAccepted: false,
      country: 'Ghana',
    },
  });

  const watchedPaymentMethod = watch('paymentMethod');
  const watchedShippingMethod = watch('shippingMethod');

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = watchedShippingMethod === 'express' ? 15 : (totalPrice >= 50 ? 0 : 5);
  const tax = totalPrice * 0.125; // 12.5% tax
  const finalTotal = totalPrice + shippingCost + tax;
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate order processing
      console.log('Order data:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Order placed successfully!');
      clearCart();
      
      // In a real app, you would redirect to a success page
      // navigate('/order-success');
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <BackgroundByAnima />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-['Outfit',Helvetica] font-normal text-2xl text-[#111111] mb-4">
              Your cart is empty
            </h1>
            <Link to="/products">
              <Button className="bg-black text-white rounded-none px-8 py-3 font-['Outfit',Helvetica] text-sm hover:bg-gray-800">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BackgroundByAnima />
      
      {/* Breadcrumb */}
      <Breadcrumb className="w-full text-black py-4 border-b-[1px] font-elfrida-qodeinteractive-com-semantic-label-upper font">
        <div className="w-full mt-20 container mx-auto px-4 py-0">
          <BreadcrumbList className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink className='text-base' href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className='text-base' href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className='text-base'>Checkout</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>    
      </Breadcrumb>

      <section className="w-full font-elfrida-qodeinteractive-com-semantic-heading-3-upper font">
        <div className="max-w-[1526px] mt-10 mx-auto px-4 md:px-8 lg:px-16 py-8">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-['Outfit',Helvetica] font-normal text-[#111111] text-2xl lg:text-3xl tracking-[0.05px]">
                CHECKOUT
              </h1>
              <Link 
                to="/cart" 
                className="flex items-center gap-2 font-['Outfit',Helvetica] text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            </div>
            
            {/* Security Notice */}
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3">
              <Lock className="h-4 w-4" />
              <span className="font-['Outfit',Helvetica] text-sm">
                Secure checkout - Your information is protected with SSL encryption
              </span>
            </div>
          </div>          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Checkout Form */}
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8">
              
              {/* Customer Information */}
              <Card className="border border-gray-200 rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <h2 className="font-['Outfit',Helvetica] font-medium text-[#111111] text-lg">
                        Customer Information
                      </h2>
                    </div>
                  </div>
                    <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                          First Name *
                        </Label>
                        <Input 
                          {...register('firstName')}
                          className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                          Last Name *
                        </Label>
                        <Input 
                          {...register('lastName')}
                          className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                        Email Address *
                      </Label>
                      <Input 
                        {...register('email')}
                        type="email"
                        className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                        Phone Number *
                      </Label>
                      <Input 
                        {...register('phone')}
                        type="tel"
                        className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border border-gray-200 rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-gray-600" />
                      <h2 className="font-['Outfit',Helvetica] font-medium text-[#111111] text-lg">
                        Shipping Address
                      </h2>
                    </div>
                  </div>
                    <div className="p-6 space-y-4">
                    <div>
                      <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                        Street Address *
                      </Label>
                      <Input 
                        {...register('streetAddress')}
                        className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                        placeholder="Enter your street address"
                      />
                      {errors.streetAddress && (
                        <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                          {errors.streetAddress.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                          City *
                        </Label>
                        <Input 
                          {...register('city')}
                          className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                          placeholder="City"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                          Region *
                        </Label>
                        <Input 
                          {...register('state')}
                          className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                          placeholder="Region"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                          Postal Code *
                        </Label>
                        <Input 
                          {...register('zipCode')}
                          className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                          placeholder="Postal Code"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="border border-gray-200 rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-gray-600" />
                      <h2 className="font-['Outfit',Helvetica] font-medium text-[#111111] text-lg">
                        Shipping Method
                      </h2>
                    </div>
                  </div>
                    <div className="p-6">
                    <Controller
                      name="shippingMethod"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange}>
                          <div className="flex items-center space-x-3 p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-['Outfit',Helvetica] font-medium text-[#111111]">Standard Shipping</p>
                                  <p className="font-['Outfit',Helvetica] text-sm text-gray-600">5-7 business days</p>
                                </div>
                                <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                                  {totalPrice >= 50 ? 'FREE' : formatPrice(5)}
                                </span>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-['Outfit',Helvetica] font-medium text-[#111111]">Express Shipping</p>
                                  <p className="font-['Outfit',Helvetica] text-sm text-gray-600">2-3 business days</p>
                                </div>
                                <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                                  {formatPrice(15)}
                                </span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.shippingMethod && (
                      <p className="text-red-500 text-sm mt-2 font-['Outfit',Helvetica]">
                        {errors.shippingMethod.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border border-gray-200 rounded-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <h2 className="font-['Outfit',Helvetica] font-medium text-[#111111] text-lg">
                        Payment Method
                      </h2>
                    </div>
                  </div>
                    <div className="p-6">
                    <Controller
                      name="paymentMethod"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange}>
                          <div className="flex items-center space-x-3 p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <CreditCard className="h-4 w-4" />
                                <span className="font-['Outfit',Helvetica] text-[#111111]">Credit/Debit Card</span>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="momo" id="momo" />
                            <Label htmlFor="momo" className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4" />
                                <span className="font-['Outfit',Helvetica] text-[#111111]">Mobile Money</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.paymentMethod && (
                      <p className="text-red-500 text-sm mt-2 font-['Outfit',Helvetica]">
                        {errors.paymentMethod.message}
                      </p>
                    )}

                    {watchedPaymentMethod === 'card' && (
                      <div className="mt-6 space-y-4 p-4 bg-gray-50 border border-gray-200">
                        <div>
                          <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                            Card Number *
                          </Label>
                          <Input 
                            {...register('cardNumber')}
                            className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                              Expiry Date *
                            </Label>
                            <Input 
                              {...register('expiryDate')}
                              className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                                {errors.expiryDate.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                              CVV *
                            </Label>
                            <Input 
                              {...register('cvv')}
                              className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                              placeholder="123"
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                            Cardholder Name *
                          </Label>
                          <Input 
                            {...register('cardholderName')}
                            className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                            placeholder="Name on card"
                          />
                          {errors.cardholderName && (
                            <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                              {errors.cardholderName.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {watchedPaymentMethod === 'momo' && (
                      <div className="mt-6 space-y-4 p-4 bg-gray-50 border border-gray-200">
                        <div>
                          <Label className="font-['Outfit',Helvetica] text-sm text-[#111111] mb-2 block">
                            Mobile Money Number *
                          </Label>
                          <Input 
                            {...register('momoNumber')}
                            className="rounded-none border-gray-300 font-['Outfit',Helvetica]" 
                            placeholder="Enter your mobile money number"
                          />
                          {errors.momoNumber && (
                            <p className="text-red-500 text-sm mt-1 font-['Outfit',Helvetica]">
                              {errors.momoNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>              {/* Terms and Conditions */}
              <Card className="border border-gray-200 rounded-none overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Controller
                      name="termsAccepted"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-none border-gray-300 mt-1"
                        />
                      )}
                    />
                    <Label htmlFor="terms" className="font-['Outfit',Helvetica] text-sm text-[#111111] leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-black underline hover:no-underline">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-black underline hover:no-underline">
                        Privacy Policy
                      </Link>
                      . I understand that my order will be processed according to these terms.
                    </Label>
                  </div>                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-2 font-['Outfit',Helvetica]">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border border-gray-200 rounded-none overflow-hidden">
                  <CardContent className="p-0">
                    
                    {/* Header */}
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <h2 className="font-['Outfit',Helvetica] font-medium text-[#111111] text-lg">
                        Order Summary
                      </h2>
                    </div>
                    
                    {/* Order Items */}
                    <div className="p-4 border-b border-gray-200 max-h-60 overflow-y-auto">
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-12 h-12 bg-gray-100 overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-['Outfit',Helvetica] text-sm text-[#111111] truncate">
                                {item.name}
                              </p>
                              <p className="font-['Outfit',Helvetica] text-xs text-gray-600">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                                {formatPrice(item.currentPrice * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Summary Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-['Outfit',Helvetica] text-sm text-gray-600">
                          Subtotal ({itemCount} items)
                        </span>
                        <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                        <div className="flex justify-between items-center">
                        <span className="font-['Outfit',Helvetica] text-sm text-gray-600">
                          Shipping
                        </span>
                        <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                          {watchedShippingMethod === 'express' ? formatPrice(15) : 
                           (totalPrice >= 50 ? 'FREE' : formatPrice(5))}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-['Outfit',Helvetica] text-sm text-gray-600">
                          Tax (12.5%)
                        </span>
                        <span className="font-['Outfit',Helvetica] text-sm text-[#111111]">
                          {formatPrice(tax)}
                        </span>
                      </div>
                      
                      <hr className="border-gray-200" />
                      
                      <div className="flex justify-between items-center">
                        <span className="font-['Outfit',Helvetica] font-medium text-[#111111] text-base">
                          Total
                        </span>
<span className="font-['Outfit',Helvetica] font-medium text-[#111111] text-xl">
   {formatPrice(finalTotal)}
  </span>
                      </div>
                    </div>                      {/* Place Order Button */}
                    <div className="p-4 border-t border-gray-200">
                      <Button 
                        type="submit"
                        form="checkout-form"
                        disabled={!isValid || isSubmitting}
                        className="w-full bg-black text-white rounded-none py-4 font-['Outfit',Helvetica] text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                      </Button>
                      
                      <div className="mt-4 text-center">
                        <p className="font-['Outfit',Helvetica] text-xs text-gray-500">
                          🔒 Your payment information is secure and encrypted
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterByAnima />
      <FooterWrapperByAnima />
    </>
  );
};