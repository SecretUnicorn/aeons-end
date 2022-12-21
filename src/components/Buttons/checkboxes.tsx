import { Checkbox, CheckboxProps } from '@mui/material';
import { styled } from '@mui/system';

export const WhiteCheckbox = styled(Checkbox, { skipVariantsResolver: true })(({ theme }) => ({
  '&.Mui-checked': {
    color: 'white',
  },
  '&.MuiCheckbox-indeterminate': {
    color: 'white',
  },
  color: 'white',
}));

export const PrimaryColorCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));
