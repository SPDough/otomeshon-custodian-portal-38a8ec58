import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Box, Typography, Chip, alpha } from "@mui/material";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  description: string;
  group: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  label: string;
}

interface KnowledgeGraphVisualizationProps {
  onNodeSelect: (node: GraphNode | null) => void;
}

const nodes: GraphNode[] = [
  { id: "financial-instrument", label: "Financial Instrument", type: "Core Concept", description: "Contract giving rise to financial asset/liability", group: 0 },
  { id: "equity", label: "Equity", type: "Security", description: "Ownership interest in an entity", group: 0 },
  { id: "bond", label: "Bond", type: "Security", description: "Fixed income debt instrument", group: 0 },
  { id: "derivative", label: "Derivative", type: "Security", description: "Contract deriving value from underlying asset", group: 0 },
  { id: "legal-entity", label: "Legal Entity", type: "Organization", description: "Legally constituted entity", group: 1 },
  { id: "issuer", label: "Issuer", type: "Organization", description: "Entity that issues securities", group: 1 },
  { id: "custodian", label: "Custodian", type: "Organization", description: "Entity holding securities in custody", group: 1 },
  { id: "portfolio", label: "Portfolio", type: "Collection", description: "Collection of financial instruments", group: 2 },
  { id: "benchmark", label: "Benchmark", type: "Reference", description: "Standard for measuring performance", group: 2 },
  { id: "market", label: "Market", type: "Context", description: "Venue for trading instruments", group: 3 },
  { id: "regulator", label: "Regulator", type: "Authority", description: "Regulatory oversight body", group: 3 },
  { id: "risk-metric", label: "Risk Metric", type: "Measure", description: "Quantitative risk assessment", group: 4 },
  { id: "settlement", label: "Settlement", type: "Process", description: "Trade settlement process", group: 4 },
];

const links: GraphLink[] = [
  { source: "financial-instrument", target: "equity", label: "includes" },
  { source: "financial-instrument", target: "bond", label: "includes" },
  { source: "financial-instrument", target: "derivative", label: "includes" },
  { source: "issuer", target: "financial-instrument", label: "issues" },
  { source: "custodian", target: "financial-instrument", label: "holds" },
  { source: "legal-entity", target: "issuer", label: "acts-as" },
  { source: "legal-entity", target: "custodian", label: "acts-as" },
  { source: "portfolio", target: "equity", label: "contains" },
  { source: "portfolio", target: "bond", label: "contains" },
  { source: "portfolio", target: "derivative", label: "contains" },
  { source: "portfolio", target: "benchmark", label: "benchmarked-against" },
  { source: "market", target: "financial-instrument", label: "trades" },
  { source: "regulator", target: "market", label: "oversees" },
  { source: "regulator", target: "legal-entity", label: "regulates" },
  { source: "risk-metric", target: "portfolio", label: "measures" },
  { source: "settlement", target: "market", label: "clears-through" },
];

const groupColors = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#c62828"];

const KnowledgeGraphVisualization = ({ onNodeSelect }: KnowledgeGraphVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: Math.max(entry.contentRect.height, 500),
        });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = dimensions;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    // Simulation
    const sim = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Links
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    // Link labels
    const linkLabel = g.append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .text((d) => d.label)
      .attr("font-size", 9)
      .attr("fill", "#999")
      .attr("text-anchor", "middle")
      .attr("dy", -4);

    // Nodes
    const node = g.append("g")
      .selectAll<SVGGElement, GraphNode>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node.append("circle")
      .attr("r", (d) => (d.id === "financial-instrument" || d.id === "portfolio" ? 24 : 18))
      .attr("fill", (d) => groupColors[d.group % groupColors.length])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    node.append("text")
      .text((d) => d.label)
      .attr("font-size", 10)
      .attr("font-weight", 500)
      .attr("text-anchor", "middle")
      .attr("dy", 32)
      .attr("fill", "#333");

    // Hover + click
    node.on("mouseover", function () {
      d3.select(this).select("circle").transition().duration(150).attr("stroke-width", 4).attr("opacity", 1);
    }).on("mouseout", function () {
      d3.select(this).select("circle").transition().duration(150).attr("stroke-width", 2).attr("opacity", 0.9);
    }).on("click", (_, d) => {
      onNodeSelect(d);
    });

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => { sim.stop(); };
  }, [dimensions, onNodeSelect]);

  return (
    <Box ref={containerRef} sx={{ width: "100%", height: 500, position: "relative" }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
      {/* Legend */}
      <Box sx={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {["Core Concept", "Organization", "Collection", "Context", "Measure"].map((label, i) => (
          <Chip
            key={label}
            label={label}
            size="small"
            sx={{
              bgcolor: alpha(groupColors[i], 0.12),
              color: groupColors[i],
              fontWeight: 500,
              fontSize: "0.7rem",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default KnowledgeGraphVisualization;
