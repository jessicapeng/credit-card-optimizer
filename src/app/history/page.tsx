"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PurchaseHistory {
  id: number;
  category: string;
  amount: number;
  card: string;
  date: string;
  rewardRate: number;
  estimatedRewards: number;
  reasoning?: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<PurchaseHistory[]>([]);

  useEffect(() => {
    // Load purchase history from localStorage
    const savedHistory = localStorage.getItem('purchaseHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase History</h2>
            <p className="text-gray-600">Track your optimized purchases and rewards earned</p>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No purchases yet</h3>
              <p className="text-gray-600 mb-6">Start making purchases to see your optimization history here!</p>
              <Link href="/purchase" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Make Your First Purchase
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="grid md:grid-cols-4 gap-4 items-center mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{item.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="font-semibold">${item.amount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Card Used</div>
                      <div className="font-medium">{item.card}</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 items-center mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Reward Rate</div>
                      <div className="font-medium">{item.rewardRate}x</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Rewards Earned</div>
                      <div className="font-semibold text-green-600">${item.estimatedRewards.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ROI</div>
                      <div className="font-medium text-green-600">
                        {((item.estimatedRewards / item.amount) * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {item.reasoning && (
                    <div className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-400">
                      <div className="flex items-start">
                        <div className="text-lg mr-2 mt-0.5">💡</div>
                        <div>
                          <div className="text-sm font-medium text-yellow-900 mb-1">Why this card was chosen:</div>
                          <div className="text-sm text-yellow-800">{item.reasoning}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 