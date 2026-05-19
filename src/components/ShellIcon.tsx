type Props = { size?: number; className?: string };

export default function ShellIcon({ size = 32, className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 20 5.5 Q 13.5 5.5, 9.5 8.5 Q 5 13, 4.5 21 Q 4.3 26.5, 6 30.5 Q 7 30, 7.6 31 Q 8.6 30, 9.4 31 Q 10.4 30, 11.2 31 Q 12.2 30, 13 31 Q 14 30, 14.8 31.2 Q 15.8 30, 16.6 31.4 Q 17.6 30, 18.4 31.5 Q 19.4 30, 20 31.6 Q 20.6 30, 21.6 31.5 Q 22.4 30, 23.4 31.4 Q 24.2 30, 25.2 31.2 Q 26 30, 27 31 Q 27.8 30, 28.8 31 Q 29.6 30, 30.6 31 Q 31.4 30, 32.4 31 Q 33 30, 34 30.5 Q 35.7 26.5, 35.5 21 Q 35 13, 30.5 8.5 Q 26.5 5.5, 20 5.5 Z" />
      <path d="M 20 6.2 L 7.4 29.5" />
      <path d="M 20 6.2 L 10.5 30.4" />
      <path d="M 20 6.2 L 13.5 30.9" />
      <path d="M 20 6.2 L 16.6 31.3" />
      <path d="M 20 6.2 L 20 31.5" strokeWidth="1.1" />
      <path d="M 20 6.2 L 23.4 31.3" />
      <path d="M 20 6.2 L 26.5 30.9" />
      <path d="M 20 6.2 L 29.5 30.4" />
      <path d="M 20 6.2 L 32.6 29.5" />
      <path d="M 20 6.5 L 9 27" opacity=".5" />
      <path d="M 20 6.5 L 12 29" opacity=".5" />
      <path d="M 20 6.5 L 15 30.5" opacity=".5" />
      <path d="M 20 6.5 L 18.3 31.2" opacity=".5" />
      <path d="M 20 6.5 L 21.7 31.2" opacity=".5" />
      <path d="M 20 6.5 L 25 30.5" opacity=".5" />
      <path d="M 20 6.5 L 28 29" opacity=".5" />
      <path d="M 20 6.5 L 31 27" opacity=".5" />
      <path d="M 16 7 Q 20 4, 24 7" />
      <path d="M 17.5 6.2 Q 20 5.4, 22.5 6.2" opacity=".6" />
    </svg>
  );
}
