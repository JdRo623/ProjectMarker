import React from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinkHorizontal } from '@vx/shape';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
const bg = '#272b4d';

const tree = {
  "name": "",
  "children": [{
    "name": "Transformación Digital",
    "children": [
      {
        "name": "Basico",
        "children": [ {
          "name": "Actividad 1", "acronimo": "Tendencias tecnológicas recientes aplicadas al negocio"
        },{
          "name": "Actividad 2", "acronimo": "Gobierno Digital y Transformación Digital"
        },{
          "name": "Actividad 1", "acronimo": "Tendencias tecnológicas recientes aplicadas al negocio"
        },{
          "name": "Actividad 1", "acronimo": "Tendencias tecnológicas recientes aplicadas al negocio"
        }
        ]
      },
      {
        "name": "Medio",
        "children": [{
          "name": "Actividad 1", "acronimo":"Analisis, diseño, implementación y pruebas: Metodologías y Estrategias "
        }, {
          "name": "Actividad 2", "acronimo": "Tendencias tecnológicas recientes aplicadas al negocio"
        }, {
          "name": "Actividad 3", "acronimo": "Vigilancia tecnológica y Planeación estratégica en TI "
        }
        ]
      },
      {
        "name": "Alto",
        "children": [{
          "name": "Actividad 1","acronimo": "Tendencias tecnológicas recientes aplicadas al negocio"
        }, {
          "name": "Actividad 2", "acronimo": "Estándares y metodologías de Gestión de Servicios informáticos"
        }, {
          "name": "Actividad 3", "acronimo": "Arquitectura Empresarial y Transformación Digital "
        }, {
          "name": "Actividad 4", "acronimo": "Vigilancia tecnológica y Planeación estratégica en TI "
        }, {
          "name": "Actividad 5", "acronimo": "Gestión de proyectos TI"
        }, {
          "name": "Actividad 6", "acronimo": "Arquitectura Empresarial y Transformación Digital "
        }, {
          "name": "Actividad 7", "acronimo": "Diseño de servicios digitales (Design thinking y experiencia de usuario)"
        }, {
          "name": "Actividad 8", "acronimo": "Arquitectura Empresarial y Transformación Digital"
        }, {
          "name": "Actividad 9", "acronimo": "Administración y Soporte de la Infraestructura: Herramientas y estándares especializados - CLOUD"
        }, {
          "name": "Actividad 10", "acronimo": "Herramientas especializadas para el análisis, diseño, implementación y pruebas de desarrollo de software - Análsis y levantamiento de requerimientos"
        }
        ]
      },
      {
        "name": "Superior",
        "children": [{
          "name": "Actividad 1","acronimo": "Gestión de proyectos TI"
        }, {
          "name": "Actividad 2", "acronimo": "Vigilancia tecnológica y Planeación estratégica en TI "
        }, {
          "name": "Actividad 3", "acronimo": "Transformación Digital: casos de éxito e implementación"
        }
        ]
      }
    ]
  },
  {
    "name": "Análisis de requerimientos, \n necesidades y problemas TI",
    "children": [
      { "name": "B1" },
      { "name": "B2" },
      { "name": "B3" },
    ]
  },
  {
    "name": "Análisis de requerimientos, \n necesidades y problemas TI",
    "children": [
      { "name": "B1" },
      { "name": "B2" },
      { "name": "B3" },
    ]
  },
  {
    "name": "Análisis de requerimientos, \n necesidades y problemas TI",
    "children": [
      { "name": "B1" },
      { "name": "B2" },
      { "name": "B3" },
    ]
  },
  ],
};

function Node({ node }) {
  const width = 120;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={bg}
        stroke={green}
        strokeWidth={1}
        strokeDasharray={'2,2'}
        strokeOpacity={0.6}
        rx={10}
        onClick={() => {
          alert(`clicked: ${JSON.stringify(node.data.acronimo)}`);
        }}
      />
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        fill={green}
        style={{ pointerEvents: 'none' }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode({ node }) {
  return (
    <Group top={node.x} left={node.y}>
      <circle r={12} fill="url('#lg')" />
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={plum}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function ParentNode({ node }) {
  const width = 250;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={bg}
        stroke={blue}
        strokeWidth={1}
        onClick={() => {
          alert(`clicked: ${JSON.stringify(node.data.name)}`);
        }}
      />
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={white}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

export default ({
  width = 1500,
  height = 800,
  margin = {
    top: 10,
    left: 30,
    right: 40,
    bottom: 80
  }
}) => {
  const data = hierarchy(tree);
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  return (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from={peach} to={pink} />
      <rect width={width} height={height} rx={14} fill={bg} />
      <Tree root={data} size={[yMax, xMax]}>
        {tree => {
          return (
            <Group top={margin.top} left={margin.left}>
              {tree.links().map((link, i) => {
                return (
                  <LinkHorizontal
                    key={`link-${i}`}
                    data={link}
                    stroke={lightpurple}
                    strokeWidth="1"
                    fill="none"
                  />
                );
              })}
              {tree.descendants().map((node, i) => {
                return <Node key={`node-${i}`} node={node} />;
              })}
            </Group>
          );
        }}
      </Tree>
    </svg>
  );
};