'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({
  placeholder,
  onSearch,
  initialValue = '',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onSearch(newValue);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue('');
    onSearch('');
  }, [onSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-md mx-auto"
    >
      <div
        className={cn(
          'flex items-center gap-3 px-5 py-3 rounded-full border transition-all',
          isFocused
            ? 'border-[#1F5CFF] ring-4 ring-[#1F5CFF]/10 bg-white'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
        )}
      >
        <Search
          className={cn(
            'w-5 h-5 transition-colors',
            isFocused ? 'text-[#1F5CFF]' : 'text-gray-400'
          )}
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
