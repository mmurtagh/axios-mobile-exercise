type StyleSize = 'sm' | 'md' | 'lg'

/** 
 * @name: spacing
 * @description: Gets spacing values depending on size paramter
 * @param size: The size of the spacing; sm, md, or lg
*/
export function spacing(size: StyleSize = 'md') {
  const defaultSpacing = 10;

  let value;
  switch (size) {
    case 'sm':
      value = 0.5 * defaultSpacing;
      break;
    case 'lg':
      value = 1.5 * defaultSpacing;
      break;
    default:
      value = defaultSpacing;
      break;
  }

  return `${value}px`;
}

/** 
 * @name: fontSize
 * @description: Gets fontSize values depending on size paramter
 * @param size: The size of the font; sm, md, or lg
*/
export function fontSize (size: StyleSize = 'md') {
  let value;
  switch (size) {
    case 'sm':
      value = '12px';
      break;
    case 'lg':
      value = '24px';
      break;
    default:
      value = '16px';
      break;
  }

  return value;
}

export const fontColor = '#444';
export const backdropColor = '#d3d3d3';
export const surfaceColor = '#fff';
export const primary = '#0096c7';
