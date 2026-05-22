import React from "react";
import { FiCreditCard, FiCheckCircle, FiZap } from "react-icons/fi";

const PlanPage = () => {
  const currentPlan = "Pro";

  const plans = [
    {
      name: "Free",
      price: "₹0",
      features: [
        "1 Team Member",
        "100 WhatsApp Messages/month",
        "Basic Template Builder",
      ],
    },
    {
      name: "Pro",
      price: "₹999/month",
      features: [
        "Up to 5 Team Members",
        "10,000 Messages/month",
        "Custom Domains",
        "Media Templates",
      ],
    },
    {
      name: "Agency",
      price: "₹2999/month",
      features: [
        "Unlimited Team Members",
        "Unlimited Messages",
        "Priority Support",
        "Multiple WABA integrations",
      ],
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiCreditCard className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Subscription Plan</h2>
      </div>

      {/* Current Plan */}
      <div className="mb-10 p-4 border border-indigo-100 bg-indigo-50 rounded-xl">
        <h3 className="font-semibold text-indigo-700">You're on the <strong>{currentPlan}</strong> plan</h3>
        <p className="text-sm text-gray-600 mt-1">Billed monthly. Next billing on July 15, 2025</p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 border shadow-md hover:shadow-xl transition-all duration-300 ${
              currentPlan === plan.name
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
              {currentPlan === plan.name && (
                <span className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">Current</span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            {currentPlan !== plan.name && (
              <button className="mt-6 w-full py-2 text-sm font-semibold bg-gradient-to-r from-gray-900 to-black text-white rounded-lg hover:from-gray-800 hover:to-gray-900">
                <FiZap className="inline mr-2" />
                Upgrade to {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanPage;
