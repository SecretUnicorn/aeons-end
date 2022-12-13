import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Grid, Tooltip, useTheme } from '@mui/material';

import {
  faCalendarCheck,
  faMars,
  faTransgenderAlt,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { dateToGermanString, trimLongTextAfter } from '@/utils/formatters';

import { PrimaryColorCheckbox } from '../Buttons/checkboxes';

type ApplicantRowProps = {
  applicant: any;
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
  const property_type = (applicant: any) => {
    const tooltip = applicant.type_txt;
    let icon;
    switch (applicant.type_nr) {
      case 0:
        icon = 'ETW';
        break;
      case 1:
        icon = 'RH';
        break;
      case 2:
        icon = 'MFH';
        break;
      default:
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

  const address = `${applicant.street} ${applicant.plz}, ${applicant.city}`;

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
      <td>{genderIcon(applicant.gender)}</td>
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
        <a className="unobtrusive-link hover-indicator" href={`tel:${applicant.applicant.phone}`}>
          {applicant.applicant.phone}
        </a>{' '}
        <br />
        <a className="unobtrusive-link hover-indicator" href={`tel:${applicant.applicant.mobile}`}>
          {applicant.applicant.mobile}
        </a>
      </td>
      <td>{property_type(applicant)}</td>
      <td colSpan={3}>
        {applicant.room_min ?? '-'} bis {applicant.room_max ?? '-'}
      </td>
      <td colSpan={3}>
        {applicant.sqm_min ?? '-'} bis {applicant.sqm_max ?? '-'}
      </td>
      {!Object.values(applicant.wishes).includes(true) ||
      !Object.values(applicant.wishes).includes(false) ? (
        <td colSpan={4}>Keine Vorliebe</td>
      ) : (
        <td colSpan={4}>
          <Grid container>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.eg)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.og)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.ph)}
            </Grid>
          </Grid>
        </td>
      )}
      {!Object.values(applicant.wishes).includes(true) ||
      !Object.values(applicant.wishes).includes(false) ? (
        <td colSpan={4}>Keine Vorliebe</td>
      ) : (
        <td colSpan={4}>
          <Grid container>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.eg)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.og)}
            </Grid>
            <Grid item xs={4}>
              {wishIcon(applicant.wishes.ph)}
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
        }).format(applicant.max_price)}
      </td>
      <Tooltip title={applicant.comment}>
        <td style={{ fontSize: 'small' }} colSpan={4}>
          {trimLongTextAfter(applicant.comment, 50)}
        </td>
      </Tooltip>
      <td>
        <Tooltip
          title={applicant.appointment_sent ? 'Einladung wurde schon versendet' : ''}
          arrow
          enterDelay={350}
        >
          <div>
            {' '}
            <FontAwesomeIcon
              size="lg"
              icon={faCalendarCheck}
              color={`rgba(60, 60, 60, ${applicant.appointment_sent ? 1 : 0.08})`}
            />{' '}
          </div>
        </Tooltip>
      </td>
      <td colSpan={2} style={{ fontSize: 'small' }}>
        {dateToGermanString(new Date(applicant.created_at), false)}
      </td>
      <td colSpan={2} style={{ fontSize: 'small' }}>
        {dateToGermanString(new Date(applicant.deleted_at), false)}
      </td>
    </tr>
  );
}

export default ApplicantRow;
