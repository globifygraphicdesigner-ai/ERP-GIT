import React from 'react';
import { MarketplaceId } from '../../types';

interface MarketplaceBadgeProps {
  marketplace: MarketplaceId;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MarketplaceBadge: React.FC<MarketplaceBadgeProps> = ({
  marketplace,
  showName = true,
  size = 'md',
  className = '',
}) => {
  interface BadgeConfig {
    name: string;
    bgIcon: string;
    badgeBg: string;
    letter: string;
    font: string;
    textColor?: string;
  }

  const configs: Record<MarketplaceId, BadgeConfig> = {
    talabat: {
      name: 'Talabat',
      bgIcon: 'bg-[#FF5A00]',
      badgeBg: 'bg-[#FFF3EB] text-[#C2410C] border-[#FFD9C2]',
      letter: 't',
      font: 'font-bold lowercase',
    },
    snoonu: {
      name: 'Snoonu',
      bgIcon: 'bg-[#EE1C24]',
      badgeBg: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]',
      letter: 'S',
      font: 'font-black uppercase',
    },
    rafeeq: {
      name: 'Rafeeq',
      bgIcon: 'bg-[#5B2C90]',
      badgeBg: 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
      letter: 'R',
      font: 'font-black uppercase',
    },
    keeta: {
      name: 'Keeta',
      bgIcon: 'bg-[#FFD200]',
      badgeBg: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
      letter: 'K',
      textColor: 'text-black',
      font: 'font-black uppercase',
    },
  };

  const config = configs[marketplace];
  if (!config) return null;

  const iconSizes = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`${iconSizes} ${config.bgIcon} ${
          config.textColor || 'text-white'
        } ${config.font} rounded flex items-center justify-center select-none shadow-xs shrink-0`}
      >
        {config.letter}
      </div>
      {showName && (
        <span className="text-sm font-medium text-gray-900 leading-none">
          {config.name}
        </span>
      )}
    </div>
  );
};

export const MarketplacePill: React.FC<{
  marketplace: MarketplaceId;
  className?: string;
}> = ({ marketplace, className = '' }) => {
  const styles: Record<MarketplaceId, string> = {
    talabat: 'bg-orange-50 text-orange-700 border-orange-200',
    snoonu: 'bg-red-50 text-red-700 border-red-200',
    rafeeq: 'bg-purple-50 text-purple-700 border-purple-200',
    keeta: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  const labels: Record<MarketplaceId, string> = {
    talabat: 'Talabat',
    snoonu: 'Snoonu',
    rafeeq: 'Rafeeq',
    keeta: 'Keeta',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[marketplace]} ${className}`}
    >
      {labels[marketplace]}
    </span>
  );
};
