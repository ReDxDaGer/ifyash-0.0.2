"use client";
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './menu.css'
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {socialMediaLinks} from "../../src/app/portfolio";

const menuLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
]

const Menu = () => {
  const containerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: 75 });
    tl.current = gsap.timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      });
  }, {scope: containerRef});

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={containerRef}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href={'/'}>CodeGrid</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href={'/'}>CodeGrid</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>

        <div className="menu-close-icon">
            <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className='menu-link'>
                    {link.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              {socialMediaLinks.map((media, i) => {
                return (
                  <a
                    key={i}
                    href={media.link}
                    className={`icon-button`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {media.name} &#8599;
                  </a>
                );
              })}
            </div>
            <div className="menu-info-col">
                <p>info@redxdager.com</p>
                <p>2442 232 343</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
            <p>View Showreel</p>
        </div>
      </div>
    </div>
  )
}

export default Menu