"use client";

import { CheckCircle2 } from "lucide-react";
import { OrderStatus, statusSteps, getStatusIndex } from "@/lib/mock/orders";
import { formatDate } from "@/lib/utils";

interface OrderStatusStepperProps {
  status: OrderStatus;
  createdAt: string;
  deliveryMode?: "delivery" | "self_pickup";
}

export default function OrderStatusStepper({ status, createdAt, deliveryMode }: OrderStatusStepperProps) {
  const currentIdx = getStatusIndex(status);

  const steps = statusSteps.map((s) => {
    if (s.key === "in_transit" && deliveryMode === "self_pickup") {
      return { ...s, label: "Ready for Pickup" };
    }
    return s;
  });

  return (
    <div className="w-full">
      <div className="flex items-start">
        {steps.map((step, idx) => {
          const done = idx < currentIdx;
          const active = idx === currentIdx;
          const upcoming = idx > currentIdx;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 right-0 h-0.5 z-0 transition-colors duration-500 ${
                    done ? "bg-green-500" : "bg-gray-200"
                  }`}
                  style={{ left: "calc(50% + 16px)", right: 0 }}
                />
              )}

              {/* Circle */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  done
                    ? "bg-green-500 border-green-500"
                    : active
                    ? "bg-white border-green-600 shadow-md shadow-green-100"
                    : "bg-white border-gray-200"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      active ? "bg-green-600 animate-pulse" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-center text-xs font-medium leading-tight px-1 ${
                  done || active ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              {active && (
                <p className="text-xs text-green-600 font-medium mt-0.5">Now</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
