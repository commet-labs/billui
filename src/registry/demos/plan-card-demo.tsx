import {
  PlanCard,
  PlanCardAction,
  PlanCardBadge,
  PlanCardDescription,
  PlanCardFeature,
  PlanCardFeatures,
  PlanCardHeader,
  PlanCardPrice,
  PlanCardTitle,
} from "@/registry/ui/plan-card";

export default function PlanCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
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
          <PlanCardFeature included={false}>Custom integrations</PlanCardFeature>
        </PlanCardFeatures>
        <PlanCardAction>Get Started</PlanCardAction>
      </PlanCard>
    </div>
  );
}

