// This file contains global type declarations
import 'next';
import 'next/link';
import 'next/navigation';
import React from 'react';

// Add any other missing module declarations here
declare module 'next/link';
declare module 'next/navigation';
declare module 'next';

// Add Metadata type declaration
declare module 'next' {
  export interface Metadata {
    title?: string | { 
      default: string;
      template?: string;
      absolute?: string;
    };
    description?: string;
    [key: string]: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 