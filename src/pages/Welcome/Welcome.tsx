import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import useCounter from '@/store/counter';

import muiLogo from './logos/mui.svg';
import pwaLogo from './logos/pwa.svg';
import reactLogo from './logos/react_ed.svg';
import recoilLogo from './logos/recoil.svg';
import rrLogo from './logos/rr.svg';
import tsLogo from './logos/ts.svg';
import viteLogo from './logos/vite.svg';
import { Image } from './styled';

function Welcome() {
  const isPortrait = useOrientation();
  const [counter, actions] = useCounter();

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <span>{counter}</span>
        <button onClick={actions.increase}>Plus</button>
        <button onClick={actions.decrease}>minus</button>
        <button onClick={actions.reset}>reset</button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
