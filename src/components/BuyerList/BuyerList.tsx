import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import MessageIcon from '@mui/icons-material/Message';
import { Grid, Tooltip } from '@mui/material';

import { WhiteCheckbox } from '../Buttons/checkboxes';
import SendAppointmentDialog from '../Dialogs/SendAppointmentDialog';
import { ColorButton } from '../styled';
import ApplicantRow from './ApplicantRow';
import DetailFilter from './DetailFilter';

const STANDINS = [
  {
    applicant: {
      id: 1,
      email: 'SehrLange@TolleEmail.de',
      phone: '+49 123456789',
      mobile: '+49 0176 123456789',
    },
    id: 1,
    first_name: 'Alex',
    last_name: 'Testemann',
    gender: 'd',
    street: 'Testweg 123',
    plz: 11111,
    city: 'Test',

    type_nr: 0,
    type_txt: 'Eigentumswohnung',
    room_min: 4,
    room_max: 9,
    sqm_min: 15,
    sqm_max: 270,
    max_price: 200000,
    comment:
      'Dies ist ein toller langer Kommentar zum testen der maximalen Länge des Kommentarfeldes. Deshalb stehen hier noch so einige Zeichen drinnnen.',
    wishes: {
      eg: false,
      og: true,
      ph: false,
    },
    created_at: '2022-10-13T10:49:40.279Z',
    deleted_at: '2023-09-13T10:49:40.279Z',
    contacted: [
      {
        created: '2022-11-13T15:50+00Z',
        by: { first_name: 'Moritz', last_name: 'Gentz' },
        content: 'Dies ist eine Test Nachricht',
      },
    ],
  },
  {
    applicant: {
      id: 2,
      email: 'EineNochVielLängere@TolleEmail.de',
      phone: '+49 123456789',
      mobile: '+49 0176 123456789',
    },
    id: 2,
    first_name: 'Maria',
    last_name: 'Musterfrau',
    gender: 'w',
    street: 'Wacholderbeeren Weg 304f',
    plz: 222222,
    city: 'Berlin von der Höhe',
    type_nr: 2,
    type_txt: 'Mehrfamilienhaus',
    room_min: null,
    room_max: null,
    sqm_min: null,
    sqm_max: null,
    max_price: 1200000,
    comment:
      'Dies ist ein toller langer Kommentar zum testen der maximalen Länge des Kommentarfeldes. Deshalb stehen hier noch so einige Zeichen drinnnen.',
    wishes: {
      eg: false,
      og: false,
      ph: false,
    },
    created_at: '2022-10-13T10:49:40.279Z',
    deleted_at: '2023-09-13T10:49:40.279Z',
    contacted: [],
  },
  {
    applicant: {
      id: 3,
      email: 'info@8gm.de',
      phone: '+49 6131 611 711',
      mobile: '',
    },
    id: 3,
    first_name: 'Moritz',
    last_name: 'Gentz',
    gender: 'm',
    street: 'Lebnizstraße 31',
    plz: 55116,
    city: 'Mainz',

    type_nr: 1,
    type_txt: 'Reihenhaus',
    room_min: 3,
    room_max: 6,
    sqm_min: 100,
    sqm_max: 150,
    max_price: 750000,
    comment: 'Dies ist ein kurzer Kommentar',
    wishes: {
      eg: false,
      og: false,
      ph: false,
    },
    created_at: '2022-10-13T10:49:40.279Z',
    deleted_at: '2023-09-13T10:49:40.279Z',
    contacted: [],
  },
];

function BuyerList() {
  const [selection, setSelection] = useState(Array(STANDINS.length).fill(false));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState<bool>(false);

  const check_amount = () => selection.filter((x) => x).length;

  const onMassCheck = () => {
    setSelection(Array(STANDINS.length).fill(!!selection.includes(false)));
  };

  //TODO: Type
  const check = (idx: number, value: any) => {
    const changed = [...selection];
    changed[idx] = value;
    setSelection(changed);
    if (value) {
      setSelectedApplicants([...selectedApplicants, STANDINS[idx]]);
    } else setSelectedApplicants(selectedApplicants.filter((a: any) => a.id !== STANDINS[idx].id));
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const [detailFilter, setFilter] = useState<any[]>([]);

  const add_filter = (filter: any) => {
    setFilter([...detailFilter, filter]);
  };

  const remove_filter = (filter: any) => {
    setFilter(detailFilter.filter((f) => f.key !== filter.key));
  };

  const onFilterChange = (e: { value: any; name: string }) => {
    if (Object.keys(e.value).includes('value')) {
      setFilter(
        detailFilter.map((f) => {
          if (f.key !== e.name) return f;
          return {
            ...f,
            ...e.value,
          };
        }),
      );
    } else {
      setFilter(
        detailFilter.map((f) => {
          if (f.key !== e.name) return f;
          return {
            ...f,
            value: { ...e.value },
          };
        }),
      );
    }
  };

  return (
    <>
      <SendAppointmentDialog
        open={dialogOpen}
        recipients={selectedApplicants}
        onClose={onDialogClose}
      />
      <DetailFilter
        filter={detailFilter}
        addFilter={add_filter}
        removeFilter={remove_filter}
        onFilterChange={onFilterChange}
      />
      <table className="applicant-table" style={{ marginBottom: '5em' }}>
        <thead>
          <tr>
            <th colSpan={43}>
              <div className="table-actions">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {check_amount()}/{selection.length} ausgewählt
                </div>
                <div className="vertical-seperator">&nbsp;</div>
                <div>
                  <ColorButton
                    variant="outlined"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setDialogOpen(true);
                    }}
                    className="action-button"
                    disabled={check_amount() === 0}
                  >
                    {check_amount()} Interessent(en) anschreiben
                  </ColorButton>
                </div>
              </div>
            </th>
          </tr>
          <tr className="legende nohover">
            <th className="square-td">
              <WhiteCheckbox
                style={{ padding: 0 }}
                size="medium"
                checked={!selection.includes(false)}
                onChange={onMassCheck}
                indeterminate={selection.includes(true) && selection.includes(false)}
              />
            </th>
            <th className="square-td"></th>
            <th colSpan={3}>Name</th>
            <th colSpan={1}>ID</th>
            <th colSpan={4}>Adresse</th>
            <th colSpan={3}>E-Mail</th>
            <th colSpan={3}>Telefon</th>
            <th colSpan={1}>Typ</th>
            <th colSpan={3}>Zimmer</th>
            <th colSpan={3}>m²</th>
            <th colSpan={4}>
              <Grid container>
                <Grid item xs={12}>
                  präferierte Lage
                </Grid>
                <Grid item xs={4}>
                  EG
                </Grid>
                <Grid item xs={4}>
                  OG
                </Grid>
                <Grid item xs={4}>
                  PH
                </Grid>
              </Grid>
            </th>
            <th colSpan={4}>
              <Grid container>
                <Grid item xs={12}>
                  Interessen an
                </Grid>
                <Tooltip title="Kaufinteresse an Neubau">
                  <Grid item xs={4}>
                    NEU
                  </Grid>
                </Tooltip>
                <Tooltip title="Kaufinteresse an Sanierung">
                  <Grid item xs={4}>
                    SAN
                  </Grid>
                </Tooltip>
                <Tooltip title="Kaufinteresse an Unsaniert">
                  <Grid item xs={4}>
                    UNS
                  </Grid>
                </Tooltip>
              </Grid>
            </th>
            <th colSpan={3}>Kaufpreis</th>
            <th colSpan={4}>Kommentar</th>
            <th className="square-td">
              <MessageIcon />
            </th>
            <th colSpan={2}>Erstellt</th>
            <th colSpan={2}>Löschung</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr style={{ backgroundColor: 'transparent' }}>
              <td colSpan={30}>
                <TailSpin color="#406a86" height={200} width={200} />
                <h1>Lade Daten...</h1>
              </td>
            </tr>
          ) : (
            STANDINS.map((applicant, idx) => (
              <ApplicantRow
                key={applicant.id}
                applicant={applicant}
                idx={idx}
                onCheck={check}
                checked={selection[idx]}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default BuyerList;
