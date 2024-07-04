

const formatDateMonth = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${month} ${year}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'};
  return date.toLocaleDateString('en-US', options);
};

const formatCurrency = (data) => {
  if (!data) {
    return "$0.00"
  }
  return data.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


export {
    formatDateMonth,
    formatDate,
    formatCurrency,
};