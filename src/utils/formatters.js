export const dateToGermanString = (date, showTime) => {
  if (date != null) {
    if (typeof date == "string" && date.length == 0) {
      return "Noch nicht angegeben";
    } else if (typeof date != "object") {
      const germanPattern = /^\d\d?\.\d\d?\.\d\d(\d\d)?$/;
      if (germanPattern.exec(date)) {
        const splitted = date.split(".");
        date = new Date(
          parseInt(splitted[2]),
          parseInt(splitted[1]) - 1,
          parseInt(splitted[0])
        );
      } else {
        date = new Date(date);
      }
    }
    return (
      `${date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}` +
      (showTime
        ? ` ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
            date.getMinutes() < 10 ? "0" : ""
          }${date.getMinutes()} Uhr`
        : "")
    );
  } else {
    return "";
  }
};

export const trimLongTextAfter = (text, maxLength) => {
  if (text.length < maxLength) {
    return text;
  } else {
    return `${text.slice(0, maxLength - 3)}...`;
  }
};
