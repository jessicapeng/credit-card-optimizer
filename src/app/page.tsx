import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Credit Card <span className="text-blue-600">Optimizer</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Choose the best credit card for every purchase. Maximize your rewards and never miss out on cashback, points, or travel benefits.
        </p>
      </div>
      
      <nav className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/onboarding" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h3>
          <p className="text-gray-600">Set up your cards and preferences</p>
        </Link>
        
        <Link href="/purchase" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
          <div className="text-3xl mb-2">💳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">New Purchase</h3>
          <p className="text-gray-600">Enter purchase details for recommendations</p>
        </Link>
        
        <Link href="/history" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-200">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">History</h3>
          <p className="text-gray-600">View your purchase history</p>
        </Link>
      </nav>
    </div>
  );
}
