type StyleSize = 'sm' | 'md' | 'lg'

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