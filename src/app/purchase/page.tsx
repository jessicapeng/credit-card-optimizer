"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sampleCards, type CardCategory } from "../sampleCardData";

const categories = [
  "Groceries",
  "Dining",
  "Flight",
  "Electronics",
  "Gas",
  "Other",
  "Travel",
  "Online Shopping",
  "Drugstores",
  "Streaming",
  "Entertainment",
];

export default function PurchasePage() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [rewardPreferences, setRewardPreferences] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load user preferences from localStorage
    const savedCards = localStorage.getItem('selectedCards');
    const savedPrefs = localStorage.getItem('rewardPreferences');
    
    if (savedCards) {
      setSelectedCards(JSON.parse(savedCards));
    }
    if (savedPrefs) {
      setRewardPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount || selectedCards.length === 0) {
      alert("Please fill in all fields and complete onboarding first.");
      return;
    }

    // Calculate best card recommendation with reasoning
    const recommendation = calculateBestCard(category as CardCategory, parseFloat(amount));
    
    // Save recommendation to localStorage for history
    const historyEntry = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      card: recommendation.name,
      date: new Date().toISOString().split('T')[0],
      rewardRate: recommendation.rewardRate,
      estimatedRewards: recommendation.estimatedRewards,
      reasoning: recommendation.reasoning
    };

    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    history.unshift(historyEntry);
    localStorage.setItem('purchaseHistory', JSON.stringify(history));

    // Navigate to result page with recommendation data
    const params = new URLSearchParams({
      category,
      amount,
      card: recommendation.name,
      rewardRate: recommendation.rewardRate.toString(),
      estimatedRewards: recommendation.estimatedRewards.toString(),
      reasoning: encodeURIComponent(recommendation.reasoning)
    });
    
    router.push(`/result?${params.toString()}`);
  };

  const calculateBestCard = (category: CardCategory, amount: number) => {
    let bestCard = null;
    let bestRewardRate = 0;
    let bestEstimatedRewards = 0;
    let reasoning = "";
    const cardComparisons = [];

    // Filter cards that user has selected
    const userCards = sampleCards.filter(card => selectedCards.includes(card.id));

    // First pass: check for category-specific rewards
    for (const card of userCards) {
      const categoryReward = card.rewards[category];
      if (categoryReward) {
        const rewardRate = categoryReward.multiplier;
        const estimatedRewards = (amount * rewardRate) / 100; // Assuming 1% base rate

        // Prioritize based on user preferences
        let preferenceBonus = 1;
        let preferenceReason = "";
        if (rewardPreferences.includes(categoryReward.type)) {
          preferenceBonus = 1.2; // 20% bonus for preferred reward type
          preferenceReason = ` (20% bonus for ${categoryReward.type} preference)`;
        }

        const adjustedRewards = estimatedRewards * preferenceBonus;

        cardComparisons.push({
          name: card.name,
          rewardRate,
          estimatedRewards: adjustedRewards,
          type: categoryReward.type,
          hasCategoryBonus: true,
          preferenceBonus: preferenceReason
        });

        if (adjustedRewards > bestEstimatedRewards) {
          bestCard = card;
          bestRewardRate = rewardRate;
          bestEstimatedRewards = adjustedRewards;
        }
      }
    }

    // Second pass: check for general rewards if no category-specific card found
    if (!bestCard) {
      for (const card of userCards) {
        const generalReward = card.rewards["Other"];
        if (generalReward) {
          const rewardRate = generalReward.multiplier;
          const estimatedRewards = (amount * rewardRate) / 100;

          let preferenceBonus = 1;
          let preferenceReason = "";
          if (rewardPreferences.includes(generalReward.type)) {
            preferenceBonus = 1.2;
            preferenceReason = ` (20% bonus for ${generalReward.type} preference)`;
          }

          const adjustedRewards = estimatedRewards * preferenceBonus;

          cardComparisons.push({
            name: card.name,
            rewardRate,
            estimatedRewards: adjustedRewards,
            type: generalReward.type,
            hasCategoryBonus: false,
            preferenceBonus: preferenceReason
          });

          if (adjustedRewards > bestEstimatedRewards) {
            bestCard = card;
            bestRewardRate = rewardRate;
            bestEstimatedRewards = adjustedRewards;
          }
        }
      }
    }

    // Generate reasoning
    if (bestCard) {
      const bestCardComparison = cardComparisons.find(c => c.name === bestCard.name);
      const otherCards = cardComparisons.filter(c => c.name !== bestCard.name);
      
      reasoning = `Selected ${bestCard.name} because it offers ${bestRewardRate}x rewards for ${category} purchases`;
      
      if (bestCardComparison?.preferenceBonus) {
        reasoning += bestCardComparison.preferenceBonus;
      }
      
      reasoning += `, earning you $${bestEstimatedRewards.toFixed(2)} in rewards.`;
      
      if (otherCards.length > 0) {
        const nextBest = otherCards.sort((a, b) => b.estimatedRewards - a.estimatedRewards)[0];
        reasoning += ` This beats ${nextBest.name} (${nextBest.rewardRate}x${nextBest.preferenceBonus}) which would earn $${nextBest.estimatedRewards.toFixed(2)}.`;
      }
    } else {
      reasoning = "No suitable card found for this purchase category.";
    }

    return {
      name: bestCard?.name || "No suitable card found",
      rewardRate: bestRewardRate,
      estimatedRewards: bestEstimatedRewards,
      reasoning
    };
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Purchase</h2>
            <p className="text-gray-600">Enter your purchase details to get the best card recommendation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/" className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
                Back
              </Link>
              <button 
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!category || !amount}
              >
                Get Recommendation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 