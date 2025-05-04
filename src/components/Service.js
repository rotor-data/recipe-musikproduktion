import * as React from "react";
import { Tooltip } from "react-tooltip";
import MarkdownRenderer from "./MarkdownRenderer";

const rotation = (index, name, defaultRotation = 0) => {
  const nameLength = name.length;
  const maxDeviation = 30; // Maximum deviation from the default rotation

  // Calculate step based on name length: shorter names have smaller steps
  const step = (maxDeviation / 10) * (nameLength - 1); // Adjust 10 to change sensitivity
  
  // Apply step to default rotation
  let angle = defaultRotation + step;

  // Ensure the angle stays within the deviation range
  if (angle > defaultRotation + maxDeviation) angle = defaultRotation + maxDeviation;
  if (angle < defaultRotation - maxDeviation) angle = defaultRotation - maxDeviation;

  // Alternate between left and right
  return (index % 3 === 0) ? angle : -angle;
};



const Service = ({ tooltip, name, index }) => {
  const radius = 50; // Radius of the circle
  const size = (radius + 10) * 2;
  const padding = 20; // Extra space for stroke and filters

  return (
    <>
      <Tooltip 
      anchorSelect={`.service-${index}`} 
      place="top" 
      offset={20}
      opacity={1} 
      className="speechbubble-tooltip"
      data-tooltip-class-name="speechbubble-tooltip-inner"
      defaultIsOpen={false}
      

      >
        <MarkdownRenderer markdown={tooltip} />
      </Tooltip>

      <div className="service-container">
        <svg className="service-coin" width="160" height="160" viewBox={`0 0 ${size + padding * 2} ${size + padding * 2}`}>
          <defs>
            <path
              id={`circlePath-${index}`}
              d={`M ${padding + size / 2}, ${padding + size / 2}
                  m -${radius}, 0
                  a ${radius},${radius} 0 1,1 ${2 * radius},0
                  a ${radius},${radius} 0 1,1 -${2 * radius},0`}
            />
            <filter id="extrude" x="-50%" y="-50%" width="200%" height="200%">
              <feConvolveMatrix order="3,3" kernelMatrix="
                  1 0 0 
                  0 1 0
                  0 0 1" in="SourceGraphic" result="BEVEL_10" />
              <feOffset dx="4" dy="4" in="BEVEL_10" result="BEVEL_20" />
              <feComposite operator="out" in="BEVEL_20" in2="BEVEL_10" result="BEVEL_30" />
              <feFlood floodColor="#54acb0" result="COLOR" />
              <feComposite in="COLOR" in2="BEVEL_30" operator="in" result="BEVEL_40" />
              <feMerge result="BEVEL_50">
                <feMergeNode in="BEVEL_40" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="inset-shadow">
              <feOffset dx="3" dy="0" />
              <feGaussianBlur stdDeviation="5" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="dark-gray" floodOpacity="1" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
            <mask id={`highlight-mask-${index}`}>
              
              <path transform="translate(140,20), rotate(90,0,0)" fill="white" d="M 50 0 A 50 50 0 0 0 14.6 14.6 L 28.79 28.79 A 30 30 0 0 1 50 20 Z"></path> 
            </mask>
            
          </defs>

          <circle
            className={`service-${index}`}
            cx={padding + size / 2}
            cy={padding + size / 2}
            r={radius + 10}
            fill="#e070be"
            stroke="#f1faee"
            strokeWidth="3px"
            filter="url(#extrude)"
          />
            <circle
            cx={padding + size / 2  }
            cy={padding + size / 2  }
            r={radius + 10}
            fill="#e070be"
            filter="url(#inset-shadow)"
          />
          <g transform={`rotate(${rotation(index, name)}, ${padding + size / 2}, ${padding + size / 2})`}>
           <g className="hover-rotate">
            <g transform="rotate(-90, 80, 80)">
            <text
              fill="#f1faee"
              style={{ letterSpacing: '1.3px' }}
              className="is-family-secondary is-size-6 has-text-weight-bold"
              textAnchor="middle"
            
            >
              <textPath href={`#circlePath-${index}`} startOffset="50%" alignmentBaseline="hanging">
                {name}
              </textPath>
            </text>
            </g>
            <g
          
            >
            <path
              d="M51.48,24.34c-1.74-.84-3.37-1.67-5.03-2.41-6.93-3.07-13.65-2.74-19.92,1.63-4.32,3.01-6.71,7.17-6.7,12.58.02,12.54,0,25.08,0,37.62,0,1.81-.03,1.83-1.8,1.83-5.46,0-10.92,0-16.37,0-1.55,0-1.64-.08-1.64-1.62C.01,52.31.02,30.64,0,8.98c0-.93.27-1.53,1.11-2.01C4.76,4.87,8.37,2.7,11.99.57c.28-.17.59-.29,1.15-.57,1.02,3.9,2,7.68,3,11.52,1.43-1.68,2.69-3.38,4.19-4.85,3.84-3.76,8.54-5.7,13.87-6.14,4.55-.38,9.1-.2,13.49,1.07,2.03.59,3.88,1.83,5.76,2.88.37.21.73.9.68,1.31-.75,5.99-1.56,11.97-2.37,17.95-.02.15-.13.29-.28.6Z"
              fill="#e53eb2"
              transform={`translate(${padding + size / 2 -10 }, ${padding + size / 2 -12 }) scale(0.5) rotate(0, 0 ,0 )`}
            />
            </g>
          </g>
          </g>
          <circle
            className={`service-${index}`}
            cx={padding + size / 2}
            cy={padding + size / 2}
            r={radius + 10}
            fill="transparent"
          />
          <circle
            className={`service-${index}`}
            cx={padding + size / 2 }
            cy={padding + size / 2 }
            r={radius + 10}
            fill="rgba(255, 255, 255, 0.2)"
            mask={`url(#highlight-mask-${index})`}
          />
        </svg>
      </div>
    </>
  );
};

export default Service;
