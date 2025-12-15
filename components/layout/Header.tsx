/**
 * Header Component
 *
 * Site-wide header with navigation.
 * Includes logo/brand and primary navigation links.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { siteContent } from '@/lib/content';
import { useAuth } from '@/lib/auth/AuthContext';

export function Header() {
  const pathname = usePathname();
  const { profile, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate role-based navigation links
  const getRoleBasedLinks = () => {
    if (loading || !profile) return [];

    const links = [];

    if (profile.role === 'owner') {
      links.push(
        { label: 'Admin', href: '/admin' },
        { label: 'Investor', href: '/investors' }
      );
    } else if (profile.role === 'investor') {
      links.push(
        { label: 'Investor', href: '/investors' }
      );
    }

    return links;
  };

  const roleBasedLinks = getRoleBasedLinks();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobileDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking inside the dropdown ref (button or menu)
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      // Use 'click' instead of 'mousedown' to allow link navigation to fire first
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Handle keyboard navigation for dropdowns
  const handleKeyDown = (e: React.KeyboardEvent, linkLabel: string) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(openDropdown === linkLabel ? null : linkLabel);
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md">
        <Container>
          <div className="flex h-12 sm:h-16 items-center justify-between">
          {/* Logo / Brand - Responsive */}
          <Link
            href="/"
            className="text-xs sm:text-base lg:text-xl tracking-tight text-gray-50 transition-colors hover:text-terminal-gold flex-shrink-0"
          >
            {pathname === '/' ? (
              <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl">®</span>
            ) : (
              <>
                <span className="font-semibold whitespace-nowrap">Rationale: </span>
                <span className="font-light hidden xl:inline">Your Product Design Company</span>
              </>
            )}
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className={`hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-shrink-0 ${pathname === '/' ? 'ml-auto' : ''}`} ref={dropdownRef}>
            {/* Standard navigation links with role-based links injected */}
            {siteContent.navigation.primary.map((link, index) => {
              // Inject role-based links before "Clients" link
              const shouldInjectRoleLinks = link.label === 'Clients' && roleBasedLinks.length > 0;
              const hasDropdown = 'dropdown' in link && link.dropdown && Array.isArray(link.dropdown) && link.dropdown.length > 0;
              const isDropdownOpen = openDropdown === link.label;
              const isDisabled = Boolean('disabled' in link && link.disabled);

              if (hasDropdown) {
                return (
                  <>
                    {/* Inject role-based links before this item if needed */}
                    {shouldInjectRoleLinks && roleBasedLinks.map((roleLink) => (
                      <Link
                        key={roleLink.href}
                        href={roleLink.href}
                        className={`text-sm font-medium transition-colors hover:text-terminal-gold whitespace-nowrap py-3 px-1 inline-flex items-center ${
                          isActive(roleLink.href) ? 'text-terminal-gold border-b-2 border-terminal-gold' : 'text-gray-400'
                        }`}
                      >
                        {roleLink.label}
                      </Link>
                    ))}
                    <div key={link.label} className="relative">
                    <button
                      onClick={() => !isDisabled && setOpenDropdown(isDropdownOpen ? null : link.label)}
                      onKeyDown={(e) => !isDisabled && handleKeyDown(e, link.label)}
                      disabled={isDisabled}
                      className={`text-sm font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1 ${
                        isDisabled
                          ? 'text-gray-600 cursor-not-allowed'
                          : `hover:text-terminal-gold ${isActive(link.href) ? 'text-terminal-gold border-b-2 border-terminal-gold' : 'text-gray-400'}`
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      aria-controls={`dropdown-${link.label}`}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && !isDisabled && (
                      <div
                        id={`dropdown-${link.label}`}
                        className="absolute top-full right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-md shadow-lg overflow-hidden z-50"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {/* Coming Soon Header */}
                        <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800">
                          Coming Soon
                        </div>
                        {Array.isArray(link.dropdown) && link.dropdown.map((dropdownItem) => {
                          const itemDisabled = 'disabled' in dropdownItem && dropdownItem.disabled;
                          return itemDisabled ? (
                            <div
                              key={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
                            >
                              {dropdownItem.label}
                            </div>
                          ) : (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-gray-400 hover:bg-terminal-gold/10 hover:text-terminal-gold transition-colors"
                              role="menuitem"
                            >
                              {dropdownItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  </>
                );
              }

              return (
                <React.Fragment key={link.href}>
                  {/* Inject role-based links before this item if needed */}
                  {shouldInjectRoleLinks && roleBasedLinks.map((roleLink) => (
                    <Link
                      key={roleLink.href}
                      href={roleLink.href}
                      className={`text-sm font-medium transition-colors hover:text-terminal-gold whitespace-nowrap py-3 px-1 inline-flex items-center ${
                        isActive(roleLink.href) ? 'text-terminal-gold border-b-2 border-terminal-gold' : 'text-gray-400'
                      }`}
                    >
                      {roleLink.label}
                    </Link>
                  ))}
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-terminal-gold whitespace-nowrap py-3 px-1 inline-flex items-center ${
                      isActive(link.href) ? 'text-terminal-gold border-b-2 border-terminal-gold' : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center p-3 text-gray-400 hover:text-terminal-gold transition-colors min-w-[48px] min-h-[48px] lg:!hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown - Full Height Overlay */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="py-4 border-t border-gray-800 bg-gray-900">
            {siteContent.navigation.primary.map((link) => {
              // Inject role-based links before "Clients" link in mobile too
              const shouldInjectRoleLinks = link.label === 'Clients' && roleBasedLinks.length > 0;
              const hasDropdown = 'dropdown' in link && link.dropdown && Array.isArray(link.dropdown) && link.dropdown.length > 0;
              const isExpanded = expandedMobileDropdown === link.label;
              const isDisabled = Boolean('disabled' in link && link.disabled);

              if (hasDropdown) {
                return (
                  <>
                    {/* Inject role-based links before this item if needed */}
                    {shouldInjectRoleLinks && roleBasedLinks.map((roleLink) => (
                      <Link
                        key={roleLink.href}
                        href={roleLink.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-4 text-sm font-medium transition-colors hover:text-terminal-gold min-h-[48px] flex items-center ${
                          isActive(roleLink.href) ? 'text-terminal-gold border-b border-terminal-gold' : 'text-gray-400'
                        }`}
                      >
                        {roleLink.label}
                      </Link>
                    ))}
                    <div key={link.label}>
                    <button
                      onClick={() => !isDisabled && setExpandedMobileDropdown(isExpanded ? null : link.label)}
                      disabled={isDisabled}
                      className={`w-full flex items-center justify-between px-4 py-4 text-sm font-medium transition-colors min-h-[48px] ${
                        isDisabled
                          ? 'text-gray-600 cursor-not-allowed'
                          : `hover:text-terminal-gold ${isActive(link.href) ? 'text-terminal-gold border-b border-terminal-gold' : 'text-gray-400'}`
                      }`}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-dropdown-${link.label}`}
                    >
                      {link.label}
                      <svg
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mobile Dropdown Items */}
                    <div
                      id={`mobile-dropdown-${link.label}`}
                      className={`overflow-hidden transition-all duration-200 ${
                        isExpanded ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      {/* Coming Soon Header */}
                      <div className="pl-8 pr-4 py-2 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800">
                        Coming Soon
                      </div>
                      {Array.isArray(link.dropdown) && link.dropdown.map((dropdownItem) => {
                        const itemDisabled = 'disabled' in dropdownItem && dropdownItem.disabled;
                        return itemDisabled ? (
                          <div
                            key={dropdownItem.href}
                            className="block pl-8 pr-4 py-3 text-sm text-gray-600 cursor-not-allowed"
                          >
                            {dropdownItem.label}
                          </div>
                        ) : (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setExpandedMobileDropdown(null);
                            }}
                            className="block pl-8 pr-4 py-4 text-sm text-gray-400 hover:text-terminal-gold transition-colors min-h-[48px] flex items-center"
                          >
                            {dropdownItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  </>
                );
              }

              return (
                <>
                  {/* Inject role-based links before this item if needed */}
                  {shouldInjectRoleLinks && roleBasedLinks.map((roleLink) => (
                    <Link
                      key={roleLink.href}
                      href={roleLink.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-4 text-sm font-medium transition-colors hover:text-terminal-gold min-h-[48px] flex items-center ${
                        isActive(roleLink.href) ? 'text-terminal-gold border-b border-terminal-gold' : 'text-gray-400'
                      }`}
                    >
                      {roleLink.label}
                    </Link>
                  ))}
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-4 text-sm font-medium transition-colors hover:text-terminal-gold min-h-[48px] flex items-center ${
                      isActive(link.href) ? 'text-terminal-gold border-b border-terminal-gold' : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </>
              );
            })}
          </nav>
        </div>
        </Container>
    </header>
    </>
  );
}
