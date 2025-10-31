import React from "react";

function Button({ 
  name, 
  onClick, 
  variant = "default", 
  icon: Icon, 
  size = "md", 
  className = "" // allow custom classes
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition font-medium";

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    border: "border border-primary text-primary bg-white hover:bg-primary hover:text-white",
    ghost: "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // ✅ If `size` is custom class (like 'px-8 py-3'), use that
  const sizeClasses = sizes[size] || size;

  const finalClass = `${baseStyles} ${variants[variant]} ${sizeClasses} ${className}`;

  return (
    <button
      onClick={variant === "ghost" ? undefined : onClick}
      disabled={variant === "ghost"}
      className={finalClass}
    >
      {Icon && <Icon size={20} className="mr-2" />}
      {name}
    </button>
  );
}

export default Button;
