import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

import {
  faExclamationTriangle,
  faQuestionCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

import { default_inserts, default_texts } from '@/config';

import { BetterSwitch } from '../styled';
import { VariablesInsert } from './VariableInsert';

const parseDigits = (string: string) => (string.match(/\d+/g) || []).join('');

const CustomDialog = styled(Dialog)({
  '&	.MuiDialog-paper': {
    zIndex: 90,
  },
});

const PreviewDialog = styled(Dialog)({
  '&	.MuiDialog-paper': {
    zIndex: 99,
    backgroundColor: 'rgb(240,240,240)',
  },
});

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    backgroundColor: 'white !important',
    color: 'black',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid black',
  },
}));

const formatDate = (string: string) => {
  const digits = parseDigits(string);
  const chars = digits.split('');
  return chars
    .reduce((r, v, index) => (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`), '')
    .substr(0, 10);
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  head: {
    backgroundColor: '#406a86',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));
//const StyledTableCell = styled(TableCell)(({theme}) => ({}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#e8e8e8',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

interface SendAppointmentDialogProps {
  onClose: (arg0: any) => void;
  selectedValue?: any;
  open: boolean;
  recipients: any[];
}

interface BaseState {
  date: string | null;
  time: DateTime | null;
  duration: number | null;
  location: string | null;
}

function SendAppointmentDialog(props: SendAppointmentDialogProps) {
  const { onClose, selectedValue, open, recipients } = props;
  const name = 'sendMail';

  const [state, setState] = useState<BaseState>({
    date: '',
    time: DateTime.fromObject({}, { zone: 'Europe/Berlin' }),
    duration: 45,
    location: '',
  });
  const [html, setHtml] = useState(EditorState.createEmpty());
  const [isAppointment, setIsAppointment] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  //{row.givenName} {row.surname}
  const initial_preview_state = { givenName: '', surname: '' };
  const [previewApplicant, setPreviewApplicant] = useState(initial_preview_state);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [preview, setPreview] = useState('<span>Hi</span>');
  const [containsDate, setContainsDate] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setIsAppointment(false);
    return () => {
      setIsAppointment(false);
    };
  }, [open]);

  useEffect(() => {
    const termin_elements = ['{termin_datum}', '{termin_uhrzeit}'];
    const raw_html = draftToHtml(convertToRaw(html.getCurrentContent()));
    setContainsDate(!termin_elements.every((i) => raw_html.indexOf(i) == -1));
  }, [html]);

  const preview_mail = (recipient: any) => {
    setPreviewApplicant(recipient);
    setPreviewOpen(true);
    setPreviewLoading(true);
    /* apiClient
      .previewMail(
        recipient.snr,
        draftToHtml(convertToRaw(html.getCurrentContent())),
        state.date,
        state.time,
        state.duration,
        state.location,
        firmen_nr,
        winr,
        hsnr,
        wgnr
      )
      .then((response) => {
        setPreviewLoading(false);
        setPreview(response.data);
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setPreview(`
         <i style="color:red;">${e.response.data}</i>
         `);
        } else {
          setPreview(`
      <i style="color:red;">Fehler bei der Genierierung der E-Mail-Vorschau</i>
      `);
        }
        setPreviewLoading(false);
      }); */
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setTimeout(() => setPreviewApplicant(initial_preview_state), 200);
  };

  const dropdowns = [
    {
      buttonLabel: 'Vorgefertigte Texte',
      type: 'replace',
      options: default_texts,
    },
    {
      buttonLabel: 'Variable einfügen',
      type: 'insert',
      options: default_inserts,
    },
  ];

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      date: event.target.value,
    });
  };

  const handleAbort = () => {
    onClose({
      state,
      name,
      wasAbort: true,
    });
  };

  const handleClose = () => {
    onClose({
      state,
      name,
      wasAbort: true,
    });
  };

  const handleConfirm = () => {
    onClose({
      state,
      html,
      files: files.map((f) => f.baseFile),
      name: isAppointment ? 'sendAppointment' : name,
      wasAbort: false,
    });
  };

  const handleChange = (editorState: EditorState) => {
    setHtml(editorState);
  };

  const onTimeChange = (value: DateTime | null) => {
    setState({
      ...state,
      time: value,
    });
  };

  const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      location: event.target.value,
    });
  };

  const defaultDurations = [15, 30, 45, 60, 90];

  type UploadedFile = {
    content?: any;
    baseFile: File;
  };
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const add_file = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw_files = event.target.files;
    if (raw_files === null) return;
    for (let i = 0; i < raw_files!.length; i++) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        setFiles([...files, { content: e.target?.result, baseFile: raw_files[i] }]);
      });
      reader.readAsDataURL(raw_files[i]);
    }
  };

  const currentSize = files.reduce((prev, f) => prev + f.baseFile.size, 0);
  const B2MB = (b: number) => Math.round(b * Math.pow(10, -6) * 100) / 100;
  const inputEl = useRef<HTMLInputElement>(null);

  const [sender, setSender] = React.useState<number>(0);

  const handleEmailSentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSender(parseInt(event.target.value));
  };

  return (
    <CustomDialog
      open={open}
      maxWidth="xl"
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Mail versenden</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Geben Sie den Text ein, welcher an die Bewerber geschickt werden soll.
          <br />
          <small>
            <i>
              Alle sich in geschwungenen Klammern befindende Wörter werden automatisch durch die
              Daten der angeschriebenen Mieter ersetzt!
            </i>
          </small>
        </DialogContentText>
        <PreviewDialog
          open={previewOpen}
          onClose={closePreview}
          aria-labelledby="preview-dialog-title"
          aria-describedby="preview-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="preview-dialog-title">
            Vorschau für Mail an &quot;{previewApplicant.surname} {previewApplicant.givenName}&quot;
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="preview-dialog-description">
              <Grid container>
                <Grid item xs={true}>
                  {previewLoading ? (
                    <CircularProgress />
                  ) : (
                    <div className="email-preview">{parse(preview)}</div>
                  )}
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button variant="outlined" onClick={closePreview} color="inherit">
                Schließen
              </Button>
            </DialogActions>
          </DialogContent>
        </PreviewDialog>
        <Grid container direction="row" style={{ marginBottom: '2em' }}>
          <Grid item container direction="column" style={{ marginBottom: '1em' }} xs={12}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">E-Mail</StyledTableCell>
                    <StyledTableCell align="right">Vorschau</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipients &&
                    recipients.length > 0 &&
                    recipients.map((row) => (
                      <StyledTableRow key={row.snr}>
                        <StyledTableCell component="th" scope="row">
                          {row.first_name} {row.last_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.applicant.email}</StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton onClick={() => preview_mail(row)}>
                            <VisibilityIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item container spacing={2}>
            <Grid
              item
              container
              xs={12}
              spacing={1}
              md={5}
              lg={3}
              justifyContent="space-between"
              direction="column"
            >
              <Grid item container spacing={0.5} alignItems="center">
                <Grid item>
                  <FormControlLabel
                    control={
                      <BetterSwitch
                        value={isAppointment}
                        onChange={() => setIsAppointment(!isAppointment)}
                        color="primary"
                      />
                    }
                    label={
                      <h1
                        className="dialogHeader"
                        style={{
                          color: isAppointment ? theme.palette.primary.main : 'rgb(80, 80, 80)',
                          width: '100%',
                        }}
                      >
                        Termin E-Mail
                      </h1>
                    }
                    labelPlacement="end"
                  />
                </Grid>
                {containsDate && !isAppointment && (
                  <Tooltip title="Der Text enthält ein Termindatum aber es handelt sich um keine Termineinladung!">
                    <Grid item style={{ fontSize: 'large' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} color="rgb(230,0,0)" />
                    </Grid>
                  </Tooltip>
                )}
              </Grid>
              <Divider />
              <Grid
                container
                item
                direction="column"
                style={{
                  backgroundColor: isAppointment ? 'white' : 'rgb(240,240,240)',
                  padding: '0.5rem',
                }}
              >
                <Grid item container direction="column">
                  <Grid item>
                    <h1 className={`dialogHeader ${!isAppointment ? 'dialogHeader-disabled' : ''}`}>
                      1. Datum auswählen
                    </h1>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="appointment-date"
                      label="Tag des Termins"
                      type="date"
                      error={!state.date && isAppointment}
                      style={{ minWidth: '100%' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={!isAppointment}
                      value={state.date}
                      onChange={onDateChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="column">
                  <Grid item>
                    <h1 className={`dialogHeader ${!isAppointment ? 'dialogHeader-disabled' : ''}`}>
                      2. Startzeit auswählen
                    </h1>
                  </Grid>
                  <Grid item>
                    <DesktopTimePicker
                      value={state.time}
                      onChange={(value, _) => onTimeChange(value)}
                      disabled={!isAppointment}
                      mask="__:__"
                      InputAdornmentProps={{ position: 'start' }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          fullWidth
                          disabled={!isAppointment}
                          variant="outlined"
                          InputProps={{
                            ...props.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setState({ ...state, time: null })}
                                  disabled={!isAppointment}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      ampm={false}
                      minutesStep={5}
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="row" justifyContent="space-around" spacing={1}>
                  <Grid item xs={12}>
                    <h1 className={`dialogHeader ${!isAppointment ? 'dialogHeader-disabled' : ''}`}>
                      3. Länge auswählen
                    </h1>
                  </Grid>
                  {defaultDurations.map((duration) => (
                    <Grid
                      item
                      container
                      key={duration}
                      xs={true}
                      justifyContent="center"
                      spacing={1}
                    >
                      <Grid item xs={true}>
                        <Button
                          variant={state.duration == duration ? 'contained' : 'outlined'}
                          size="small"
                          onClick={() => setState({ ...state, duration })}
                          disabled={!isAppointment}
                          sx={{ width: '100%', textTransform: 'none' }}
                        >
                          {duration} Min
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      onChange={(event) =>
                        setState({
                          ...state,
                          duration: parseInt(event.target.value),
                        })
                      }
                      label="Länge des Termins"
                      disabled={!isAppointment}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">Minuten</InputAdornment>,
                        inputProps: {
                          style: { textAlign: 'right' },
                        },
                      }}
                      value={state.duration}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip
                      placement="bottom-start"
                      arrow
                      title={
                        'Wenn dieses Feld leer gelassen wird, wird die Hausadresse als Treffpunkt gewählt'
                      }
                    >
                      <h1
                        className={`dialogHeader ${!isAppointment ? 'dialogHeader-disabled' : ''}`}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        4. Abweichender Treffpunkt
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          size="xs"
                          style={{ marginLeft: '0.3em' }}
                        />
                      </h1>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Adresse des Treffpunkts"
                      value={state.location}
                      onChange={onLocationChange}
                      disabled={!isAppointment}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid item container alignItems="center">
                <Grid item xs>
                  <label htmlFor="uploadfile">
                    <Button component="span">Dateien hinzufügen</Button>
                  </label>
                  <input
                    id="uploadfile"
                    accept="image/*,.pdf"
                    ref={inputEl}
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={add_file}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      color: 5 - B2MB(currentSize) < 0 ? 'error.main' : 'primary.main.contrastText',
                    }}
                  >
                    {5 - B2MB(currentSize) >= 0
                      ? `${Math.round((5 - B2MB(currentSize)) * 100) / 100} MB verbleibend`
                      : `Dateien zu groß! (${B2MB(currentSize)}mb)`}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      inputEl.current!.value = '';
                      setFiles([]);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item container>
                {files.map((f, idx) => (
                  <Grid
                    item
                    key={`file-${idx}`}
                    container
                    direction="column"
                    justifyContent={'center'}
                    xs={12}
                    sx={{
                      boxShadow: '0px 0px 15px rgba(0,0,0,0.35)',
                      mt: idx !== 0 ? theme.spacing(0.75) : 0,
                      mb: idx !== files.length - 1 ? theme.spacing(0.75) : 0,
                    }}
                  >
                    <Grid item>
                      <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {f.baseFile.name}
                      </Typography>
                    </Grid>
                    <Divider flexItem />
                    <Grid item>
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontSize: 'caption.fontSize',
                        }}
                      >
                        {B2MB(f.baseFile.size)}mb
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container direction="column" item xs={true}>
              <Grid item container spacing={2}>
                <Grid item xs={6} sx={{ pb: 2 }}>
                  <TextField variant="outlined" fullWidth label="Abweichender Betreff" />
                </Grid>
                <Grid item xs={6} sx={{ pb: 2 }}>
                  <TextField
                    select
                    fullWidth
                    value={sender}
                    label="Sender"
                    onChange={handleEmailSentChange}
                  >
                    <MenuItem value={0}>
                      <em>Angemeldeter Nutzer</em>
                    </MenuItem>
                    <MenuItem value={1}>Immobilienvertrieb-Verteiler</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid item xs>
                <Editor
                  spellCheck
                  editorState={html}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={
                    handleChange /*...default_inserts.map(d => <VariablesInsert type={'insert'} {...d} />), ...default_html_inserts.map(d => <VariablesInsert type={'html_insert'} {...d} />)*/
                  }
                  toolbarCustomButtons={[
                    ...default_texts.map((d, idx) => (
                      <VariablesInsert key={idx} type={'replace'} {...d} />
                    )),
                  ]}
                  toolbar={{
                    options: ['inline', 'blockType', 'list', 'fontSize', 'textAlign', 'history'],
                    inline: {
                      options: ['bold', 'italic', 'underline'],
                      bold: { className: 'bordered-option-classname' },
                      italic: { className: 'bordered-option-classname' },
                      underline: { className: 'bordered-option-classname' },
                    },
                    list: { inDropdown: true },
                    blockType: {
                      className: 'bordered-option-classname',
                    },
                    fontSize: {
                      className: 'bordered-option-classname',
                    },
                    textAlign: { inDropdown: true },
                    history: {},
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <Button variant="outlined" onClick={handleAbort} color="inherit">
            Abbrechen
          </Button>
          <Tooltip
            placement="top"
            title={
              (containsDate && !isAppointment) || (isAppointment && state.date === '')
                ? 'Datum fehlt!'
                : ''
            }
          >
            <div>
              <Button
                variant="outlined"
                disabled={
                  5 - B2MB(currentSize) < 0 ||
                  (containsDate && !isAppointment) ||
                  (isAppointment && !state.date)
                }
                onClick={handleConfirm}
                color="primary"
              >
                Senden
              </Button>
            </div>
          </Tooltip>
        </DialogActions>
      </DialogContent>
    </CustomDialog>
  );
}

SendAppointmentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  recipients: PropTypes.array.isRequired,
};

export default SendAppointmentDialog;
