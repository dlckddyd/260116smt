import React, { useState, useEffect } from 'react';

// UI Card Component for Floating Animations
export const UiCard = ({ icon: Icon, title, value, sub, color = "text-brand-accent", bgColor = "bg-blue-100" }: any) => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-4 border border-white/60 flex items-center gap-3 min-w-[160px] transform hover:scale-105 transition-transform">
    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div className="flex-1">
      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{title}</div>
      <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
        {value}
        {sub && <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-500 font-medium">{sub}</span>}
      </div>
    </div>
  </div>
);

// Component to handle the sequential pop-up/pop-down animation
// Interval speed set to 2500ms for faster cycle
interface ServiceVisualProps {
    image: string;
    groups: any[][];
}

const ServiceVisual: React.FC<ServiceVisualProps> = ({ image, groups }) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  useEffect(() => {
    // Faster Cycle: 2500ms
    const interval = setInterval(() => {
      setActiveGroupIndex((prev) => (prev + 1) % groups.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [groups.length]);

  return (
    <div className="relative aspect-square lg:aspect-[4/3] flex items-center justify-center">
      {/* Background Decorative Circle */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-[3rem] -z-10" />
      
      {/* Main Image (Phone/Product Mockup) */}
      <div className="relative w-[65%] h-[85%] rounded-[2rem] shadow-2xl overflow-hidden bg-white border-4 border-white z-10 transition-transform duration-700 hover:scale-[1.01]">
        <img 
            src={image} 
            alt="Service Mockup" 
            className="w-full h-full object-cover" 
            loading="lazy"
            decoding="async"
        />
      </div>

      {/* Floating UI Groups */}
      {groups.map((group, groupIdx) => (
        <React.Fragment key={groupIdx}>
          {group.map((item, itemIdx) => {
            const isActive = groupIdx === activeGroupIndex;
            // Stagger delay based on index for wave effect
            const delay = isActive ? itemIdx * 100 : (group.length - itemIdx - 1) * 50; 
            
            return (
              <div
                key={`${groupIdx}-${itemIdx}`}
                className={`absolute z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${item.position}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(15px) scale(0.8)',
                  pointerEvents: 'none',
                  transitionDelay: `${delay}ms`
                }}
              >
                <UiCard {...item} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServiceVisual;