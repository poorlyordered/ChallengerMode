import React from 'react';
import { Shield, Users, Trophy, Calendar } from 'lucide-react';
import type { Space } from '../../types/api';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
  iconColor: string;
}

function MetricCard({ icon, label, value, bgColor, iconColor }: MetricCardProps) {
  return (
    <div className={`flex items-center p-4 ${bgColor} rounded-lg`}>
      <div className={`w-8 h-8 ${iconColor} mr-3`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
    </div>
  );
}

interface SpaceMetricsProps {
  space: Space;
}

export function SpaceMetrics({ space }: SpaceMetricsProps) {
  const activeTournaments = space.stats?.activeTournaments || 0;
  const totalTournaments = space.stats?.totalTournaments || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Users />}
        label="Members"
        value={space.memberCount}
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <MetricCard
        icon={<Trophy />}
        label="Active Tournaments"
        value={activeTournaments}
        bgColor="bg-green-50"
        iconColor="text-green-600"
      />
      <MetricCard
        icon={<Shield />}
        label="Total Tournaments"
        value={totalTournaments}
        bgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
      <MetricCard
        icon={<Calendar />}
        label="Last Updated"
        value={new Date(space.updatedAt).toLocaleDateString()}
        bgColor="bg-orange-50"
        iconColor="text-orange-600"
      />
    </div>
  );
}