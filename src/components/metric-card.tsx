import React from "react";
import { Card, CardBody, Badge } from "@heroui/react";

type MetricCardProps = {
  value: string;
  label: string;
  caption?: string;
  accent?: "primary" | "success" | "warning" | "secondary";
};

export function MetricCard({ value, label, caption, accent = "primary" }: MetricCardProps) {
  return (
    <Card shadow="none" radius="lg" className="elite-card hover:-translate-y-0.5 transition-all duration-200 ease-out">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-5xl font-semibold tracking-tight text-slate-900 [text-shadow:0_0_20px_rgba(37,99,235,0.18)]">{value}</div>
          <Badge color={accent} variant="flat" className="shrink-0">{accent === "primary" ? "ROI" : "Impact"}</Badge>
        </div>
        <div className="mt-2 text-slate-700">{label}</div>
        {caption && <div className="mt-2 text-small text-slate-500">{caption}</div>}
      </CardBody>
    </Card>
  );
}