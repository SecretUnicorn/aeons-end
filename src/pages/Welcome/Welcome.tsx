import { useEffect, useState } from 'react';

import BuyerList from '@/components/BuyerList/BuyerList';
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
      <BuyerList />
    </>
  );
}

export default Welcome;
