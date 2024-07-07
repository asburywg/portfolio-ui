

const formatDateMonth = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "";
  }
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const formatDateMonthDay = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "";
  }
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  // check if date in current year, if not add year
  // const now = new Date();
  // if (date.getFullYear() !== now.getFullYear()) {
    // options.year = 'numeric';
  // }
  return date.toLocaleDateString('en-US', options);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
};

const formatCurrency = (data) => {
  if (!data) {
    return "$0.00"
  }
  return data.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatPercent = (data) => {
  if (!data) {
      return ""
  }
  return data.toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2, minimumFractionDigits: 2 });
};


export {
  formatDateMonth,
  formatDate,
  formatCurrency,
  formatDateMonthDay,
  formatPercent
};