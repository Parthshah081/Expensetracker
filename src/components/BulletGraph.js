import React from 'react';

const BulletGraph = ({ width, height, value, target, ranges }) => {
  // Calculate width of each range based on the provided ranges
  const totalWidth = width - 20; // Subtract 20 for padding
  const rangeWidth = totalWidth / ranges.length;

  return (
    <svg width={width} height={height}>
      {/* Render ranges */}
      {ranges.map((range, index) => (
        <rect
          key={index}
          x={index * rangeWidth}
          y={height / 3}
          width={rangeWidth}
          height={height / 3}
          fill={range.color}
        />
      ))}
      
      {/* Render target line */}
      <line
        x1={(target / value) * totalWidth}
        y1={0}
        x2={(target / value) * totalWidth}
        y2={height}
        stroke="black"
      />
      
      {/* Render value */}
      <circle cx={(value / target) * totalWidth} cy={height / 2} r={5} fill="blue" />
    </svg>
  );
};

export default BulletGraph;
