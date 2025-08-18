import React from 'react';

interface CalloutProps {
  type: 'info' | 'tip' | 'best-practice';
  children: React.ReactNode;
}

export default function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: {
      light: 'bg-blue-50 border-l-4 border-blue-500 text-blue-800 dark:bg-blue-950/30 dark:border-blue-400 dark:text-blue-200',
      icon: '💡',
    },
    tip: {
      light: 'bg-green-50 border-l-4 border-green-500 text-green-800 dark:bg-green-950/30 dark:border-green-400 dark:text-green-200',
      icon: '✨',
    },
    'best-practice': {
      light: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-400 dark:text-yellow-200',
      icon: '⭐',
    },
  };

  const typeLabels = {
    info: 'Info',
    tip: 'Tip',
    'best-practice': 'Best Practice',
  };

  // fallback if type is invalid
  const style = styles[type] || styles.info;
  const label = typeLabels[type] || "Info";

  return (
    <div 
      className={`my-4 p-4 rounded-r-md transition-colors duration-200 ${style.light}`} 
      role="alert"
    >
      <div className="flex items-center gap-2 font-semibold mb-2">
        <span className="text-lg" aria-hidden="true">{style.icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
