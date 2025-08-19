import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface TimeDisplayProps {
  timestamp: string;
  useIST: boolean;
  format?: 'full' | 'date' | 'time' | 'relative';
  className?: string;
}

export function TimeDisplay({ timestamp, useIST, format = 'full', className }: TimeDisplayProps) {
  const convertToIST = (utcDate: string) => {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  const convertToUTC = (utcDate: string) => {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date) + ' UTC';
  };

  const getRelativeTime = (utcDate: string) => {
    const date = new Date(utcDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getDisplayTime = () => {
    if (format === 'relative') {
      return getRelativeTime(timestamp);
    }
    
    const date = new Date(timestamp);
    
    if (format === 'date') {
      return useIST 
        ? date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
        : date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
    }
    
    if (format === 'time') {
      return useIST
        ? date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
        : date.toLocaleTimeString('en-GB', { timeZone: 'UTC' });
    }
    
    return useIST ? convertToIST(timestamp) : convertToUTC(timestamp);
  };

  const getTooltipTime = () => {
    return useIST ? convertToUTC(timestamp) : convertToIST(timestamp);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={className}>{getDisplayTime()}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{useIST ? 'UTC: ' : 'IST: '}{getTooltipTime()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}