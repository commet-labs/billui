import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  InvoiceCard,
  InvoiceCardIcon,
  InvoiceCardContent,
  InvoiceCardHeader,
  InvoiceCardNumber,
  InvoiceCardStatus,
  InvoiceCardDate,
  InvoiceCardAmount,
  InvoiceCardActions,
  InvoiceCardAction,
  PaymentMethod,
  PaymentMethodIcon,
  PaymentMethodDetails,
  PaymentMethodNumber,
  PaymentMethodExpiry,
  PaymentMethodBadge,
  PaymentMethodActions,
  PaymentMethodAction,
  PlanCard,
  PlanCardHeader,
  PlanCardBadge,
  PlanCardTitle,
  PlanCardDescription,
  PlanCardPrice,
  PlanCardFeatures,
  PlanCardFeature,
  PlanCardAction,
  PlanGroup,
  PlanGroupHeader,
  PlanGroupTitle,
  PlanGroupDescription,
  PlanGroupToggle,
  PlanGroupContent,
  PlanPrice,
} from "@/components/billing";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-linear-to-b from-primary/5 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          billui components
        </h1>

        {/* Description */}
        <p className="max-w-2xl mt-6 text-lg text-muted-foreground">
          A collection of beautifully designed billui components. Payment
          methods, invoices, pricing cards, and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/components/payment-method"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border bg-background hover:bg-accent transition-colors"
          >
            View Components
          </Link>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="flex-1 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-min">
            {/* Payment Methods - spans 4 cols */}
            <div className="lg:col-span-4 p-6 rounded-2xl border bg-card/50 backdrop-blur">
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Payment Methods
                </span>
              </div>
              <div className="space-y-3">
                <PaymentMethod variant="selected">
                  <PaymentMethodIcon brand="visa" />
                  <PaymentMethodDetails>
                    <PaymentMethodNumber last4="4242" />
                    <PaymentMethodExpiry month={12} year={2026} />
                  </PaymentMethodDetails>
                  <PaymentMethodBadge>Default</PaymentMethodBadge>
                </PaymentMethod>

                <PaymentMethod>
                  <PaymentMethodIcon brand="mastercard" />
                  <PaymentMethodDetails>
                    <PaymentMethodNumber last4="5555" />
                    <PaymentMethodExpiry month={8} year={2025} />
                  </PaymentMethodDetails>
                  <PaymentMethodActions>
                    <PaymentMethodAction action="edit" />
                    <PaymentMethodAction action="delete" />
                  </PaymentMethodActions>
                </PaymentMethod>

                <PaymentMethod>
                  <PaymentMethodIcon brand="amex" />
                  <PaymentMethodDetails>
                    <PaymentMethodNumber last4="0001" />
                    <PaymentMethodExpiry month={1} year={2023} expired />
                  </PaymentMethodDetails>
                </PaymentMethod>
              </div>
            </div>

            {/* Invoices - spans 4 cols */}
            <div className="lg:col-span-4 p-6 rounded-2xl border bg-card/50 backdrop-blur">
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Invoice History
                </span>
              </div>
              <div className="space-y-3">
                <InvoiceCard>
                  <InvoiceCardIcon />
                  <InvoiceCardContent>
                    <InvoiceCardHeader>
                      <InvoiceCardNumber>INV-2024-001</InvoiceCardNumber>
                      <InvoiceCardStatus status="paid" />
                    </InvoiceCardHeader>
                    <InvoiceCardDate date="2024-01-15" />
                  </InvoiceCardContent>
                  <InvoiceCardAmount amount={29} />
                  <InvoiceCardActions>
                    <InvoiceCardAction action="download" />
                  </InvoiceCardActions>
                </InvoiceCard>

                <InvoiceCard>
                  <InvoiceCardIcon />
                  <InvoiceCardContent>
                    <InvoiceCardHeader>
                      <InvoiceCardNumber>INV-2024-002</InvoiceCardNumber>
                      <InvoiceCardStatus status="pending" />
                    </InvoiceCardHeader>
                    <InvoiceCardDate date="2024-02-15" />
                  </InvoiceCardContent>
                  <InvoiceCardAmount amount={49} />
                  <InvoiceCardActions>
                    <InvoiceCardAction action="view" />
                  </InvoiceCardActions>
                </InvoiceCard>

                <InvoiceCard>
                  <InvoiceCardIcon />
                  <InvoiceCardContent>
                    <InvoiceCardHeader>
                      <InvoiceCardNumber>INV-2024-003</InvoiceCardNumber>
                      <InvoiceCardStatus status="failed" />
                    </InvoiceCardHeader>
                    <InvoiceCardDate date="2024-03-15" />
                  </InvoiceCardContent>
                  <InvoiceCardAmount amount={99} />
                </InvoiceCard>
              </div>
            </div>

            {/* Single Plan Card - spans 4 cols */}
            <div className="lg:col-span-4 p-6 rounded-2xl border bg-card/50 backdrop-blur">
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan Card
                </span>
              </div>
              <PlanCard variant="highlighted">
                <PlanCardHeader>
                  <PlanCardBadge>Most Popular</PlanCardBadge>
                  <PlanCardTitle>Pro</PlanCardTitle>
                  <PlanCardDescription>For growing teams</PlanCardDescription>
                </PlanCardHeader>
                <PlanCardPrice amount={29} originalAmount={49} period="month" />
                <PlanCardFeatures>
                  <PlanCardFeature included>Unlimited projects</PlanCardFeature>
                  <PlanCardFeature included>Advanced analytics</PlanCardFeature>
                  <PlanCardFeature included>Priority support</PlanCardFeature>
                  <PlanCardFeature included={false}>
                    Custom integrations
                  </PlanCardFeature>
                </PlanCardFeatures>
                <PlanCardAction>Get Started</PlanCardAction>
              </PlanCard>
            </div>

            {/* Plan Group with Toggle - spans full width */}
            <div className="lg:col-span-12 p-6 rounded-2xl border bg-card/50 backdrop-blur">
              <PlanGroup>
                <PlanGroupHeader>
                  <PlanGroupTitle>Simple, transparent pricing</PlanGroupTitle>
                  <PlanGroupDescription>
                    Choose the plan that works best for you. All plans include a
                    14-day free trial.
                  </PlanGroupDescription>
                  <PlanGroupToggle yearDiscount="Save 20%" />
                </PlanGroupHeader>
                <PlanGroupContent columns={3}>
                  <PlanCard>
                    <PlanCardHeader>
                      <PlanCardTitle>Free</PlanCardTitle>
                      <PlanCardDescription>For individuals</PlanCardDescription>
                    </PlanCardHeader>
                    <PlanPrice monthlyAmount={0} yearlyAmount={0} />
                    <PlanCardFeatures>
                      <PlanCardFeature included>
                        Up to 3 projects
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Basic analytics
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Community support
                      </PlanCardFeature>
                      <PlanCardFeature included={false}>
                        Custom integrations
                      </PlanCardFeature>
                      <PlanCardFeature included={false}>
                        Priority support
                      </PlanCardFeature>
                    </PlanCardFeatures>
                    <PlanCardAction variant="outline">
                      Get Started
                    </PlanCardAction>
                  </PlanCard>

                  <PlanCard variant="highlighted">
                    <PlanCardHeader>
                      <div className="flex items-center justify-between">
                        <PlanCardTitle>Pro</PlanCardTitle>
                        <PlanCardBadge>Popular</PlanCardBadge>
                      </div>
                      <PlanCardDescription>
                        For growing teams
                      </PlanCardDescription>
                    </PlanCardHeader>
                    <PlanPrice
                      monthlyAmount={29}
                      yearlyAmount={278}
                      originalMonthlyAmount={49}
                      originalYearlyAmount={470}
                    />
                    <PlanCardFeatures>
                      <PlanCardFeature included>
                        Unlimited projects
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Advanced analytics
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Priority support
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Custom integrations
                      </PlanCardFeature>
                      <PlanCardFeature included={false}>
                        Dedicated manager
                      </PlanCardFeature>
                    </PlanCardFeatures>
                    <PlanCardAction>Get Started</PlanCardAction>
                  </PlanCard>

                  <PlanCard>
                    <PlanCardHeader>
                      <PlanCardTitle>Enterprise</PlanCardTitle>
                      <PlanCardDescription>
                        For large organizations
                      </PlanCardDescription>
                    </PlanCardHeader>
                    <PlanPrice monthlyAmount={99} yearlyAmount={948} />
                    <PlanCardFeatures>
                      <PlanCardFeature included>
                        Everything in Pro
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Unlimited team members
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Advanced security
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Custom contracts
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Dedicated manager
                      </PlanCardFeature>
                    </PlanCardFeatures>
                    <PlanCardAction variant="outline">
                      Contact Sales
                    </PlanCardAction>
                  </PlanCard>
                </PlanGroupContent>
              </PlanGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
