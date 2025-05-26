// hooks/useShippingCalculator.js
import { useMemo } from "react";

export function useShippingCalculator() {
  // Fast Delivery Strategy
  const calculateFastDelivery = (items, totalFoodPrice) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity > 6 ? totalFoodPrice * 0.2 : totalFoodPrice * 0.15;
  };

  // Economy Delivery Strategy
  const calculateEconomyDelivery = (items, totalFoodPrice) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity > 6 ? totalFoodPrice * 0.1 : totalFoodPrice * 0.05;
  };

  // Pickup Strategy
  const calculatePickup = () => {
    return 0; // Không tính phí
  };

  // Strategy selector function
  const calculateShippingCost = (items, totalFoodPrice, shippingMethod) => {
    switch (shippingMethod) {
      case "Fast Delivery":
        return calculateFastDelivery(items, totalFoodPrice);
      case "Economy Delivery":
        return calculateEconomyDelivery(items, totalFoodPrice);
      case "Pick up":
        return calculatePickup();
      default:
        return calculateEconomyDelivery(items, totalFoodPrice);
    }
  };

  return { calculateShippingCost };
}
