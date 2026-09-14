import React, { useState } from "react";
import { Utensils } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  category?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = "Taom tasviri",
  className = "",
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 text-zinc-400 border border-zinc-800 select-none ${className}`}
      >
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-1 border border-emerald-500/20">
          <Utensils size={24} className="opacity-80" />
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 text-center px-2 line-clamp-1">
          {fallbackText || alt || "TaomUz"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;
