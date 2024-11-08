/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function PortofolioPage() {
  const [offset, setOffset] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createRandomLine = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container = mainRef.current as any;
    const line = document.createElement('div');

    // Set base styles for the line
    line.style.position = 'absolute';
    line.style.backgroundColor = '#00ffff'; // Cyan for contrast
    line.style.opacity = '0.2';
    line.style.zIndex = '1';
    
    // Set orientation and animation
    const isHorizontal = Math.random() > 0.5;
    if (isHorizontal) {
      line.style.width = '60vw';
      line.style.height = '2px';
      line.style.top = `${Math.random() * 100}vh`;
      line.classList.add(`animate-move-horizontal`);
    } else {
      line.style.width = '2px';
      line.style.height = '60vh';
      line.style.left = `${Math.random() * 100}vw`;
      line.classList.add(`animate-move-vertical`);
    }

    // Append the line and remove it after 6 seconds
    if (container) {
      container.appendChild(line);
      setTimeout(() => container.removeChild(line), 6000);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(createRandomLine, 800);
    return () => clearInterval(intervalId);
  }, []);

  const aboutRef = useRef(null);
  const [isAboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const vissionRef = useRef(null);
  const [isVissionVisible, setVissionVisible] = useState(false);
  const [isMissionVisible, setMissionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.4) {
            setVissionVisible(true);
          }
          if (entry.intersectionRatio >= 0.7) {
            setMissionVisible(true);
          }
          if (entry.intersectionRatio >= 0.7) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: [0.4, 0.7] }
    );

    if (vissionRef.current) {
      observer.observe(vissionRef.current);
    }

    return () => {
      if (vissionRef.current) {
        observer.unobserve(vissionRef.current);
      }
    };
  }, []);


  const productRef = useRef(null);
  const [isProductVisible, setProductVisible] = useState(false);
  const [isProductImageVisible, setProductImageVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.2) {
            setProductVisible(true);
          }
          if (entry.intersectionRatio >= 0.4) {
            setProductImageVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: [0.2, 0.4] }
    );

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    return () => {
      if (productRef.current) {
        observer.unobserve(productRef.current);
      }
    };
  }, []);

  return (
    <main>
      {/* Navbar section */}
      <div className="fixed w-full bg-transparent opacity-95 top-0 z-50 py-2 px-4 text-white">
        <div className="flex justify-between">
          <div>
            <button className="hover:underline">Home</button>
          </div>
          <div className='flex gap-4'>
            <button className="hover:underline">Contact</button>
            <button className="hover:underline">About</button>
          </div>
        </div>
      </div>

      {/* Main section */}
      <div ref={mainRef} className="relative overflow-hidden bg-gray-950 text-white h-[90vh]">
        <div
          style={{ transform: `translateY(${offset}px)` }}
          className="z-10 absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-linear"
        >
          <div className="h-full flex flex-col justify-center text-center uppercase">
            <h1 className="shine-text animate-shine text-5xl lg:text-9xl font-extrabold tracking-widest text-gray-200">
              Nahcoda
            </h1>
            <p className="tracking-widest lg:text-2xl lg:tracking-letter18">Digital Teknologi</p>
          </div>
        </div>
      </div>

      {/* About section */}
      <div
        ref={aboutRef}
        className={`transform transition-opacity duration-1000 ${
          isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* bg-[url('/background/about.webp')] */}
        <div className="bg-gradient-to-b to-white from-slate-200 relative overflow-hidden min-h-[40vh]">
          <div className="max-w-7xl mx-auto py-20 lg:py-40 px-6">
            <h1 className="text-4xl font-medium uppercase">About the Company</h1>
            <p className="mt-4 text-xl text-justify">
              CV Nahcoda Digital Teknologi adalah perusahaan teknologi informasi yang
              berdiri sejak Tahun 2019 yang awalnya bernama PT Juru Ketik Nusantara,
              kemudian pada Tahun 2022 bertransformasi menjadi CV Nahcoda Digital
              Teknologi. Kami memiliki pengalaman luas dalam pengembangan aplikasi web,
              aplikasi mobile, keamanan siber, dan big data. Dengan tim yang terdiri
              dari para ahli teknologi yang berpengalaman, kami berkomitmen untuk
              memberikan layanan terbaik kepada anda.
            </p>
          </div>
        </div>
      </div>

      {/* Product section */}
      <div
        ref={productRef}
        className={`transform transition-opacity duration-1000 ${
          isProductVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-b to-slate-200 from-white relative overflow-hidden min-h-[40vh]">
          <div className='max-w-7xl mx-auto py-20 lg:py-40 px-6'>
            <h1 className='text-left text-4xl font-medium uppercase'>Our Product</h1>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`transform transition-opacity duration-1000 ${
                  isProductImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <Image
                  src="/products/siplah.tokoladang.co.id.png"
                  width={1000}
                  height={760}
                  alt="Screenshots of the siplah.tokoladang.co.id"
                />
              </div>
              <div className={`transform transition-opacity duration-1000 delay-500 ${
                  isProductImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <Image
                  src="/products/tokoladang.co.id.png"
                  width={1000}
                  height={760}
                  alt="Screenshots of the tokoladang.co.id"
                />
              </div>
              <div>
                <div className='font-bold text-xl uppercase'>
                  Aplikasi Gain Profit
                </div>
                <p>(Duta Swalayan, Alyasini Mart)</p>
              </div>
              <div>
                <div className='font-bold text-xl uppercase'>
                  Aplikasi BAYUR (Belanja Buah dan Sayur)
                </div>
                <p>(Bayur Melijo Online)</p>
              </div>
              <div>
                <div className='font-bold text-xl uppercase'>
                  Marketplace TOKO LADANG
                </div>
                <p>(PT. Ladang Karya Husada)</p>
              </div>
              <div>
                <div className='font-bold text-xl uppercase'>
                  Toko Daring TOKO LADANG
                </div>
                <p>(PT. Ladang Karya Husada)</p>
              </div>
              <div>
                <div className='font-bold text-xl uppercase'>
                  Sistem Administrasi Keuangan
                </div>
                <p>(Universitas Yudharta Pasuruan)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vision section */}
      <div ref={vissionRef} className="bg-gray-950 text-white relative overflow-hidden min-h-[60vh]">
        <div className='max-w-4xl mx-auto py-40 px-6'>
          <div className={`transform transition-transform duration-1000 ${
              isVissionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-40'
            }`}
          >
            <h1 className='text-4xl'>
              Visi Kami
            </h1>
            <p className='mt-4 text-justify'>
              Menjadi mitra strategis bagi bisnis dalam transformasi digital dengan
              memberikan solusi perangkat lunak yang disesuaikan dengan kebutuhan
              unik setiap klien
            </p>
          </div>
          <div className={`mt-20 ml-20 transform transition-transform duration-1000 ${
              isMissionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'
            }`}
          >
            <h1 className='text-5xl'>
              Misi Kami
            </h1>
            <p className='mt-4 text-justify'>
              Membantu klien mencapai tujuan bisnis klien melalui teknologi dengan
              membangun dan mengembangkan aplikasi mobile, web, dan sistem enterprise
              yang berkualitas tinggi, user-friendly, dan aman.
            </p>
          </div>
        </div>
      </div>
      {/* CSS section */}
      <style jsx>{`
          .shine-text {
            position: relative;
            color: white;
            background: linear-gradient(to left, rgba(250, 250, 250), rgba(230, 230, 230));
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-size: 150%;
          }
        `}</style>
    </main>
  );
}
