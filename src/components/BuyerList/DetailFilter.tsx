import React, { useState } from 'react';
import { NumberFormatBase, NumberFormatBaseProps } from 'react-number-format';

import AccessibleIcon from '@mui/icons-material/Accessible';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';

import BalconyIcon from 'static/icons/balcony-icon.svg';
import GroundFloorIcon from 'static/icons/ground-floor-icon.svg';

function NumberFormatCustom(
  props: NumberFormatBaseProps & { inputRef: any; onChange: (arg0: any) => void },
) {
  const { inputRef, onChange, value, ...other } = props;
  return (
    <NumberFormatBase
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      value={value}
      //@ts-ignore
      thousandSeparator="."
      decimalSeparator={','}
      isNumericString
      suffix=" €"
    />
  );
}

type FilterByTypeProps = {
  type: 'citeria' | 'input' | 'dropdown' | 'number' | 'range' | 'bool';
  value: any;
  onChange: (arg0: any) => void;
  label: string;
  removeFilter: () => void;
  extra: any;
  name: string;
};

const FilterByType = (props: FilterByTypeProps) => {
  const { type, value, onChange, label, removeFilter, extra, name } = props;

  const handleChange = (n: string, newValue: any) => {
    if (n.indexOf('.') > -1) {
      const [key, subKey] = n.split('.');
      onChange({
        name: name.toLowerCase(),
        value: {
          ...value,
          [subKey]: newValue,
        },
      });
    } else {
      onChange({
        name: name.toLowerCase(),
        value: {
          [n]: newValue,
        },
      });
    }
  };

  switch (type) {
    case 'input':
      return (
        <Grid
          container
          alignItems="center"
          sx={{
            height: '3.5em',
            pl: 1,
            pr: 1,
            border: '1.5px solid',
            borderColor: 'primary.main',
            position: 'relative',
          }}
        >
          <Grid item sx={{ mr: 1 }}>
            <Typography>{label}:</Typography>
          </Grid>

          <Grid item>
            <TextField
              value={value}
              margin="none"
              size="small"
              onChange={(e) => {
                handleChange('value', e.target.value);
              }}
              fullWidth={false}
              InputProps={{
                style: { width: '120px' },
                endAdornment: <InputAdornment position="end">{extra.suffix}</InputAdornment>,
              }}
            />
          </Grid>
          <DeleteForeverIcon
            sx={{
              color: 'primary.main',
              '&:hover': { color: 'red' },
              top: 0,
              right: 0,
              transform: 'translateY(-50%) translateX(50%)',
              backgroundColor: 'white',
              position: 'absolute',
            }}
            onClick={removeFilter}
          />
        </Grid>
      );
    case 'dropdown':
      return <TextField value={value} onChange={onChange} />;
    case 'number':
      return (
        <Grid
          container
          alignItems="center"
          sx={{
            pl: 1,
            pr: 1,
            border: '1.5px solid',
            borderColor: 'primary.main',
            position: 'relative',
          }}
        >
          <Grid item>
            <Typography>{label}:</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleChange('value.bigger', !value?.bigger)}>
              {value?.bigger ? '≥' : '≤'}
            </IconButton>
          </Grid>
          <Grid item>
            <TextField
              value={value.compare ? value.compare : 0}
              onChange={(e) => {
                handleChange('value.compare', e.target.value);
              }}
              name="numberformat"
              margin="none"
              size="small"
            />
          </Grid>
          <DeleteForeverIcon
            sx={{
              color: 'primary.main',
              '&:hover': { color: 'red' },
              top: 0,
              right: 0,
              transform: 'translateY(-50%) translateX(50%)',
              backgroundColor: 'white',
              position: 'absolute',
            }}
            onClick={removeFilter}
          />
        </Grid>
      );
    case 'range':
      return (
        <Grid
          container
          alignItems="center"
          sx={{
            height: '3.5em',
            pl: 1,
            pr: 1,
            border: '1.5px solid',
            borderColor: 'primary.main',
            position: 'relative',
          }}
        >
          <Grid item xs={'auto'}>
            <Typography sx={{ mr: 1 }}>{label}:</Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent={'space-around'} xs>
            <Grid item xs={5}>
              <TextField
                value={value.min}
                size="small"
                onChange={(e) => handleChange('value.min', e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Grid>
            <Grid item xs={'auto'}>
              <Typography sx={{ mr: 1, ml: 1 }}>&#8212;</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={value.max}
                size="small"
                onChange={(e) => handleChange('value.max', e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Grid>
          </Grid>
          <DeleteForeverIcon
            sx={{
              color: 'primary.main',
              '&:hover': { color: 'red' },
              top: 0,
              right: 0,
              transform: 'translateY(-50%) translateX(50%)',
              backgroundColor: 'white',
              position: 'absolute',
            }}
            onClick={removeFilter}
          />
        </Grid>
      );
    case 'bool':
      return (
        <Grid
          container
          alignItems="center"
          sx={{
            height: '3.5em',
            pl: 1,
            pr: 1,
            border: '1.5px solid',
            borderColor: 'primary.main',
            position: 'relative',
          }}
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={!!value}
                  onChange={() => handleChange('value', !value)}
                />
              }
              label={label}
            />
          </Grid>
          <DeleteForeverIcon
            sx={{
              color: 'primary.main',
              '&:hover': { color: 'red' },
              top: 0,
              right: 0,
              transform: 'translateY(-50%) translateX(50%)',
              backgroundColor: 'white',
              position: 'absolute',
            }}
            onClick={removeFilter}
          />
        </Grid>
      );
    case 'citeria': {
      const criteria_icons = extra.options;

      return (
        <div style={{ position: 'relative' }}>
          <Grid
            container
            alignItems="stretch"
            sx={{
              height: '3.5em',
              pl: 1,
              pr: 1,
              border: '1.5px solid',
              borderColor: 'primary.main',
            }}
          >
            <Grid item container alignItems={'center'} spacing={1}>
              {criteria_icons.map((c: any) => (
                <Grid
                  item
                  container
                  spacing={1}
                  alignItems="center"
                  key={c.name}
                  sx={{ width: 'auto' }}
                >
                  <Grid item>{c.icon}</Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      value={value[c.name]}
                      size="small"
                      exclusive
                      onChange={(e, newValue) => {
                        handleChange(`value.${c.name}`, newValue);
                      }}
                      sx={{
                        '& .MuiToggleButton-root.Mui-selected': {
                          backgroundColor: 'rgba(104, 195, 225, 0.3)',
                        },
                      }}
                    >
                      <Tooltip title="Hat das Kriterium nicht">
                        <ToggleButton color="primary" value={false}>
                          <CancelIcon
                            sx={{
                              color: value[c.name] === false ? 'error.main' : 'gray[500]',
                            }}
                          />
                        </ToggleButton>
                      </Tooltip>
                      <Tooltip title="Filter inaktiv">
                        <ToggleButton color="primary" value="">
                          {value[c.name] === null ? (
                            <RadioButtonCheckedIcon sx={{ color: 'primary.main' }} />
                          ) : (
                            <RadioButtonUncheckedIcon sx={{ color: 'gray[500]' }} />
                          )}
                        </ToggleButton>
                      </Tooltip>
                      <Tooltip title="Hat das Kriterium">
                        <ToggleButton color="primary" value={true}>
                          <CheckCircleIcon
                            sx={{
                              color: value[c.name] === true ? 'success.main' : 'gray[500]',
                            }}
                          />
                        </ToggleButton>
                      </Tooltip>
                    </ToggleButtonGroup>
                  </Grid>

                  <Grid item>
                    <Divider flexItem orientation="vertical" />
                  </Grid>
                </Grid>
              ))}

              {/*
                    <Grid item><FormControlLabel sx={{ p: 0 }} control={<Checkbox checked={value.balcony} color='primary' name="balcony" onChange={() => handleChange("value.balcony", !value.balcony)} />} label={<img className={classes.imageIcon} src={BalconyIcon} />} /></Grid>
                    <Grid item><FormControlLabel sx={{ p: 0 }} control={<Checkbox checked={value.groundFloor} color='primary' name="groundFloor" onChange={() => handleChange("value.groundFloor", !value.groundFloor)}  />} label={<img className={classes.imageIcon} src={GroundFloorIcon} />} /></Grid>
                    <Grid item><FormControlLabel sx={{ p: 0, mr: 0 }} control={<Checkbox checked={value.accessible} color='primary' name="accessible" onChange={() => handleChange("value.accessible", !value.accessible)}  />} label={} /></Grid>
                     */}
            </Grid>
          </Grid>
          <DeleteForeverIcon
            sx={{
              color: 'primary.main',
              '&:hover': { color: 'red' },
              top: 0,
              right: 0,
              transform: 'translateY(-50%) translateX(50%)',
              backgroundColor: 'white',
              position: 'absolute',
            }}
            onClick={removeFilter}
          />
        </div>
      );
    }
  }
};

function DetailFilter({
  filter,
  onFilterChange,
  addFilter,
  removeFilter,
}: {
  filter: any;
  onFilterChange: (arg0: { value: any; name: string }) => void;
  addFilter: (arg0: object) => void;
  removeFilter: (arg0: object) => void;
}) {
  const availableFilter = {
    sqm: {
      label: 'Wohnfläche',
      type: 'input',
      default: 0,
      extra: { suffix: 'm²' },
    },
    zimmer: {
      label: 'Zimmeranzahl',
      type: 'input',
      default: 0,
      extra: { suffix: 'Zimmer' },
    },
    preis: {
      label: 'Kaufpreis Obergrenze',
      type: 'input',
      default: 0,
      extra: { suffix: '€' },
    },
    wisheslocation: {
      label: 'Präferierte Lage des Käufers',
      type: 'citeria',
      default: { groundFloor: null, topFloor: null, penthouse: null },
      extra: {
        options: [
          {
            icon: (
              <Tooltip title="Präferiert Erdgeschoss">
                <span>EG</span>
              </Tooltip>
            ),
            name: 'groundFloor',
          },
          {
            icon: (
              <Tooltip title="Präferiert Oberschoss">
                <span>OG</span>
              </Tooltip>
            ),
            name: 'topFloor',
          },
          {
            icon: (
              <Tooltip title="Präferiert Penthouse">
                <span>PH</span>
              </Tooltip>
            ),
            name: 'penthouse',
          },
        ],
      },
    },
    wishesstate: {
      label: 'Zustand des Hauses',
      type: 'citeria',
      default: { new: null, reno: null, noreno: null },
      extra: {
        options: [
          {
            icon: (
              <Tooltip title="Kaufinteresse an Neubau">
                <span>NEU</span>
              </Tooltip>
            ),
            name: 'new',
          },
          {
            icon: (
              <Tooltip title="Kaufinteresse an Sanierung">
                <span>SAN</span>
              </Tooltip>
            ),
            name: 'reno',
          },
          {
            icon: (
              <Tooltip title="Kaufinteresse an Unsaniert">
                <span>UNS</span>
              </Tooltip>
            ),
            name: 'noreno',
          },
        ],
      },
    },
    neubau: {
      type: 'bool',
      default: true,
      label: 'Kaufersinteresse an Neubau',
    },
    renovierung: {
      type: 'bool',
      default: true,
      label: 'Kaufersinteresse an Sanierung',
    },
    angeschrieben: {
      label: 'Käufer wurde angeschrieben',
      type: 'bool',
      default: true,
    },
  } as {
    [key: string]: any;
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const openAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuClick = (filterName: object) => {
    console.log(filterName);
    addFilter(filterName);
    handleClose();
  };
  return (
    <Grid container spacing={1} alignItems="center" sx={{ width: '98vw', pl: 0.5, mb: 2 }}>
      <Grid item xs={12}>
        <Divider flexItem />
      </Grid>
      <Grid item sx={{ ml: 1 }}>
        <Typography>Kriterien:</Typography>
      </Grid>
      {filter.map((f: any) => (
        <Grid item key={f.key}>
          <FilterByType
            type={availableFilter[f.key as string].type}
            value={f.value}
            onChange={onFilterChange}
            label={
              availableFilter[f.key as string].label ?? `${f.key[0].toUpperCase()}${f.key.slice(1)}`
            }
            name={f.key}
            removeFilter={() => removeFilter(f)}
            extra={f.extra}
          />
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={openAdd}>
          <AddCircleIcon />
        </IconButton>
        <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          {Object.entries(availableFilter)
            .filter(([k, v], idx) => filter.filter((f: any) => f.key === k).length === 0)
            .map(([k, v], index) => (
              <MenuItem
                key={k}
                onClick={(event) => onMenuClick({ key: k, value: v.default, extra: v.extra })}
              >
                {v.label ?? `${k[0].toUpperCase()}${k.slice(1)}`}
              </MenuItem>
            ))}
        </Menu>
      </Grid>
      <Grid item xs={12}>
        <Divider flexItem />
      </Grid>
    </Grid>
  );
}

export default DetailFilter;
