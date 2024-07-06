import React from "react";
import * as d3 from "d3";
import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";


const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];
const MARGIN_Y = 25;
const MARGIN_X = 5;

// https://github.com/anarion80/sankey-finance/blob/main/sankey-finance.js

const Sankey = ({ data, width, height }) => {
    const allGroups = [...new Set(data.nodes.map((d) => d.category))].sort();
    const colorScale = d3.scaleOrdinal().domain(allGroups).range(COLORS);

    const sankeyGenerator = sankey()
        .nodeWidth(26)
        .nodePadding(10)
        .extent([
            [MARGIN_X, MARGIN_Y],
            [width - MARGIN_X, height - MARGIN_Y],
        ])
        .nodeId((node) => node.name) // Accessor function: how to retrieve the id that defines each node. This id is then used for the source and target props of links
        .nodeAlign(sankeyJustify);

    // Compute nodes and links positions
    const { nodes, links } = sankeyGenerator(data);

    //
    // Draw the nodes
    //
    const allNodes = nodes.map((node) => {
        return (
            <g key={node.index}>
                <rect
                    height={node.y1 - node.y0}
                    width={sankeyGenerator.nodeWidth()}
                    x={node.x0}
                    y={node.y0}
                    stroke={"black"}
                    fill={colorScale(node.category)}
                    fillOpacity={1}
                    rx={0.9}
                />
            </g>
        );
    });

    const allLinks = links.map((link, i) => {
        const linkGenerator = sankeyLinkHorizontal();
        const path = linkGenerator(link);

        return (
            <path
                key={i}
                d={path}
                stroke={colorScale(link.source.category)}
                fill="none"
                strokeOpacity={0.3}
                strokeWidth={link.width}
            />
        );
    });

    const allLabels = nodes.map((node, i) => {
        return (
            <text
                key={i}
                x={node.x1 + 6}
                // x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
                y={(node.y1 + node.y0) / 2}
                dy="0.35rem"
                textAnchor={"start"}
                fontSize={12}
            >
                {node.name}
            </text>
        );
    });

    return (
        <svg width={width} height={height}>
            {allLinks}
            {allNodes}
            {allLabels}
        </svg>
    );
};

export default Sankey;
