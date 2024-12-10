import { IconType } from 'react-icons';
import { IoFastFoodOutline, IoCarOutline, IoHomeOutline, IoGameControllerOutline, IoMedkitOutline, IoCartOutline, IoWalletOutline } from 'react-icons/io5';
import { TransactionType } from '../types/finance';

const categoryIcons: Record<string, IconType> = {
  Food: IoFastFoodOutline,
  Transport: IoCarOutline,
  Utilities: IoHomeOutline,
  Entertainment: IoGameControllerOutline,
  Healthcare: IoMedkitOutline,
  Shopping: IoCartOutline,
  Other: IoWalletOutline,
};

interface TransactionIconProps {
  type: TransactionType;
  category: string;
}

export function TransactionIcon({ type, category }: TransactionIconProps) {
  const Icon = categoryIcons[category] || IoWalletOutline;
  
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      type === 'income' ? 'bg-emerald-100 text-emerald-600' :
      type === 'expense' ? 'bg-red-100 text-red-600' :
      type === 'debt' ? 'bg-orange-100 text-orange-600' :
      'bg-blue-100 text-blue-600'
    }`}>
      <Icon size={20} />
    </div>
  );
}