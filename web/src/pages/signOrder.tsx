import { theme } from '@chakra-ui/react';

import Canvas from '@components/Canvas';

export function SignOrder() {
  return (
    <Canvas
      style={{
        background: theme.colors.gray[300],
        height: window.innerHeight,
        width: window.innerWidth,
      }}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  );
}
