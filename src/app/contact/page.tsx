"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, Mail, Phone, MessageSquare, User } from 'lucide-react'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
    setIsSubmitting(false)
    console.log('Form submitted:', formData)
  }

  return (
    <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold mb-2">
            Let's Connect
          </p>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get in touch with me. I will get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Card */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-8 h-full shadow-md dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold">Let's Talk</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. Let's create something amazing together!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5" />
                  <span>anas23khan083@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="h-5 w-5" />
                  <span>+91 8974658710</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-8 h-full shadow-md dark:shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/10 dark:bg-green-400/10 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold">Send me a message</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form below and I will get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="name" 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="phone" 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 8974658710"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="email" 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="anas23khan083@gmail.com"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="message" 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    rows={5}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-6 text-lg dark:bg-white dark:text-black bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Prefer a different way to connect? Find me on{" "}
            <a 
              href="https://www.x.com/Anas_is_me/" 
            target="_blank"
            rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
            >
              social media
            </a>{" "}
            or drop me a line directly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
