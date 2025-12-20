import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import {
  InvoiceCard,
  InvoiceCardAction,
  InvoiceCardActions,
  InvoiceCardAmount,
  InvoiceCardContent,
  InvoiceCardDate,
  InvoiceCardHeader,
  InvoiceCardIcon,
  InvoiceCardNumber,
  InvoiceCardStatus,
  PaymentMethod,
  PaymentMethodAction,
  PaymentMethodActions,
  PaymentMethodBadge,
  PaymentMethodDetails,
  PaymentMethodExpiry,
  PaymentMethodIcon,
  PaymentMethodNumber,
  PlanCard,
  PlanCardAction,
  PlanCardBadge,
  PlanCardDescription,
  PlanCardFeature,
  PlanCardFeatures,
  PlanCardHeader,
  PlanCardPrice,
  PlanCardTitle,
  PlanGroup,
  PlanGroupContent,
  PlanGroupDescription,
  PlanGroupHeader,
  PlanGroupTitle,
  PlanGroupToggle,
  PlanPrice,
} from "@/registry/ui";

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
          Billing components
        </h1>

        {/* Description */}
        <p className="max-w-2xl mt-6 text-lg text-muted-foreground">
          A collection of beautifully designed billing components. Payment
          methods, invoices, pricing cards, and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/docs/components"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse Components
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/commet-labs/billui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border bg-background hover:bg-accent transition-colors"
          >
            Give Star <Star className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="flex-1 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Unified Grid Panel */}
          <div className="rounded-xl border bg-card/50 backdrop-blur overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Payment Methods */}
              <div className="p-6 border-b lg:border-r border-border/50">
                <div className="mb-4">
                  <Link
                    href="/docs/components/payment-method"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider hover:underline"
                  >
                    Payment Methods
                  </Link>
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

                  <PaymentMethod>
                    <PaymentMethodIcon brand="visa" />
                    <PaymentMethodDetails>
                      <PaymentMethodNumber last4="7890" />
                      <PaymentMethodExpiry month={11} year={2025} />
                    </PaymentMethodDetails>
                    <PaymentMethodAction action="delete" />
                  </PaymentMethod>
                </div>
              </div>

              {/* Plan Cards */}
              <div className="p-6 border-b border-border/50 lg:col-span-2">
                <div className="mb-4">
                  <Link
                    href="/docs/components/plan-card"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider hover:underline"
                  >
                    Plan Cards
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PlanCard>
                    <PlanCardHeader>
                      <PlanCardTitle>Free</PlanCardTitle>
                      <PlanCardDescription>For individuals</PlanCardDescription>
                    </PlanCardHeader>
                    <PlanCardPrice amount={0} period="month" />
                    <PlanCardFeatures>
                      <PlanCardFeature included>
                        Up to 3 projects
                      </PlanCardFeature>
                      <PlanCardFeature included>
                        Basic analytics
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
                        <PlanCardBadge>Most Popular</PlanCardBadge>
                      </div>
                      <PlanCardDescription>
                        For growing teams
                      </PlanCardDescription>
                    </PlanCardHeader>
                    <PlanCardPrice
                      amount={29}
                      originalAmount={49}
                      period="month"
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
                    </PlanCardFeatures>
                    <PlanCardAction>Get Started</PlanCardAction>
                  </PlanCard>
                </div>
              </div>

              {/* Invoice History - full width with 2 columns */}
              <div className="p-6 border-b border-border/50 lg:col-span-3">
                <div className="mb-4">
                  <Link
                    href="/docs/components/invoice-card"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider hover:underline"
                  >
                    Invoice History
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                  <InvoiceCard>
                    <InvoiceCardIcon />
                    <InvoiceCardContent>
                      <InvoiceCardHeader>
                        <InvoiceCardNumber>INV-2024-004</InvoiceCardNumber>
                        <InvoiceCardStatus status="paid" />
                      </InvoiceCardHeader>
                      <InvoiceCardDate date="2024-04-15" />
                    </InvoiceCardContent>
                    <InvoiceCardAmount amount={29} />
                    <InvoiceCardActions>
                      <InvoiceCardAction action="download" />
                    </InvoiceCardActions>
                  </InvoiceCard>
                </div>
              </div>

              {/* Plan Group with Toggle - spans full width */}
              <div className="p-6 lg:col-span-3">
                <div className="mb-4">
                  <Link
                    href="/docs/components/plan-group"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wider hover:underline"
                  >
                    Plan Group
                  </Link>
                </div>
                <PlanGroup>
                  <PlanGroupHeader>
                    <PlanGroupTitle>Simple, transparent pricing</PlanGroupTitle>
                    <PlanGroupDescription>
                      Choose the plan that works best for you. All plans include
                      a 14-day free trial.
                    </PlanGroupDescription>
                    <PlanGroupToggle yearDiscount="Save 20%" />
                  </PlanGroupHeader>
                  <PlanGroupContent columns={3}>
                    <PlanCard>
                      <PlanCardHeader>
                        <PlanCardTitle>Free</PlanCardTitle>
                        <PlanCardDescription>
                          For individuals
                        </PlanCardDescription>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          Built with {"<3"}. The source code is available on{" "}
          <a
            href="https://github.com/commet-labs/billui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
