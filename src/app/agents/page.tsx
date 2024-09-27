import React from 'react'

const AgentDiagram: React.FC = () => {
  const colors = {
    background: '#111',
    border: '#F0B90B',
    text: '#FFFFFF',
    highlight: '#F0B90B',
    agent: 'rgba(240, 185, 11, 0.1)',
  }

  const BoxComponent: React.FC<{ x: number; y: number; width: number; height: number; text: string; fontSize?: number }> = ({ x, y, width, height, text, fontSize = 12 }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke={colors.border}
        strokeWidth={2}
        rx={5}
        ry={5}
      />
      <foreignObject x={x} y={y} width={width} height={height}>
        <div xmlns="http://www.w3.org/1999/xhtml" className="h-full w-full flex items-center justify-center">
          <p className="text-center px-2" style={{ fontSize: `${fontSize}px`, color: colors.text }}>
            {text}
          </p>
        </div>
      </foreignObject>
    </g>
  )

  const Arrow: React.FC<{ start: [number, number]; end: [number, number] }> = ({ start, end }) => (
    <line
      x1={start[0]}
      y1={start[1]}
      x2={end[0]}
      y2={end[1]}
      stroke={colors.border}
      strokeWidth={2}
      markerEnd="url(#arrowhead)"
    />
  )

  return (
    <div className="w-full bg-[#111] overflow-hidden flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#F0B90B] text-center p-4">
        AI Agent Architecture: Bridging Thought and Action
      </h1>
      <div className="w-full h-[80vh] relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          style={{ background: colors.background }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={colors.border} />
            </marker>
          </defs>

          {/* Agent box */}
          <rect x="100" y="100" width="600" height="400" fill={colors.agent} stroke={colors.border} strokeWidth={2} strokeDasharray="5,5" rx={10} ry={10} />
          <text x="120" y="130" fill={colors.highlight} fontSize={20} fontWeight="bold">Agent</text>

          {/* Components inside Agent */}
          <BoxComponent x={300} y={150} width={200} height={60} text="Eyes and ears" />
          <BoxComponent x={200} y={250} width={180} height={60} text="Planning and reasoning" />
          <BoxComponent x={420} y={250} width={240} height={60} text="Finetuned and specialized LLM" />
          <BoxComponent x={300} y={350} width={200} height={60} text="Memory" />
          <BoxComponent x={300} y={420} width={200} height={60} text="Actions: Hands" />

          {/* External components */}
          <BoxComponent x={100} y={20} width={200} height={60} text="Events and callbacks" />
          <BoxComponent x={500} y={20} width={200} height={60} text="Search APIs and web content pages" fontSize={11} />
          <BoxComponent x={20} y={250} width={160} height={60} text="Specialized prompts" />
          <BoxComponent x={20} y={350} width={160} height={60} text="Finetuning for CoT" />
          <BoxComponent x={620} y={250} width={160} height={60} text="Long term: vector database for knowledge embeddings" fontSize={10} />
          <BoxComponent x={620} y={350} width={160} height={60} text="Short term: context and conversation history" fontSize={10} />
          <BoxComponent x={100} y={520} width={280} height={60} text="Function calls to web services" />
          <BoxComponent x={420} y={520} width={280} height={60} text="Function calls to local apps" />

          {/* Arrows */}
          <Arrow start={[200, 80]} end={[300, 150]} />
          <Arrow start={[600, 80]} end={[500, 150]} />
          <Arrow start={[180, 280]} end={[200, 280]} />
          <Arrow start={[180, 380]} end={[200, 380]} />
          <Arrow start={[620, 280]} end={[600, 280]} />
          <Arrow start={[620, 380]} end={[600, 380]} />
          <Arrow start={[400, 210]} end={[400, 250]} />
          <Arrow start={[400, 310]} end={[400, 350]} />
          <Arrow start={[400, 410]} end={[400, 420]} />
          <Arrow start={[400, 480]} end={[400, 520]} />
          <Arrow start={[240, 520]} end={[240, 480]} />
          <Arrow start={[560, 520]} end={[560, 480]} />
        </svg>
      </div>
    </div>
  )
}

export default function AgentArchitecture() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="bg-[#111] p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#F0B90B]">生</div>
        <div className="flex items-center space-x-4">
          <button className="text-[#F0B90B] hover:text-[#D4A309]">About</button>
          <button className="text-[#F0B90B] hover:text-[#D4A309]">Contact</button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center">
        <AgentDiagram />
        <div className="mt-4 text-center">
          <button className="bg-[#F0B90B] text-black px-6 py-2 rounded-md hover:bg-[#D4A309] transition-colors">
            Learn More
          </button>
        </div>
      </main>
    </div>
  )
}