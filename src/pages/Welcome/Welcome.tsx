import { useEffect, useState } from 'react';

import SendAppointmentDialog from '@/components/Dialogs/SendAppointmentDialog';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import useCounter from '@/store/counter';

import { Image } from './styled';

function Welcome() {
  const isPortrait = useOrientation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('now');

    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    <>
      <Meta title="Übersicht" />
      <SendAppointmentDialog
        onClose={() => setOpen(false)}
        open={open}
        recipients={[]}
        selectedValue=""
      />
      <button onClick={() => setOpen(true)}>Plus</button>
    </>
  );
}

export default Welcome;
