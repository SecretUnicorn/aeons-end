import { Checkbox, styled } from '@mui/material';

export const WhiteCheckbox = styled(Checkbox)({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },

  checked: {},
});

export const PrimaryColorCheckbox = styled(Checkbox)(({ theme }) => ({
  root: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: 'primary.main',
    },
  },
  checked: {},
}));
