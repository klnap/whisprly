'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface HeadingWithBackProps {
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  onBack?: () => void;
  backUrl?: string;
}

const HeadingWithBack = ({
  children,
  className = "",
  headingClassName = "",
  onBack,
  backUrl
}: HeadingWithBackProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className={`mb-6 flex items-center ${className}`}>
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-8 h-8 mr-4 group-hover:-translate-x-1 transition-transform" />
      </button>
      <h1 className={`${headingClassName}`}>{children}</h1>
    </div>
  );
};

export default HeadingWithBack;