/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import MainComponent from './components/main'
import AboutComponent from './components/about'
import ServicesComponent from './components/services'
import ProductsComponent from './components/products'
import ContactComponent from './components/contact'
import IconBars from '@/app/ui/icons/IconBars'
import IconClose from '@/app/ui/icons/IconClose'
import Image from 'next/image';

export default function PortofolioPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const productRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    setMobileNavigation(false)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isMobileNavigation, setMobileNavigation] = useState<boolean>(false)

  return (
    <main className='relative'>
      {/* Navbar section */}
      <div className={`fixed w-full opacity-80 top-0 z-50 py-4 px-4 text-white lg:px-6 ${
        isScrolled ? 'bg-slate-900' : 'bg-transparent'
      }`}>
        <div className='flex justify-between'>
          <div
            className='flex items-center justify-center cursor-pointer'
            onClick={() => scrollToSection(mainRef)}
          >
            <Image
              src='/logo-white.png'
              width={30}
              height={30}
              alt='Logo of NDT'
              className='mr-4'
            />
            <div className='hidden md:block mt-2 uppercase text-center leading-3'>
              <div className="font-extrabold tracking-small">Nahcoda</div>
              <div className="text-sm">Digital Teknologi</div>
        </div>
          </div>
          <div className='block md:hidden'>
            <button onClick={() => setMobileNavigation(!isMobileNavigation)}>
              <IconBars className={`absolute size-6 transition-transform duration-300
                ${isMobileNavigation ? 'opacity-0' : 'opacity-100 rotate-0'} transform`}
              />
              <IconClose className={`size-6 transition-transform duration-300
                ${isMobileNavigation ? 'opacity-100 rotate-180' : 'opacity-0'} transform`}
              />
            </button>
            <div className={`px-2 absolute w-full left-0 ${isMobileNavigation ? 'animate-fade-in opacity-100' : 'opacity-0'}`}>
              <ul className="font-medium p-4 mt-4 rounded-lg bg-slate-800">
                <li>
                  <button
                    onClick={() => scrollToSection(mainRef)}
                    className="block py-2 px-3 rounded hover:underline">Home</button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="block py-2 px-3 rounded hover:underline">About</button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(servicesRef)}
                    className="block py-2 px-3 rounded hover:underline">Services</button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(productRef)}
                    className="block py-2 px-3 rounded hover:underline">Partner</button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="block py-2 px-3 rounded hover:underline">Contact</button>
                </li>
              </ul>
            </div>
          </div>
          <div className='hidden gap-4 md:flex'>
            <button
              className='hover:underline'
              onClick={() => scrollToSection(aboutRef)}
              >About</button
            >
            <button
              className='hover:underline'
              onClick={() => scrollToSection(servicesRef)}
              >Services</button
            >
            <button
              className='hover:underline'
              onClick={() => scrollToSection(productRef)}
              >Partner</button
            >
            <button
              className='hover:underline'
              onClick={() => scrollToSection(contactRef)}
              >Contact</button
            >
          </div>
        </div>
      </div>

      {/* Main section */}
      <MainComponent ref={mainRef} scrollY={scrollY} />

      {/* About section */}
      <AboutComponent ref={aboutRef} />

      {/* Services section */}
      <ServicesComponent ref={servicesRef} scrollY={scrollY}  />

      {/* Product section */}
      <ProductsComponent ref={productRef} />

      {/* Contact section */}
      <ContactComponent ref={contactRef} />
    </main>
  );
}
