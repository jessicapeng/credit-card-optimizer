"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ResultContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const amount = searchParams.get('amount');
  const card = searchParams.get('card');
  const rewardRate = searchParams.get('rewardRate');
  const estimatedRewards = searchParams.get('estimatedRewards');
  const reasoning = searchParams.get('reasoning');

  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommendation Ready!</h2>
            <p className="text-gray-600">Here's the best card for your purchase</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Use Your</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">{card}</div>
              <div className="text-lg text-blue-800">
                for this {category?.toLowerCase()} purchase
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{rewardRate}x</div>
              <div className="text-gray-600">Reward Rate</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">${parseFloat(estimatedRewards || '0').toFixed(2)}</div>
              <div className="text-gray-600">Estimated Rewards</div>
            </div>
          </div>

          {/* Reasoning Section */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-8 border-l-4 border-yellow-400">
            <div className="flex items-start">
              <div className="text-2xl mr-3 mt-1">💡</div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Why This Card?</h4>
                <p className="text-yellow-800 leading-relaxed">
                  {decodeURIComponent(reasoning || '')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="text-2xl mr-3">💰</div>
              <div>
                <div className="font-semibold text-green-900">Purchase Details</div>
                <div className="text-green-700">
                  {category} - ${parseFloat(amount || '0').toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/purchase" className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
              New Purchase
            </Link>
            <Link href="/history" className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-center">
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
} 