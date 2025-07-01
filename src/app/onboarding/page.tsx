"use client";
import { useState } from "react";
import { sampleCards } from "../sampleCardData";
import Link from "next/link";
import { useRouter } from "next/navigation";

const rewardOptions = ["Points", "Cash Back", "Travel Rewards"];

export default function OnboardingPage() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [rewardPrefs, setRewardPrefs] = useState<string[]>([]);
  const router = useRouter();

  const handleCardChange = (card: string) => {
    setSelectedCards((prev) =>
      prev.includes(card) ? prev.filter((c) => c !== card) : [...prev, card]
    );
  };

  const handleRewardPrefChange = (pref: string) => {
    setRewardPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleContinue = () => {
    // Save to localStorage
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
    localStorage.setItem('rewardPreferences', JSON.stringify(rewardPrefs));
    
    // Navigate to purchase page
    router.push('/purchase');
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Credit Card Optimizer</h2>
            <p className="text-gray-600">Let's set up your profile to get personalized recommendations</p>
          </div>

          <div className="space-y-8">
            {/* Credit Cards Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select your credit cards:</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {sampleCards.map((card: { id: string; name: string }) => (
                  <label key={card.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCards.includes(card.id)}
                      onChange={() => handleCardChange(card.id)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{card.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reward Preferences */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What are your reward preferences? (Select all that apply)</h3>
              <div className="space-y-3">
                {rewardOptions.map((opt) => (
                  <label key={opt} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rewardPrefs.includes(opt)}
                      onChange={() => handleRewardPrefChange(opt)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Link href="/" className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
                Back
              </Link>
              <button 
                onClick={handleContinue}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!selectedCards.length || !rewardPrefs.length}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 