const path = require('path')
const fs = require('fs-plus')
const cheerio = require('cheerio')
const upperCamelCase = require('uppercamelcase')

const root = process.cwd()
const iconsComponentPath = path.join(root, 'icons')
const iconsIndexPath = path.join(root, 'index.js')
const typesPath = path.join(root, 'types.d.ts')
const indexDtsPath = path.join(root, 'index.d.ts')
const uniconsConfig = require('@iconscout/unicons/json/line.json')

fs.removeSync(iconsComponentPath)
fs.mkdirSync(iconsComponentPath)

const sharedTypes = `import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: string | number;
}
`
fs.writeFileSync(typesPath, sharedTypes, 'utf-8')

const indexJs = []
const indexDts = []

uniconsConfig.forEach((icon) => {
  const baseName = `uil-${icon.name}`
  const jsLocation = path.join(iconsComponentPath, `${baseName}.js`)
  const dtsLocation = path.join(iconsComponentPath, `${baseName}.d.ts`)
  const name = upperCamelCase(baseName)
  const svgFile = fs.readFileSync(
    path.resolve('node_modules/@iconscout/unicons', icon.svg),
    'utf-8'
  )

  let data = svgFile.replace(/<svg[^>]+>/gi, '').replace(/<\/svg>/gi, '')
  const $ = cheerio.load(data, { xmlMode: true })
  const svgPath = $('path').attr('d')

  const jsTemplate = `import React from 'react';
import PropTypes from 'prop-types';

const ${name} = ({ color = 'currentColor', size = 24, ...otherProps }) =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: color,
      ...otherProps
    },
    React.createElement('path', { d: '${svgPath}' })
  );

${name}.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ${name};`

  const dtsTemplate = `import { FC } from 'react';
import { IconProps } from '../types';

declare const ${name}: FC<IconProps>;
export default ${name};
`

  fs.writeFileSync(jsLocation, jsTemplate, 'utf-8')
  fs.writeFileSync(dtsLocation, dtsTemplate, 'utf-8')

  indexJs.push(`export { default as ${name} } from './icons/${baseName}'`)
  indexDts.push(`export { default as ${name} } from './icons/${baseName}'`)
})

fs.writeFileSync(iconsIndexPath, indexJs.join('\n'), 'utf-8')
fs.writeFileSync(indexDtsPath, indexDts.join('\n') + '\n', 'utf-8')

console.log(`Generated ${uniconsConfig.length} icon components with TypeScript declarations.`)
