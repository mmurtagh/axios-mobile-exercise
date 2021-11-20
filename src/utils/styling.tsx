export function spacing(size: 'sm' | 'md' | 'lg' = 'md') {
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
