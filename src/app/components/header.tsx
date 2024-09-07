'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { Tags } from '@/interface/home';

import { useRef, useEffect } from 'react';

interface HeaderProps {
  researchTags: Tags[];
}

export default function Header({ researchTags }: HeaderProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [prioritiesDropdownOpen, setPrioritiesDropdownOpen] = useState(false);

  const [sdgDropdownOpen, setSdgDropdownOpen] = useState(false);
  const [agendaDropdownOpen, setAgendaDropdownOpen] = useState(false);
  const [impactDropdownOpen, setImpactDropdownOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement[]>([]);




  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        const isInsideDropdown = 
            menuRef.current && menuRef.current.contains(event.target as Node) || 
            dropdownRef.current.some(ref => ref && ref.contains(event.target as Node));
        if (!isInsideDropdown) {
            closeAllDropdowns();
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const toggleMenu = () => { 
    closeAllDropdowns('menu'),
    setIsOpen(!isOpen); 
  };

  const closeAllDropdowns = (exclude?: string, multiple? : boolean) => {
    console.log(exclude)
    if (exclude !== 'dropdownOpen') setDropdownOpen(false);
    if (exclude !== 'mediaDropdownOpen') setMediaDropdownOpen(false);
    if (exclude !== 'aboutDropdownOpen') setAboutDropdownOpen(false);
    if (exclude !== 'projectsDropdownOpen') setProjectsDropdownOpen(false);
    if (exclude !== 'prioritiesDropdownOpen') setPrioritiesDropdownOpen(false);
    if (exclude !== 'sdgDropdownOpen') setSdgDropdownOpen(false);
    if (exclude !== 'agendaDropdownOpen') setAgendaDropdownOpen(false);
    if (exclude !== 'impactDropdownOpen') setImpactDropdownOpen(false);
     if (exclude !== 'menu'  && !multiple) setIsOpen(false);
    console.log(aboutDropdownOpen)
  };

  const togglePublicationsDropdown = () => {
    closeAllDropdowns('dropdownOpen',  true),
    
      setDropdownOpen(!dropdownOpen);
  };

  const toggleMediaDropdown = () => {
    closeAllDropdowns('mediaDropdownOpen' , true),
      setMediaDropdownOpen(!mediaDropdownOpen);
  };

  const toggleAboutDropdown = () => {
    closeAllDropdowns('aboutDropdownOpen', true);
    setAboutDropdownOpen(!aboutDropdownOpen);
  };


  const toggleProjectsDropdown = () => {
    closeAllDropdowns('projectsDropdownOpen', true),
      setProjectsDropdownOpen(!projectsDropdownOpen);
  }


  const togglePrioritiesDropdown = () => {
    closeAllDropdowns('prioritiesDropdownOpen', true),
      setPrioritiesDropdownOpen(!prioritiesDropdownOpen);

  };

  const toggleSdgDropdown = () => {
    setAgendaDropdownOpen(false),
      setSdgDropdownOpen(!sdgDropdownOpen);

  };

  const toggleAgendaDropdown = () => {
    setSdgDropdownOpen(false),
      setAgendaDropdownOpen(!agendaDropdownOpen);

  };

  const toggleImpactDropdown = () => { setImpactDropdownOpen(!impactDropdownOpen); };


  return (
    <div ref={menuRef} className="bg-nav sticky-nav fixed-top">
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" href="/">
          <Image className='logo' src={logo} alt={'IMAGE'} />
        </Link>

        <div className="hidden md-flex nav-bar-collapse">
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className=''>
              <Link className='nav-link' href="/publications/blogs-and-articles">
                News & Insights</Link>
            </li>

            <li className='nav-item relative dropdown-toggle'>
              <button className='nav-link inline-flex items-center' onClick={toggleAboutDropdown}>
                About
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>

              {aboutDropdownOpen && (
                <ul ref={el => {
                  if (el) {
                    dropdownRef.current[0] = el;
                  }
                }} className="absolute dropdown-menu show">

                  <li><Link className="dropdown-item" href="/about" onClick={toggleAboutDropdown}>About The Youth Print</Link></li>

                  <li className="relative">
                    <button className="side-dropdown w-full text-left" onClick={toggleImpactDropdown}>
                      Our Impacts
                      <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {impactDropdownOpen && (
                      <ul className="absolute left-full top-0 mt-2 pl-4 border border-gray-200 bg-white shadow-lg">
                        <li>
                          <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Impact</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Theory of change</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Strategy</Link>
                        </li>
                      </ul>
                    )}
                  </li>


                  <li><Link className="dropdown-item" href="/team" onClick={toggleAboutDropdown}>Our Teams</Link></li>

                  <li><Link className="dropdown-item" href="/" onClick={toggleAboutDropdown}>Patners</Link></li>

                  <li><Link className="dropdown-item" href="/" onClick={toggleAboutDropdown}>Annual Reviews</Link></li>

                  <li><Link className="dropdown-item" href="/" onClick={toggleAboutDropdown}>Carreers & Opportunities</Link></li>

                  <li><Link className="dropdown-item" href="/contact" onClick={toggleAboutDropdown}>Contact us</Link></li>

                </ul>
              )}
            </li>



            <li className='nav-item relative dropdown-toggle'>
              <button className='nav-link inline-flex items-center' onClick={togglePrioritiesDropdown}>
                Our Priorities
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>

              {prioritiesDropdownOpen && (
                <ul ref={el => {
                  if (el) {
                    dropdownRef.current[0] = el;
                  }
                }} className="absolute dropdown-menu show">
                  <li className="relative">
                    <button className="side-dropdown w-full text-left" onClick={toggleSdgDropdown}>
                      Sustainable Development Goals
                      <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {sdgDropdownOpen && (
                      <ul className="absolute left-full top-0 mt-2 pl-4 border border-gray-200 bg-white shadow-lg">
                        <li>
                          <Link className="side-dropdown" href="/" onClick={toggleSdgDropdown}>Climate Chnage (SDG 13)</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Envrionemnt (SDG 6)</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Energy (SDG 7)</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Biodiversity (SDG 14)</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Partnership for the Goals (SDG 17)</Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="relative">
                    <button className="side-dropdown w-full text-left" onClick={toggleAgendaDropdown}>
                      African Union Agenda 2063
                      <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {agendaDropdownOpen && (
                      <ul className="absolute left-full top-0 mt-2 pl-4 border border-gray-200 bg-white shadow-lg">
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Young Africans Shaping Global Narratives</Link>
                        </li>
                        <li>
                          <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Youth-Driven Futures for Africa</Link>
                        </li>

                      </ul>
                    )}
                  </li>

                  <li><Link className="dropdown-item" href="/" onClick={togglePrioritiesDropdown}>Global Reform Agenda&apos;s</Link></li>

                </ul>
              )}
            </li>

            <li className='nav-item relative dropdown-toggle'>
              <button className='nav-link inline-flex items-center' onClick={toggleProjectsDropdown}>
                Our Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>

              {projectsDropdownOpen && (
                <ul ref={el => {
                  if (el) {
                    dropdownRef.current[0] = el;
                  }
                }} className="absolute dropdown-menu show">
                  <li><Link className="dropdown-item" href="/">AACJ</Link></li>
                  <li><Link className="dropdown-item" href="/">Youth climate mentorship</Link></li>
                </ul>


              )}
            </li>

            <li className='nav-item relative dropdown-toggle'>
              <button className='nav-link inline-flex items-center' onClick={togglePublicationsDropdown}>
                Publication
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>


              {dropdownOpen && (
                <ul ref={el => {
                  if (el) {
                    dropdownRef.current[0] = el;
                  }
                }} className=" absolute dropdown-menu show">
                  {researchTags.map((tag, index) => (
                    <li key={index} className=''>
                      <Link className="dropdown-item" href={`/publications/${tag.attributes.slug}`} onClick={togglePublicationsDropdown}>{tag.attributes.tag}</Link>
                    </li>

                  ))}
                </ul>
              )}
            </li>

            <li className='nav-item'>
              <Link className='nav-link' href="/events">Events</Link>
            </li>

            <li className='nav-item relative dropdown-toggle'>
              <button className='nav-link inline-flex items-center' onClick={toggleMediaDropdown}>
                Media
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
              {mediaDropdownOpen && (
                <ul ref={el => {
                  if (el) {
                    dropdownRef.current[0] = el;
                  }
                }} className="dropdown-menu show">
                  <li className=''>
                    <li className=''>
                      <Link className="dropdown-item" href="/" onClick={toggleMediaDropdown}>Press Release</Link>
                    </li>
                    <Link className="dropdown-item" href="/videos" onClick={toggleMediaDropdown}>Videos</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item" href="/infographics" onClick={toggleMediaDropdown}>Infographics</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item" href="/publications/blogs-and-articles" onClick={toggleMediaDropdown}>Blogs</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item" href="/" onClick={toggleMediaDropdown}>Podcasts</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item" href="/" onClick={toggleMediaDropdown}>Factsheets</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item-small dropdown-item" href="/blogs" onClick={toggleMediaDropdown}>Newsletters</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item-small dropdown-item" href="/" onClick={toggleMediaDropdown}>Annual Reports</Link>
                  </li>
                  <li className=''>
                    <Link className="dropdown-item-small dropdown-item" href="/" onClick={toggleMediaDropdown}>Achievements &<br /> Impacts</Link>
                  </li>

                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="md-flex:hidden flex items-center">
          <button className="navbar-toggler" onClick={toggleMenu}>
            <svg className="h-6 w-6 navbar-toggler-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>




      {/* Mobile */}
      <div ref={menuRef} className={`md-flex:hidden ${isOpen ? 'block' : 'hidden'} navbar-collapse`}>
        <ul className="navbar-dropdown ms-auto mb-2 mb-lg-0 h-64 overflow-y-auto">
          <li className="nav-item"><Link className="nav-link text-[20px]" href="/publications/blogs-and-articles" onClick={toggleMenu}> News & Insights</Link></li>

          <li className="nav-item relative">
            <button className="nav-link inline-flex items-center text-[20px]" onClick={toggleAboutDropdown}>
              About
              <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>


            {aboutDropdownOpen && (
              <ul ref={el => {
                if (el) {
                  dropdownRef.current[0] = el;
                }
              }} className="pl-42 h-64 overflow-y-auto">
                <li>
                  <Link className="side-dropdown" href="/about" onClick={toggleMenu}>About The Youth Print</Link>
                </li>
                <li>
                  <button className="side-dropdown" onClick={toggleImpactDropdown}>
                    Our Impacts
                    <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {impactDropdownOpen && (
                    <ul className="pl-42">
                      <li>
                        <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Impact</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Theory of change</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={(event) => closeAllDropdowns()}>Strategy</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link className="side-dropdown" href="/team" onClick={toggleMenu}>Our Teams</Link>
                </li>
                <li>
                  <Link className="side-dropdown" href="/" onClick={toggleMenu}>Partners</Link>
                </li>
                <li>
                  <Link className="side-dropdown" href="/" onClick={toggleMenu}>Annual Reviews</Link>
                </li>
                <li>
                  <Link className="side-dropdown" href="/" onClick={toggleMenu}>Carreers & Opportunities</Link>
                </li>
                <li>
                  <Link className="side-dropdown" href="/contact" onClick={toggleMenu}>Contact</Link>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle text-[20px]" onClick={togglePrioritiesDropdown}>
              Our Priorities
              <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {prioritiesDropdownOpen && (
              <ul ref={el => {
                if (el) {
                  dropdownRef.current[0] = el;
                }
              }} className="pl-4 ">
                <li>
                  <button className="side-dropdown" onClick={toggleSdgDropdown}>
                    SDG
                    <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {sdgDropdownOpen && (
                    <ul className="pl-42">
                      <li>
                        <Link className="side-dropdown" href="/" onClick={toggleSdgDropdown}>Climate Chnage (SDG 13)</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Envrionemnt (SDG 6)</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Energy (SDG 7)</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Biodiversity (SDG 14)</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Partnership for the Goals (SDG 17)</Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <button className="side-dropdown" onClick={toggleAgendaDropdown}>
                    African Union Agenda 2063
                    <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {agendaDropdownOpen && (
                    <ul  className="pl-42">
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Young Africans Shaping Global Narratives</Link>
                      </li>
                      <li>
                        <Link className="side-dropdown" href="/" onClick={togglePrioritiesDropdown}>Youth-Driven Futures for Africa</Link>
                      </li>

                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle text-[20px]" onClick={toggleProjectsDropdown}>
              Our Projects
              <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {projectsDropdownOpen && (
              <ul className="pl-4">
                <li>
                  <Link className="side-dropdown" href="/" onClick={toggleMenu}>AACJ</Link>

                </li>
                <li><Link className="side-dropdown" href="/">Youth climate mentorship</Link></li>
              </ul>
            )}
          </li>



          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle text-[20px]" onClick={togglePublicationsDropdown}>


              Publications
              <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="pl-4 h-64 overflow-y-auto">
                {researchTags.map((tag, index) => (
                  <li key={index} className=''>
                    <Link className="block px-4 py-2  hover:bg-gray-100 text-[18px]" href={`/publications/${tag.attributes.slug}`} onClick={toggleMenu}>{tag.attributes.tag}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>


          <li className="nav-item"><Link className="nav-link text-[20px]" href="/events" onClick={toggleMenu}>Events</Link></li>


          <li className="nav-item relative">
            <button className="nav-link inline-flex items-center text-[20px]" onClick={toggleMediaDropdown}>
              Media
              <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {mediaDropdownOpen && (
              <ul ref={el => {
                if (el) {
                  dropdownRef.current[0] = el;
                }
              }}className="pl-42  h-64 overflow-y-auto">
                <li>
                  <Link className="mobile-dropdown-item" href="/" onClick={toggleMenu}>Press Release</Link>
                </li>
                <li>
                  <Link className="mobile-dropdown-item" href="/videos" onClick={toggleMenu}>Videos</Link>
                </li>

                <li>
                  <Link className="mobile-dropdown-item" href="/infographics" onClick={toggleMenu}>Infographics</Link>
                </li>

                <li>
                  <Link className="mobile-dropdown-item" href="/blogs" onClick={toggleMenu}>Blogs</Link>
                </li>

                <li>
                  <Link className="mobile-dropdown-item" href="/" onClick={toggleMenu}>Podcasts</Link>
                </li>

                <li>
                  <Link className="mobile-dropdown-item" href="/" onClick={toggleMenu}>Factsheets</Link>
                </li>

                <li>
                  <Link className=" dropdown-item-small mobile-dropdown-item " href="/" onClick={toggleMenu}>Newsletter</Link>
                </li>

                <li>
                  <Link className="dropdown-item-small mobile-dropdown-item" href="/" onClick={toggleMenu}>Annual reports</Link>
                </li>

                <li>
                  <Link className="dropdown-item-small mobile-dropdown-item" href="/" onClick={toggleMenu}>Achievments & <br /> Impacts</Link>
                </li>



              </ul>
            )}
          </li>




        </ul>
      </div>
    </div>
  );
}
