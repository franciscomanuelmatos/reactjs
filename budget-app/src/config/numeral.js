import numeral from 'numeral';

export default () => {
  numeral.register('locale', 'pt', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    currency: {
      symbol: '€'
    }
  });
  
  numeral.locale('pt');
}