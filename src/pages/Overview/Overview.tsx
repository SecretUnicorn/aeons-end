import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import useCounter from '@/store/counter';

const Welcome: React.FC<React.PropsWithChildren<unknown>> = () => {
  const isPortrait = useOrientation();
  const [counter, actions] = useCounter();

  return (
    <>
      <Meta title="Übersicht" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <span>{counter}</span>
      </FullSizeCenteredFlexBox>
    </>
  );
};

export default Welcome;
