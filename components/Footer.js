import React from 'react';
import { 
  HiOutlineLocationMarker, 
  HiMail, 
  HiPhone
} from 'react-icons/hi';
import { BiLogoWhatsapp, BiLogoInstagram } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Kolom 1: Logo & Nama */}
          <div className="flex items-start space-x-4">
            <img src="/Dokumentasi/logo.png" alt="Logo Sekolah" className="h-12 w-14 object-contain" />
            <div>
              <h5 className="font-bold text-xl mb-1">SDN 2 Sabah Balau</h5>
              <p className="text-sm text-white/70">Kecamatan Tanjung Bintang</p>
            </div>
          </div>

          {/* Kolom 2: Alamat */}
          <div>
            <h5 className="font-bold text-xl mb-4 flex items-center">
              <HiOutlineLocationMarker className="mr-2" /> Alamat
            </h5>
            <p className="text-sm text-white/70 leading-relaxed">
              Way Galih, Kec. Tj. Bintang<br />
              Kabupaten Lampung Selatan<br />
              Lampung
            </p>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h5 className="font-bold text-xl mb-4 flex items-center">
              <HiPhone className="mr-2" /> Kontak
            </h5>
            <ul className="space-y-3">
              <li>
                <a href="mailto:sdn2sabahbalau@gmail.com" className="flex items-center text-sm text-white/70 hover:text-white transition-colors">
                  <HiMail className="mr-3 flex-shrink-0" size={18} />
                  sdn2sabahbalau@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/6282178133373" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/70 hover:text-white transition-colors">
                  <BiLogoWhatsapp className="mr-3 flex-shrink-0" size={18} />
                  +62 821-7813-3373
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sdn2sabahbalau" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-white/70 hover:text-white transition-colors">
                  <BiLogoInstagram className="mr-3 flex-shrink-0" size={18} />
                  @sdn2.sabahbalau
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <hr className="border-white/20 my-8" />
        <div className="text-center">
          <p className="text-sm text-white/70">
            © 2025 SDN 2 Sabah Balau. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;