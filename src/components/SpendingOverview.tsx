import { Card } from './ui/Card';
import { formatCurrency } from '../utils/formatters';
import { IoTrendingDownOutline, IoWalletOutline, IoTimeOutline } from 'react-icons/io5';
import { format } from 'date-fns';

interface SpendingOverviewProps {
  amount: number;
}

export function SpendingOverview({ amount }: SpendingOverviewProps) {
  const lastMonthAmount = amount * 1.67; // This would normally come from actual data
  const percentageChange = ((lastMonthAmount - amount) / lastMonthAmount) * 100;

  return (
    <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <IoTimeOutline />
            <span>TODAY IS</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">
              {format(new Date(), 'EEE, d MMM')}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm opacity-90">THIS MONTH'S SPEND</p>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-4xl font-bold">{formatCurrency(amount)}</h1>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <IoTrendingDownOutline className="text-emerald-200" />
              <span className="text-sm font-medium">{percentageChange.toFixed(0)}% below last month</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <IoWalletOutline size={24} />
            </div>
            <div>
              <p className="text-sm opacity-90">Spending Wallet</p>
              <p className="font-semibold">{formatCurrency(5831.22)}</p>
            </div>
          </div>
          <button className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
}