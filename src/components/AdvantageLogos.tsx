import React from 'react';

export const SmkPkLogo: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="smkPkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#E5B62A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="smkPkNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0A1931" />
        </linearGradient>
      </defs>
      
      {/* Outer Decorative Gold Sunburst / Star Ring */}
      <circle cx="80" cy="80" r="74" stroke="url(#smkPkGoldGrad)" strokeWidth="2.5" strokeDasharray="4 2" />
      <circle cx="80" cy="80" r="67" fill="url(#smkPkNavyGrad)" stroke="url(#smkPkGoldGrad)" strokeWidth="2.5" />
      
      {/* 3 Top Stars */}
      <path d="M80 23L82 28.5H87.5L83.5 31.5L85 37L80 34L75 37L76.5 31.5L72.5 28.5H78L80 23Z" fill="#FDE047" />
      <path d="M62 29L63.5 33H67.5L64.5 35.5L65.5 39.5L62 37L58.5 39.5L59.5 35.5L56.5 33H60.5L62 29Z" fill="#FDE047" />
      <path d="M98 29L99.5 33H103.5L100.5 35.5L101.5 39.5L98 37L94.5 39.5L95.5 35.5L92.5 33H96.5L98 29Z" fill="#FDE047" />
      
      {/* Vokasi Gear / Cog in the background */}
      <circle cx="80" cy="62" r="16" fill="#0F172A" stroke="url(#smkPkGoldGrad)" strokeWidth="2.5" />
      <path d="M80 51V73M69 62H91M72 54L88 70M72 70L88 54" stroke="url(#smkPkGoldGrad)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="62" r="6.5" fill="#FDE047" />
      
      {/* Open Book / Wings Motif */}
      <path d="M40 92C40 76 58 70 80 77C102 70 120 76 120 92C106 86 93 86 80 94C67 86 54 86 40 92Z" fill="#F8FAFC" />
      <path d="M44 96C56 91 68 91 80 98C92 91 104 91 116 96C104 101 92 101 80 108C68 101 56 101 44 96Z" fill="url(#smkPkGoldGrad)" />

      {/* Gold Ribbon / Banner */}
      <path d="M28 116L38 109H122L132 116L124 124H36L28 116Z" fill="url(#smkPkGoldGrad)" />
      <text x="80" y="119.5" fill="#0A1931" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.8">SMK PUSAT KEUNGGULAN</text>
    </svg>
  </div>
);

export const AdiwiyataLogo: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="adiwiyataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      
      {/* Outer circular green ring */}
      <circle cx="80" cy="80" r="74" fill="#F0FDF4" stroke="url(#adiwiyataGrad)" strokeWidth="3" />
      <circle cx="80" cy="80" r="66" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="2" />
      
      {/* Soft yellow sun backdrop */}
      <circle cx="80" cy="66" r="28" fill="#FEF3C7" opacity="0.75" />
      
      {/* Trunk / Caring Hands Motif */}
      <path d="M68 104C68 94 74 88 80 82C86 88 92 94 92 104C92 108 88 110 80 110C72 110 68 108 68 104Z" fill="#92400E" />
      
      {/* Main Center Leaf */}
      <path d="M80 38C80 38 63 53 63 71C63 81 71 87 80 87C89 87 97 81 97 71C97 53 80 38 80 38Z" fill="url(#adiwiyataGrad)" />
      <path d="M80 42V83M80 54L71 63M80 65L89 73M80 67L73 75" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Left Leaf */}
      <path d="M50 60C50 60 42 74 50 84C54 89 61 90 66 86C62 76 56 68 50 60Z" fill="#34D399" />
      
      {/* Right Leaf */}
      <path d="M110 60C110 60 118 74 110 84C106 89 99 90 94 86C98 76 104 68 110 60Z" fill="#059669" />

      {/* Small top tip leaf */}
      <path d="M80 32C84 35 86 40 84 43C81 42 78 39 80 32Z" fill="#10B981" />
      
      {/* Green Ribbon Banner */}
      <path d="M34 116L44 110H116L126 116L118 124H42L34 116Z" fill="url(#adiwiyataGrad)" />
      <text x="80" y="119.5" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="1.2">ADIWIYATA</text>
    </svg>
  </div>
);

export const LspP1Logo: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lspGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#E5B62A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="lspRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="lspNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0A1931" />
        </linearGradient>
      </defs>
      
      {/* Outer Shield */}
      <path d="M80 14L136 34V84C136 118 112 138 80 148C48 138 24 118 24 84V34L80 14Z" fill="url(#lspNavyGrad)" stroke="url(#lspGoldGrad)" strokeWidth="3" />
      <path d="M80 22L128 39V82C128 112 107 130 80 139C53 130 32 112 32 82V39L80 22Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Inner Central Shield */}
      <path d="M80 43L108 54V81C108 99 96 110 80 116C64 110 52 99 52 81V54L80 43Z" fill="#F8FAFC" stroke="url(#lspGoldGrad)" strokeWidth="1.5" />
      
      {/* Stylized Golden Garuda Motif */}
      <path d="M80 47L83 53H77L80 47Z" fill="url(#lspGoldGrad)" />
      <circle cx="80" cy="54" r="4.5" fill="url(#lspGoldGrad)" />
      
      {/* Spread Wings */}
      <path d="M56 65C66 63 74 67 80 73C86 67 94 63 104 65C98 75 90 81 80 85C70 81 62 75 56 65Z" fill="url(#lspGoldGrad)" />
      <path d="M60 75C68 75 74 79 80 85C86 79 92 75 100 75C94 83 88 87 80 93C72 87 66 83 60 75Z" fill="#B45309" opacity="0.8" />
      
      {/* Tail Feathers */}
      <path d="M75 93H85L83 103H77L75 93Z" fill="url(#lspGoldGrad)" />
      
      {/* Red Header Tag BNSP */}
      <rect x="58" y="27" width="44" height="13" rx="3" fill="url(#lspRedGrad)" />
      <text x="80" y="36.5" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="1">BNSP</text>

      {/* Gold Ribbon at Bottom */}
      <path d="M40 119L48 113H112L120 119L114 126H46L40 119Z" fill="url(#lspGoldGrad)" />
      <text x="80" y="122.5" fill="#0A1931" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.8">LSP - P1</text>
    </svg>
  </div>
);
