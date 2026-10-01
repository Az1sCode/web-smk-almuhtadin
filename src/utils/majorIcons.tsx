import { Network, Briefcase, FilmSlate, CookingPot } from '@phosphor-icons/react';

export function getMajorIcon(abbr: string, className = "w-6 h-6") {
  switch (abbr.toUpperCase()) {
    case 'TJKT':
    case 'TKJ':
      return <Network className={className} weight="duotone" />;
    case 'MPLB':
    case 'AKL':
      return <Briefcase className={className} weight="duotone" />;
    case 'ANIMASI':
    case 'ANM':
      return <FilmSlate className={className} weight="duotone" />;
    case 'KULINER':
    case 'KLN':
    case 'TBG':
      return <CookingPot className={className} weight="duotone" />;
    default:
      return <Briefcase className={className} weight="duotone" />;
  }
}
