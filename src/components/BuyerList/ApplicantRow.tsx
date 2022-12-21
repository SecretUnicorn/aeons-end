import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Grid, Tooltip, useTheme } from '@mui/material';

import {
  faCalendarCheck,
  faMars,
  faTransgenderAlt,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IBuyInterest } from '@/models/buyInterestModels';
import { dateToGermanString, trimLongTextAfter } from '@/utils/formatters';

import { PrimaryColorCheckbox } from '../Buttons/checkboxes';

type ApplicantRowProps = {
  applicant: IBuyInterest;
  markRandom?: boolean;
  idx: number;
  checked: boolean;
  onCheck: (idx: number, checked: boolean) => void;
  info?: any;
};

function ApplicantRow(props: ApplicantRowProps) {
  const applicant = props.applicant;
  const markRandom = props.markRandom;
  const theme = useTheme();
  const { idx, checked, onCheck, info } = props;

  const websiteroot = '/';
  const property_type = (applicant: IBuyInterest) => {
    const tooltip = applicant.category.name;
    let icon;
    switch (applicant.category.id) {
      case 2:
        icon = 'IO';
        break;
      default:
        icon = 'EW';
        break;
    }
    return (
      <Tooltip title={tooltip}>
        <div>{icon}</div>
      </Tooltip>
    );
  };

  //TODO: Type
  const get_reply_color = (applicant: any) => {
    if (applicant.contacted.length > 0) {
      return theme.palette.success;
    } else {
      return 'rgba(60,60,60,0.08)';
    }
  };

  const genderIcon = (gender: 'd' | 'm' | 'w') => {
    let icon = faTransgenderAlt;
    let text = 'Divers';
    switch (gender) {
      case 'm':
        icon = faMars;
        text = 'Männlich';
        break;
      case 'w':
        icon = faVenus;
        text = 'Weiblich';
        break;
      case 'd':
      default:
        break;
    }
    return (
      <Tooltip title={text}>
        <div>
          <FontAwesomeIcon icon={icon} size="1x" transform="grow-8" color="rgb(60, 60, 60)" />
        </div>
      </Tooltip>
    );
  };

  const wishIcon = (bool: boolean) => {
    if (bool) {
      return (
        <Tooltip title="Wunsch geäußert">
          <TaskAltIcon color="success" />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Keine Angabe">
          <TaskAltIcon color="inherit" style={{ color: 'rgba(80,80,80,0.15)' }} />
        </Tooltip>
      );
    }
  };

  const wishes = {
    eg: applicant.wants_ground_floor,
    og: applicant.wants_upstairs,
    ph: applicant.wants_penthouse,
  };

  console.log({ wishes });

  const address = `${applicant.street} ${applicant.zip}, ${applicant.city}`;

  return (
    <tr
      onClick={() => onCheck(idx, !checked)}
      style={markRandom ? { boxShadow: 'inset 1px 1px 20px #2684c4' } : {}}
    >
      <td>
        <PrimaryColorCheckbox
          style={{ padding: 0 }}
          size="medium"
          checked={checked}
          onChange={(event, value) => onCheck(idx, value)}
        />
      </td>
      <td>{property_type(applicant)}</td>
      <td>{genderIcon(applicant.salutation)}</td>
      <td colSpan={3}>
        {applicant.last_name}, {applicant.first_name}
      </td>
      <td>{applicant.id}</td>
      <td
        colSpan={4}
        style={{
          fontSize: 'small',
          wordWrap: 'break-word',
          padding: '0px 2px',
        }}
      >
        <Tooltip title={address.length >= 45 ? address : ''}>
          <span>{trimLongTextAfter(address, 45)}</span>
        </Tooltip>
      </td>
      <td
        colSpan={3}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ fontSize: 'small' }}
      >
        <a className="unobtrusive-link" href={`mailto:${applicant.applicant.email}`}>
          {applicant.applicant.email}
        </a>
      </td>
      <td
        colSpan={3}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ fontSize: 'small' }}
      >
        <a className="unobtrusive-link hover-indicator" href={`tel:${applicant.telephone_number}`}>
          {applicant.telephone_number}
        </a>{' '}
        <br />
        <a className="unobtrusive-link hover-indicator" href={`tel:${applicant.mobile_number}`}>
          {applicant.mobile_number}
        </a>
      </td>

      {applicant.category.id == 1 ? (
        <td colSpan={3}>
          {applicant.room_from ?? '-'} bis {applicant.room_to ?? '-'}
        </td>
      ) : (
        <td colSpan={3}>- bis -</td>
      )}
      {applicant.category.id == 1 ? (
        <td colSpan={3}>
          {applicant.space_from ?? '-'} bis {applicant.space_to ?? '-'}
        </td>
      ) : (
        <td colSpan={3}>- bis -</td>
      )}

      {!Object.values(wishes).includes(true) || !Object.values(wishes).includes(false) ? (
        <td colSpan={4}>Keine Vorliebe</td>
      ) : (
        <td colSpan={4}>
          <Grid container>
            <Grid item xs={4}>
              {wishIcon(true)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(wishes.og)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(wishes.ph)}
            </Grid>
          </Grid>
        </td>
      )}
      <td colSpan={3}>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          //@ts-ignore
          trailingZeroDisplay: 'stripIfInteger',
        }).format(applicant.purchase_price)}
      </td>
      <Tooltip title={applicant.comment}>
        <td style={{ fontSize: 'small' }} colSpan={4}>
          {trimLongTextAfter(applicant.comment ?? '', 50)}
        </td>
      </Tooltip>
      <td>
        {/* TODO: Add Appointment */}
        <Tooltip
          title={applicant.id == 0 ? 'Einladung wurde schon versendet' : ''}
          arrow
          enterDelay={350}
        >
          <div>
            {' '}
            <FontAwesomeIcon
              size="lg"
              icon={faCalendarCheck}
              color={`rgba(60, 60, 60, ${applicant.id == 0 ? 1 : 0.08})`}
            />{' '}
          </div>
        </Tooltip>
      </td>
      <td colSpan={2} style={{ fontSize: 'small' }}>
        {dateToGermanString(new Date(applicant.last_edited), false)}
      </td>
      <td colSpan={2} style={{ fontSize: 'small' }}>
        {dateToGermanString(new Date(applicant.last_edited), false)}
      </td>
    </tr>
  );
}

export default ApplicantRow;
