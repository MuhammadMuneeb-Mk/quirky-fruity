// Wavy line where two section colours meet.
// position="top": sits above the section it's placed in, filled with that section's colour.
// position="bottom": sits inside the bottom of a section, filled with the colour below it.
const CURVES = [
  'M0 26 C 150 6 300 44 450 26 S 750 6 900 26 S 1100 42 1200 22',
  'M0 20 C 200 42 380 6 600 22 S 1000 42 1200 14',
  'M0 30 C 120 12 260 10 400 26 S 680 44 820 24 S 1080 6 1200 28',
]

const WaveEdge = ({ color, position = 'top', variant = 0 }) => {
  const curve = CURVES[variant % CURVES.length]
  return (
    <svg
      className={`wave-edge wave-edge--${position}`}
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ '--wave-color': color }}
    >
      <path className="wave-edge__fill" d={`${curve} V48 H0 Z`} />
      <path className="wave-edge__line" d={curve} />
    </svg>
  )
}

export default WaveEdge
