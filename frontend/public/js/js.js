const numeral = require('numeral');
function formatNumber(number) {
   return numeral(number).format('0,0.00');
}