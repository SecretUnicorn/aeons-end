export const dateToGermanString = (date: string | object | null, showTime: boolean): string => {
  if (date != null) {
    if (typeof date == 'string' && date.length == 0) {
      return 'Noch nicht angegeben';
    } else if (typeof date != 'object') {
      const germanPattern = /^\d\d?\.\d\d?\.\d\d(\d\d)?$/;
      if (germanPattern.exec(date)) {
        const splitted = date.split('.');
        date = new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0]));
      } else {
        date = new Date(date);
      }
    }
    return (
      `${(date as Date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })}` +
      (showTime
        ? ` ${(date as Date).getHours() < 10 ? '0' : ''}${(date as Date).getHours()}:${
            (date as Date).getMinutes() < 10 ? '0' : ''
          }${(date as Date).getMinutes()} Uhr`
        : '')
    );
  } else {
    return '';
  }
};

export const trimLongTextAfter = (text: string, maxLength: number): string => {
  if (text.length < maxLength) {
    return text;
  } else {
    return `${text.slice(0, maxLength - 3)}...`;
  }
};
