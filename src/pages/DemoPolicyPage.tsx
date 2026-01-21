import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, FileText, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DemoPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur border-b border-border">
        <div className="container flex h-14 items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Demo Policy & Terms</h1>
        </div>
      </header>

      <main className="container py-6 pb-24 md:pb-8 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <img 
            src="/jl-software-logo.png" 
            alt="JL Software" 
            className="h-16 mx-auto"
          />
          <h1 className="text-2xl md:text-3xl font-bold">
            Demo Rules, Policy & Agreement
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using the JL Software Marketplace Demo Application.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Important Demo Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              <strong>This is a DEMONSTRATION APPLICATION only.</strong> This application is designed 
              to showcase the capabilities of a multi-vendor marketplace platform developed by JL Software.
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
              <li>No real transactions are processed</li>
              <li>No real payments are collected</li>
              <li>All data displayed is mock/sample data</li>
              <li>No personal information is stored permanently</li>
              <li>This is not a production e-commerce platform</li>
            </ul>
          </CardContent>
        </Card>

        {/* Demo Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Demo Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">1. Purpose of Demo</h4>
              <p className="text-sm text-muted-foreground">
                This demo application is provided solely for the purpose of showcasing JL Software's 
                multi-vendor marketplace capabilities to potential clients, partners, and stakeholders. 
                It demonstrates the features, user interface, and functionality that can be customized 
                for your business needs.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">2. Mock Data Usage</h4>
              <p className="text-sm text-muted-foreground">
                All products, vendors, users, orders, and other data displayed in this demo are 
                fictitious and generated for demonstration purposes. Any resemblance to real products, 
                businesses, or individuals is purely coincidental.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">3. No Real Transactions</h4>
              <p className="text-sm text-muted-foreground">
                This demo does not process real payments. All payment methods shown (M-Pesa, Card, etc.) 
                are simulated. Do not enter real payment information. JL Software is not responsible 
                for any attempts to make real purchases through this demo.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">4. Data Privacy</h4>
              <p className="text-sm text-muted-foreground">
                While this demo allows you to create accounts and simulate actions, please avoid 
                entering sensitive personal information. Demo data may be reset periodically. 
                JL Software does not collect, store, or sell any personal data from this demo.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">5. Intellectual Property</h4>
              <p className="text-sm text-muted-foreground">
                This demo application, including its design, code, and functionality, is the 
                intellectual property of JL Software. Unauthorized reproduction, distribution, 
                or commercial use is prohibited without written consent.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">6. Demo Availability</h4>
              <p className="text-sm text-muted-foreground">
                JL Software reserves the right to modify, update, or discontinue this demo at any 
                time without prior notice. We do not guarantee uninterrupted access to the demo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms of Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              Terms of Use Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By accessing and using this demo application, you agree to the following terms:
            </p>
            
            <ul className="text-sm space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You understand this is a demonstration and not a real marketplace
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You will not attempt to make real purchases or payments
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You will not misuse the demo for any unlawful purposes
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You acknowledge JL Software's ownership of all demo content
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You agree not to reverse engineer or copy the application
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                You consent to potential demo data resets
              </li>
            </ul>

            <div className="bg-muted/50 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium">
                Disclaimer of Liability
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                JL Software provides this demo "as is" without warranties of any kind. We shall 
                not be liable for any damages arising from the use or inability to use this demo. 
                Use at your own discretion.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Contact JL Software</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Interested in this marketplace solution for your business? Get in touch!
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Email */}
              <a 
                href="mailto:info@javalab.co.ke" 
                className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors border"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-xs text-muted-foreground">info@javalab.co.ke</p>
                </div>
              </a>

              {/* Phone 1 */}
              <a 
                href="tel:0111679286" 
                className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors border"
              >
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-xs text-muted-foreground">0111 679 286</p>
                </div>
              </a>

              {/* Phone 2 / WhatsApp */}
              <a 
                href="https://wa.me/254741837945" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors border"
              >
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">+254 741 837 945</p>
                </div>
              </a>
            </div>

            <Separator />

            <div className="text-center space-y-2">
              <p className="text-sm font-medium">JL Software</p>
              <p className="text-xs text-muted-foreground">
                Building scalable software solutions for African businesses
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} JL Software. All rights reserved.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/">Return to Marketplace</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DemoPolicyPage;
