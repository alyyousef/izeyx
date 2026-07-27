import Image from "next/image";
import appIcon from "../../app/icon.png";

type Node = { label: string };

type SystemDiagramProps = {
  inputs: Node[];
  outputs: Node[];
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
  hubCenterX: 380,
  hubCenterY: 260,
  hubRadius: 54,
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

export function SystemDiagram({ inputs, outputs, caption, className = "" }: SystemDiagramProps) {
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
              d={`M ${ARTBOARD.leftX + ARTBOARD.nodeWidth} ${y} C 266 ${y}, 270 ${inputPorts[index]}, ${ARTBOARD.hubCenterX - ARTBOARD.hubRadius} ${inputPorts[index]}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {outputCentres.map((y, index) => (
            <path
              key={`output-path-${index}`}
              d={`M ${ARTBOARD.hubCenterX + ARTBOARD.hubRadius} ${outputPorts[index]} C 490 ${outputPorts[index]}, 494 ${y}, ${ARTBOARD.rightX} ${y}`}
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
          <circle
            cx={ARTBOARD.hubCenterX}
            cy={ARTBOARD.hubCenterY}
            r={ARTBOARD.hubRadius}
            fill="var(--primary)"
          />
          <image
            href={appIcon.src}
            x={ARTBOARD.hubCenterX - 22}
            y={ARTBOARD.hubCenterY - 22}
            width="44"
            height="44"
          />
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
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary">
          <Image src={appIcon} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
        </div>
        <div aria-hidden="true" className="mx-auto h-6 w-px bg-primary" />
        <p className="label mb-3 text-center text-muted-soft">Connected outcomes</p>
        <MobileList nodes={outputs} />
      </div>

      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
