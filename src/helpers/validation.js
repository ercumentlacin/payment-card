export const validation = (obj) => {
  let error = false;
  Object.keys(obj).forEach((key) => {
    if (obj[key].name === 'cardNumber') {
      if (obj[key].value.replace(/\s+/g, '').length !== 16) {
        error = true;
      }
    }

    if (!obj[key].value.length) {
      error = true;
    }
  });

  return error;
};
