import { Cpu, GlobeHemisphereWest, Calculator, Briefcase } from '@phosphor-icons/react';

export function getMajorIcon(abbr: string, className = "w-6 h-6") {
  switch (abbr.toUpperCase()) {
    case 'RPL':
      return <Cpu className={className} weight="duotone" />;
    case 'TKJ':
      return <GlobeHemisphereWest className={className} weight="duotone" />;
    case 'AKL':
      return <Calculator className={className} weight="duotone" />;
    default:
      return <Briefcase className={className} weight="duotone" />;
  }
}
