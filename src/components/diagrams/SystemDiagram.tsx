import Image from "next/image";
import logoMark from "../../../public/images/brand/izeyx-logomark-dark.png";

type Node = { label: string };

type SystemDiagramProps = {
  inputs: Node[];
  outputs: Node[];
  coreLabel?: string;
  caption: string;
  className?: string;
};

const ARTBOARD = {
  width: 760,
  height: 520,
  nodeWidth: 190,
  nodeHeight: 56,
  leftX: 20,
  rightX: 550,
  hubX: 315,
  hubY: 190,
  hubWidth: 130,
  hubHeight: 140,
} as const;

function distribute(count: number, start: number, end: number) {
  if (count <= 1) return [(start + end) / 2];
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, index) => start + index * step);
}

function MobileList({ nodes }: { nodes: Node[] }) {
  return (
    <ul className="mx-auto flex max-w-sm flex-wrap justify-center gap-2">
      {nodes.map((node) => (
        <li
          key={node.label}
          className="flex min-h-11 min-w-[calc(50%-0.25rem)] flex-1 items-center justify-center rounded-sm border border-border bg-surface px-3 py-2 text-center text-sm font-medium text-foreground"
        >
          {node.label}
        </li>
      ))}
    </ul>
  );
}

export function SystemDiagram({ inputs, outputs, coreLabel = "IZEYX", caption, className = "" }: SystemDiagramProps) {
  const inputCentres = distribute(inputs.length, 48, 472);
  const outputCentres = distribute(outputs.length, 48, 472);
  const inputPorts = distribute(inputs.length, 214, 306);
  const outputPorts = distribute(outputs.length, 222, 298);

  return (
    <figure className={`system-diagram m-0 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${ARTBOARD.width} ${ARTBOARD.height}`}
        className="system-diagram-artwork mx-auto h-auto w-full max-w-3xl overflow-visible"
      >
        <g
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.62"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          {inputCentres.map((y, index) => (
            <path
              key={`input-path-${index}`}
              d={`M ${ARTBOARD.leftX + ARTBOARD.nodeWidth} ${y} C 266 ${y}, 270 ${inputPorts[index]}, ${ARTBOARD.hubX} ${inputPorts[index]}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {outputCentres.map((y, index) => (
            <path
              key={`output-path-${index}`}
              d={`M ${ARTBOARD.hubX + ARTBOARD.hubWidth} ${outputPorts[index]} C 490 ${outputPorts[index]}, 494 ${y}, ${ARTBOARD.rightX} ${y}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {inputs.map((node, index) => (
          <g key={`input-node-${node.label}`}>
            <rect
              x={ARTBOARD.leftX}
              y={inputCentres[index] - ARTBOARD.nodeHeight / 2}
              width={ARTBOARD.nodeWidth}
              height={ARTBOARD.nodeHeight}
              rx="3"
              fill="var(--surface)"
              stroke="var(--border)"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={ARTBOARD.leftX + ARTBOARD.nodeWidth / 2}
              y={inputCentres[index]}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
              fontSize="16"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}

        <g>
          <rect
            x={ARTBOARD.hubX}
            y={ARTBOARD.hubY}
            width={ARTBOARD.hubWidth}
            height={ARTBOARD.hubHeight}
            rx="4"
            fill="var(--primary)"
          />
          <image href={logoMark.src} x="365" y="211" width="30" height="30" />
          <text
            x="380"
            y="268"
            textAnchor="middle"
            fill="var(--on-primary)"
            fontFamily="var(--font-sans)"
            fontSize="17"
            fontWeight="600"
            letterSpacing="1"
          >
            {coreLabel}
          </text>
          <text
            x="380"
            y="292"
            textAnchor="middle"
            fill="var(--on-primary)"
            fillOpacity="0.76"
            fontFamily="var(--font-sans)"
            fontSize="11"
          >
            Integration layer
          </text>
        </g>

        {outputs.map((node, index) => (
          <g key={`output-node-${node.label}`}>
            <rect
              x={ARTBOARD.rightX}
              y={outputCentres[index] - ARTBOARD.nodeHeight / 2}
              width={ARTBOARD.nodeWidth}
              height={ARTBOARD.nodeHeight}
              rx="3"
              fill="var(--surface)"
              stroke="var(--border)"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={ARTBOARD.rightX + ARTBOARD.nodeWidth / 2}
              y={outputCentres[index]}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--foreground)"
              fontFamily="var(--font-sans)"
              fontSize="16"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="system-diagram-mobile">
        <p className="label mb-3 text-center text-muted-soft">Existing systems</p>
        <MobileList nodes={inputs} />
        <div aria-hidden="true" className="mx-auto h-6 w-px bg-primary" />
        <div className="mx-auto flex min-h-24 w-44 flex-col items-center justify-center rounded-sm bg-primary px-4 text-center text-on-primary">
          <Image src={logoMark} alt="" width={24} height={24} className="mb-2 h-6 w-6 object-contain" />
          <span className="text-sm font-semibold tracking-[0.06em]">{coreLabel}</span>
          <span className="mt-1 text-xs text-white/75">Integration layer</span>
        </div>
        <div aria-hidden="true" className="mx-auto h-6 w-px bg-primary" />
        <p className="label mb-3 text-center text-muted-soft">Connected outcomes</p>
        <MobileList nodes={outputs} />
      </div>

      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
