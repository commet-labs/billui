import { ArrowRight, CreditCard, Receipt, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import {
  BillingAddress,
  BillingAddressCountry,
  BillingAddressInput,
  CardCvcInput,
  CardExpiryInput,
  CardInputGroup,
  CardNumberInput,
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
  PricingTable,
  PricingTableAction,
  PricingTableBody,
  PricingTableCell,
  PricingTableFeatureCell,
  PricingTableHeader,
  PricingTablePlan,
  PricingTablePlanDescription,
  PricingTablePlanName,
  PricingTablePrice,
  PricingTableRow,
  PricingTableSpacer,
  UsageCard,
  UsageCardHeader,
  UsageCardItem,
  UsageCardItemLabel,
  UsageCardItemValue,
  UsageCardLabel,
  UsageCardLabels,
  UsageCardList,
  UsageCardMeter,
  UsageCardPeriod,
  UsageCardProgress,
  UsageCardSummary,
  UsageCardTotal,
} from "@/registry/ui";
import {
  AnimatedFadeUp,
  AnimatedHero,
  AnimatedSection,
  AnimatedSectionScale,
  AnimatedStaggerSection,
  AnimatedStats,
} from "./animated";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-24 text-center">
        {/* Gradient orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-linear-to-b from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-linear-to-br from-violet-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-[5%] right-[15%] w-[300px] h-[300px] bg-linear-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <AnimatedHero className="flex flex-col items-center">
          {/* Title */}
          <AnimatedFadeUp>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Build billing pages
              <br />
              <span className="text-primary">in minutes</span>
            </h1>
          </AnimatedFadeUp>

          {/* Description */}
          <AnimatedFadeUp>
            <p className="max-w-xl mt-8 text-lg text-muted-foreground leading-relaxed">
              Drop-in React components for payment forms, pricing tables,
              invoices, and usage tracking. Copy, paste, ship.
            </p>
          </AnimatedFadeUp>

          {/* CTA Buttons */}
          <AnimatedFadeUp className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              href="/docs/components"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:gap-3"
            >
              Browse Components
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/commet-labs/billui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>
          </AnimatedFadeUp>
        </AnimatedHero>
      </section>

      {/* Hero Component - THE star of the show */}
      <section className="px-4 pb-32">
        <AnimatedSectionScale className="max-w-lg mx-auto">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 via-violet-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />

            {/* Card */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Payment details</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your card information below
                  </p>
                </div>

                <div className="space-y-4">
                  <CardInputGroup>
                    <CardNumberInput defaultValue="4242 4242 4242 4242" />
                    <CardExpiryInput defaultValue="12/28" />
                    <CardCvcInput defaultValue="123" />
                  </CardInputGroup>

                  <BillingAddress defaultCountry="US" className="gap-3">
                    <BillingAddressInput
                      field="name"
                      placeholder="Cardholder name…"
                      defaultValue="Jane Cooper"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <BillingAddressInput
                        field="postalCode"
                        placeholder="ZIP…"
                        defaultValue="94102"
                      />
                      <BillingAddressCountry />
                    </div>
                  </BillingAddress>
                </div>

                <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Pay $29.00
                </button>
              </div>
            </div>
          </div>
        </AnimatedSectionScale>
      </section>

      {/* Social proof / stats */}
      <section className="px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <AnimatedStats
            stats={[
              { value: "10+", label: "Components" },
              { value: "100%", label: "TypeScript" },
              { value: "A11y", label: "Accessible" },
              { value: "MIT", label: "Licensed" },
            ]}
          />
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <AnimatedStaggerSection className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedFadeUp className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <CreditCard className="w-4 h-4" />
                Payment Methods
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Cards that look
                <br />
                like they belong
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beautiful payment method cards with brand detection, expiry
                warnings, and action buttons. Works with Stripe, Braintree, or
                any payment processor.
              </p>
              <Link
                href="/docs/components/payment-method"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedFadeUp>

            <AnimatedFadeUp className="space-y-3">
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
              </PaymentMethod>

              <PaymentMethod>
                <PaymentMethodIcon brand="amex" />
                <PaymentMethodDetails>
                  <PaymentMethodNumber last4="0001" />
                  <PaymentMethodExpiry month={1} year={2023} expired />
                </PaymentMethodDetails>
              </PaymentMethod>
            </AnimatedFadeUp>
          </AnimatedStaggerSection>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <AnimatedStaggerSection className="text-center mb-16">
            <AnimatedFadeUp className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Pricing Components
            </AnimatedFadeUp>
            <AnimatedFadeUp>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Pricing that converts
              </h2>
            </AnimatedFadeUp>
            <AnimatedFadeUp>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plan cards, comparison tables, and billing period toggles.
                Everything you need for a high-converting pricing page.
              </p>
            </AnimatedFadeUp>
          </AnimatedStaggerSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            <PlanCard>
              <PlanCardHeader>
                <PlanCardTitle>Starter</PlanCardTitle>
                <PlanCardDescription>For side projects</PlanCardDescription>
              </PlanCardHeader>
              <PlanCardPrice amount={0} period="month" />
              <PlanCardFeatures>
                <PlanCardFeature included>Up to 3 projects</PlanCardFeature>
                <PlanCardFeature included>Basic analytics</PlanCardFeature>
                <PlanCardFeature included={false}>
                  Priority support
                </PlanCardFeature>
                <PlanCardFeature included={false}>
                  Custom domain
                </PlanCardFeature>
              </PlanCardFeatures>
              <PlanCardAction variant="outline">Get Started</PlanCardAction>
            </PlanCard>

            <PlanCard variant="highlighted">
              <PlanCardHeader>
                <div className="flex items-center justify-between">
                  <PlanCardTitle>Pro</PlanCardTitle>
                  <PlanCardBadge>Popular</PlanCardBadge>
                </div>
                <PlanCardDescription>For growing teams</PlanCardDescription>
              </PlanCardHeader>
              <PlanCardPrice amount={29} originalAmount={49} period="month" />
              <PlanCardFeatures>
                <PlanCardFeature included>Unlimited projects</PlanCardFeature>
                <PlanCardFeature included>Advanced analytics</PlanCardFeature>
                <PlanCardFeature included>Priority support</PlanCardFeature>
                <PlanCardFeature included>Custom domain</PlanCardFeature>
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
              <PlanCardPrice amount={99} period="month" />
              <PlanCardFeatures>
                <PlanCardFeature included>Everything in Pro</PlanCardFeature>
                <PlanCardFeature included>SSO & SAML</PlanCardFeature>
                <PlanCardFeature included>Dedicated support</PlanCardFeature>
                <PlanCardFeature included>SLA guarantee</PlanCardFeature>
              </PlanCardFeatures>
              <PlanCardAction variant="outline">Contact Sales</PlanCardAction>
            </PlanCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Usage & Invoices Section */}
      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <AnimatedStaggerSection className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Usage */}
            <AnimatedFadeUp className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                Usage Tracking
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Show customers
                <br />
                exactly where they stand
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Usage cards with progress bars, meters, and breakdowns. Perfect
                for usage-based billing dashboards.
              </p>

              <UsageCard className="mt-8">
                <UsageCardHeader>
                  <UsageCardPeriod daysRemaining={12} />
                </UsageCardHeader>
                <UsageCardSummary>
                  <UsageCardLabels>
                    <UsageCardLabel label="Current usage" amount={156.42} />
                    <UsageCardLabel
                      label="Usage limit"
                      amount={200}
                      align="right"
                    />
                  </UsageCardLabels>
                  <UsageCardProgress value={156.42} max={200} />
                </UsageCardSummary>
                <UsageCardList>
                  <UsageCardItem>
                    <UsageCardItemLabel>API Calls</UsageCardItemLabel>
                    <UsageCardItemValue amount={89.5} />
                  </UsageCardItem>
                  <UsageCardItem>
                    <UsageCardItemLabel>Storage</UsageCardItemLabel>
                    <UsageCardItemValue amount={42.0} />
                  </UsageCardItem>
                  <UsageCardItem>
                    <UsageCardItemLabel>Bandwidth</UsageCardItemLabel>
                    <UsageCardItemValue amount={24.92} />
                  </UsageCardItem>
                </UsageCardList>
                <UsageCardTotal amount={156.42} />
              </UsageCard>
            </AnimatedFadeUp>

            {/* Invoices */}
            <AnimatedFadeUp className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                <Receipt className="w-4 h-4" />
                Invoice History
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Invoices that
                <br />
                tell the whole story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Clean invoice cards with status indicators, amounts, and quick
                actions. Download, view, or pay with one click.
              </p>

              <div className="space-y-3 mt-8">
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
            </AnimatedFadeUp>
          </AnimatedStaggerSection>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatedStaggerSection className="text-center mb-16">
            <AnimatedFadeUp>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Compare every feature
              </h2>
            </AnimatedFadeUp>
            <AnimatedFadeUp>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full-featured comparison tables with checkmarks, partial
                indicators, and highlighted columns.
              </p>
            </AnimatedFadeUp>
          </AnimatedStaggerSection>

          <AnimatedSection>
            <PricingTable>
              <PricingTableHeader columns={4}>
                <PricingTableSpacer />
                <PricingTablePlan>
                  <PricingTablePlanName>Starter</PricingTablePlanName>
                  <PricingTablePrice amount={0} />
                  <PricingTablePlanDescription>
                    For side projects
                  </PricingTablePlanDescription>
                </PricingTablePlan>
                <PricingTablePlan highlighted>
                  <PricingTablePlanName>Pro</PricingTablePlanName>
                  <PricingTablePrice amount={29} />
                  <PricingTablePlanDescription>
                    For growing teams
                  </PricingTablePlanDescription>
                  <PricingTableAction>Get Started</PricingTableAction>
                </PricingTablePlan>
                <PricingTablePlan>
                  <PricingTablePlanName>Enterprise</PricingTablePlanName>
                  <PricingTablePrice amount={99} />
                  <PricingTablePlanDescription>
                    For large orgs
                  </PricingTablePlanDescription>
                  <PricingTableAction variant="outline">
                    Contact
                  </PricingTableAction>
                </PricingTablePlan>
              </PricingTableHeader>
              <PricingTableBody>
                <PricingTableRow columns={4}>
                  <PricingTableFeatureCell>Projects</PricingTableFeatureCell>
                  <PricingTableCell value="3" />
                  <PricingTableCell value="Unlimited" highlighted />
                  <PricingTableCell value="Unlimited" />
                </PricingTableRow>
                <PricingTableRow columns={4}>
                  <PricingTableFeatureCell>
                    Team members
                  </PricingTableFeatureCell>
                  <PricingTableCell value="1" />
                  <PricingTableCell value="10" highlighted />
                  <PricingTableCell value="Unlimited" />
                </PricingTableRow>
                <PricingTableRow columns={4}>
                  <PricingTableFeatureCell>
                    API requests
                  </PricingTableFeatureCell>
                  <PricingTableCell value="1K/mo" />
                  <PricingTableCell value="100K/mo" highlighted />
                  <PricingTableCell value="Unlimited" />
                </PricingTableRow>
                <PricingTableRow columns={4}>
                  <PricingTableFeatureCell>
                    Priority support
                  </PricingTableFeatureCell>
                  <PricingTableCell value={false} />
                  <PricingTableCell value={true} highlighted />
                  <PricingTableCell value={true} />
                </PricingTableRow>
                <PricingTableRow columns={4}>
                  <PricingTableFeatureCell>SSO</PricingTableFeatureCell>
                  <PricingTableCell value={false} />
                  <PricingTableCell value="partial" highlighted />
                  <PricingTableCell value={true} />
                </PricingTableRow>
              </PricingTableBody>
            </PricingTable>
          </AnimatedSection>
        </div>
      </section>

      {/* Usage Meters Section */}
      <section className="px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <AnimatedStaggerSection className="text-center mb-16">
            <AnimatedFadeUp>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Resource meters that pop
              </h2>
            </AnimatedFadeUp>
            <AnimatedFadeUp>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Color-coded progress bars that turn amber at 80% and red at 95%.
                Your users will never be surprised by overages.
              </p>
            </AnimatedFadeUp>
          </AnimatedStaggerSection>

          <AnimatedSection>
            <UsageCard>
              <UsageCardMeter
                label="API Requests"
                used={8420}
                limit={10000}
                unit="requests"
                showPercentage
              />
              <UsageCardMeter
                label="Storage"
                used={4.2}
                limit={5}
                unit="GB"
                showPercentage
              />
              <UsageCardMeter
                label="Team Members"
                used={9}
                limit={10}
                unit="seats"
                showPercentage
              />
            </UsageCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          Built by{" "}
          <a
            href="https://x.com/0xDecker"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline underline-offset-4"
          >
            0xDecker
          </a>
          . Open source on{" "}
          <a
            href="https://github.com/commet-labs/billui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
