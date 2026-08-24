import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Create navigation utilities that work with localized routes
// These are used for Link, redirect, usePathname, useRouter
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
