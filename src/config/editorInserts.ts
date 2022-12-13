import { EditorText } from './types';

const general_data_table_grid = `<div style='display: grid;  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;  gap: 1px 1px;  grid-auto-flow: row;  grid-template-areas: "ausstattung ausstattung . . . ."    "ausstattung ausstattung . . . ."    "ausstattung ausstattung . . heizung heizung"     "ausstattung ausstattung . . . ."     "mietpreis mietpreis mietpreis mietpreis mietpreis mietpreis";
align-content: center;
justify-content: center;'>
<div style="display: flex; grid-area: ausstattung; align-items: center;border: 1px solid black;">{ausstattung}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Mietko.-Nr.:</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{mvnr}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Frei ab</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{frei_ab_sofort}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Straße</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{objekt_strasse}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Wohnfläche</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{qm}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">PLZ/Ort</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{objekt_stadt}</div>
<div style="grid-area: heizung; display: flex; align-items: center; border: 1px solid black;">{heizung}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Etage</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{etage}</div>
<div style="display: flex; align-items: center; border: 1px solid black;">Kaution</div>
<div style="display: flex; align-items: center; border: 1px solid black;">{kaution}</div>
<div style="grid-area: mietpreis;border: 1px solid black;">
Mietpreis
</div>
</div>
`;
const general_data_table = '{informations_tabelle}';

export const default_texts: EditorText[] = [
  /*{
      data: `<h3>{anrede},</h3>
<p>wir würden Sie gerne zu einem Besichtigungstermin einladen am {termin_datum} in {objekt_adresse}.
Sollten Sie Interesse an der Anmietung haben, kontaktieren Sie bitte {sb_name} unter <a href='mailto:{sb_mail}'>{sb_mail}</a>.`,
      label: <span>Interessent</span>,
      description: "Anschreiben für Interessent*in"
    },
    {
      data: `<h3>{anrede},</h3>
<p>wir würden Sie gerne zu einem Besichtigungstermin einladen am {termin_datum} in {objekt_adresse}.<br/>
Bitte setzen Sie sich zwecks Terminvereinbarung mit dem derzeitigen Mieter {mieter_name} unter der Rufnummer <a href='tel:{mieter_tel}'>{mieter_tel}</a> in Verbindung. <br/>
Sollten Sie Interesse an der Anmietung haben, kontaktieren Sie bitte {sb_name} unter <a href='mailto:{sb_mail}'>{sb_mail}</a>.`,
      label: <span>Mieter Kontaktaufnahme</span>,
      description: "Mieter Kontaktaufnahme"
    },*/

  {
    data: `<span>{anrede}</span><br><br>
<p>wir möchten Sie heute über den Vertriebsstart des im Betreff genannten Objektes informieren, welches für Sie von Interesse sein könnte.

Das ausführliche Exposè erhalten Sie im Anhang.

Bei Rückfragen oder zur Vereinbarung eines Besichtigungstermins stehen wir gerne zur Verfügung.</p>`,
    label: 'Angebot Globalverkauf',
    description: 'Angebot für Globalverkauf',
  },
  {
    data: `<span>{anrede}</span><br><br>
<p>wir möchten Sie heute über den Vertriebsstart der im Betreff genannten Eigentumswohnung informieren, welches zu Ihren gewählten Präferenzen passen könnte.

Das Exposè zur angebotenen Eigentumswohnung erhalten Sie im Anhang.

Bei Rückfragen oder zur Vereinbarung eines Besichtigungstermins stehen wir gerne zur Verfügung.</p>`,
    label: 'Angebot Globalverkauf',
    description: 'Angebot für Globalverkauf',
  },
];

export const default_inserts: EditorText[] = [
  {
    data: '{anrede}',
    label: 'Anrede',
    description: 'Geschlechstspezifische Anrede',
  },
  {
    data: '{interessent_name}',
    label: 'Interessent Name',
    description: 'Nachname des Interessenten',
  },
  {
    data: '{interessent_vorname}',
    label: 'Interessent Vorname',
    description: 'Vorname des Interessenten',
  },
  {
    data: '{mieter_name}',
    label: 'Mieter',
    description: 'Nachname des Mieters',
  },
  {
    data: '{mieter_tel}',
    label: 'Mieter TEL',
    description: 'Telefonnummer des Mieters',
  },
  {
    data: '{mieter_mobil}',
    label: 'Mieter Mobil',
    description: 'Mobilnummer des Mieters',
  },
  {
    data: '{objekt_adresse}',
    label: 'Objektadresse',
    description: 'Adresse des aktuellen Mietobjekts',
  },
  {
    data: '{lage}',
    label: 'Lage',
    description: 'Lage innerhalb des Hauses (EG etc.)',
  },
  {
    data: '{frei_ab}',
    label: 'Frei ab',
    description: 'Datum wenn Frei ab in der Zukunft sonst sofort',
  },
  {
    data: '{zimmer}',
    label: 'Anz. Zimmer',
    description: 'Anzahl Zimmer (inkl. halber Zimmer)',
  },
  { data: '{mtl_miete}', label: 'Miete', description: 'Monatsmiete' },
  { data: '{qm}', label: 'QM', description: 'Bewohnbare Fläche in qm' },
  {
    data: '{sb_name}',
    label: 'SB Name',
    description: 'Name des hinterlegten Sachbearbeiter',
  },
  {
    data: '{sb_mail}',
    label: 'SB E-Mail',
    description: 'E-Mail des hinterlegten Sachbearbeiter',
  },
  {
    data: '{termin_datum}',
    label: 'Startzeit',
    description: 'Startzeit des Termins',
  },
];

//{ data: "<a href='{loeschen_link}'>{loeschen_link}</a>", label: "Löschen-Link", description: "Link zum Löschen eines Gesuchs"},

export const default_html_inserts: EditorText[] = [
  {
    data: "<a href='{erstellen_link}'>{erstellen_link}</a>",
    label: 'Erstellen-Link',
    description: 'Link zum erstellen eines neuen Gesuchs',
  },
  {
    data: "<a href='{umwandeln_link}'>{umwandeln_link}</a>",
    label: 'Umwandel-Link',
    description: 'Link zum Umwandeln eines spezifischen Gesuchs in ein allgemeines Gesuch',
  },
  {
    data: "<a href='{verlaengern_link}'>{verlaengern_link}</a>",
    label: 'Verlängern-Link',
    description: 'Link zum Verlängern eines Gesuchs',
  },

  {
    data: `
Objektadresse: <strong>{objekt_adresse}</strong>
Lage innerhalb des Hauses: <strong>{lage}</strong>
Mietobjekt ist frei ab: <strong>{frei_ab}</strong>
Anzahl Zimmer: <strong>{zimmer}</strong>
Monatliche Miete: <strong>{mtl_miete}</strong>
QM: <strong>{qm}</strong>
    `,
    label: 'Alle Wohnungsdaten',
    description: 'Stichpunktliste mit allen Informationen über das Mietobjekt',
  },
];
