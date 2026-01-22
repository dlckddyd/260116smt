import React from 'react';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = "w-full h-full" }) => {
  return (
    <iframe 
      src="https://maps.google.com/maps?q=서울특별시+강서구+양천로+547+마스터밸류&hl=ko&z=17&output=embed"
      className={className}
      style={{ border: 0 }} 
      allowFullScreen={true} 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
    />
  );
};

export default GoogleMap;