export const htmlEntity = {
  methods: {
    decode(str) {
      return str.replace(/&[#039]*;/g, "'")
      .replace(/&[amp]*;/g, '&')
      .replace(/&[quot]*;/g, '"')
      .replace(/&[rsquo]*;/g, '’')
      .replace(/&[lsquo]*;/g, '‘')
      .replace(/&[apos]*;/g, "'")
      .replace(/&[percnt]*;/g, '%')
      .replace(/&[divide]*;/g, '÷')
      .replace(/&[div]*;/g, '÷')
      .replace(/&[aacute]*;/g, 'á')
      .replace(/&[eacute]*;/g, 'é')
      .replace(/&[iacute]*;/g, 'í')
      .replace(/&[ntilde]*;/g, 'ñ')
      .replace(/&[oacute]*;/g, 'ó')
      .replace(/&[uacute]*;/g, 'ú')
      .replace(/&[auml]*;/g, 'ä')
      .replace(/&[euml]*;/g, 'ë')
      .replace(/&[iuml]*;/g, 'ï')
      .replace(/&[ouml]*;/g, 'ö')
      .replace(/&[uuml]*;/g, 'ü')
      .replace(/&[yuml]*;/g, 'ÿ')
      .replace(/&[uuml]*;/g, 'ü')
    }
  }
}
