"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold text-[#1f2937] mb-2">Contact Us</h1>
      <p className="text-[#6b7280] mb-10">We're here to help. Reach out anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <p className="font-semibold text-[#1f2937]">Phone</p>
              <p className="text-[#6b7280] text-sm">+20 100 000 0000</p>
              <p className="text-[#6b7280] text-sm">Available 24/7</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <p className="font-semibold text-[#1f2937]">Email</p>
              <p className="text-[#6b7280] text-sm">support@freshcart.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <p className="font-semibold text-[#1f2937]">Address</p>
              <p className="text-[#6b7280] text-sm">Cairo, Egypt</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="p-6 bg-[#10b981]/10 rounded-xl text-center">
              <Send className="w-8 h-8 text-[#10b981] mx-auto mb-3" />
              <p className="text-[#1f2937] font-semibold text-lg">Message Sent!</p>
              <p className="text-[#6b7280] text-sm mt-1">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" required className="mt-1 min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
