import { useEffect } from 'react';
import { speak } from './utils.js';

const paths = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
  cards: <><rect x="3" y="7" width="13" height="14" rx="2.5" /><path d="M8 3h10a3 3 0 0 1 3 3v10" /><path d="M7 12h5M7 16h3" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M8 7h8M8 11h5" /></>,
  pen: <><path d="m12 19 7-7 3 3-7 7-3-3Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
  bookmark: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />,
  flame: <path d="M12 22c4.4 0 7-2.8 7-6.5 0-2.6-1.5-4.6-3.2-6.2-.8-.8-1.8-1.7-2.3-3.3-2.7 1.6-3.4 4.1-2.7 6.1-1.2-.2-2.1-1-2.6-2.1C6.9 11.4 5 13.1 5 15.5 5 19.2 7.6 22 12 22Z" />,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  left: <path d="m15 18-6-6 6-6" />,
  right: <path d="m9 18 6-6-6-6" />,
  down: <path d="m6 9 6 6 6-6" />,
  volume: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></>,
  check: <path d="m4.5 12.5 5 5L20 6.5" />,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.04V3h4v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.96 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" /></>,
  sparkle: <><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  rotate: <><path d="M3 12a9 9 0 0 1 15.2-6.5L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16" /><path d="M3 21v-5h5" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  hide: <><path d="M3 3l18 18" /><path d="M10.6 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.8M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.8-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  trophy: <><path d="M8 21h8M12 17v4" /><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" /><path d="M7 6H3v2a4 4 0 0 0 4 4M17 6h4v2a4 4 0 0 1-4 4" /></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /><path d="M10 11v5M14 11v5" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" /></>,
  headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  leaf: <><path d="M20 4c-9 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-6 8-16Z" /><path d="M4 21c0-5 3-9 9-12" /></>,
};

export function Icon({ name, size = 22, strokeWidth = 1.8, filled = false }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.sparkle}
    </svg>
  );
}

export function ProgressRing({ value = 0, size = 96, stroke = 8, children }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  );
}

export function ScreenHeader({ eyebrow, title, sub, right }) {
  return (
    <header className="screen-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {sub && <p className="screen-sub">{sub}</p>}
      </div>
      {right}
    </header>
  );
}

export function Segmented({ options, value, onChange, ariaLabel = '切换视图' }) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={value === option.value ? 'segment active' : 'segment'}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {typeof option.count === 'number' && <span className="segment-count">{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Chip({ children, active = false, onClick, className = '' }) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`chip ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}

export function SpeakButton({ text, label, small = false, className = '' }) {
  return (
    <button
      type="button"
      className={`speak-button ${label ? 'has-label' : ''} ${small ? 'small' : ''} ${className}`}
      onClick={(event) => {
        event.stopPropagation();
        speak(text);
      }}
      aria-label={label || `朗读 ${text}`}
    >
      <Icon name="volume" size={small ? 15 : 18} />
      {label && <span>{label}</span>}
    </button>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {action}
    </div>
  );
}

export function Sheet({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <div
        className={`sheet ${wide ? 'wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-grab" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ icon = 'leaf', title, children, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icon name={icon} size={28} /></div>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function LevelBadge({ children, tone = 'green' }) {
  return <span className={`level-badge ${tone}`}>{children}</span>;
}
