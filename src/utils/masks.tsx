import { format, parseISO } from 'date-fns';

export const formatStrapiDate = (value?: string) => {
  return value?.slice(0, 10)?.split('-')?.reverse()?.join('/');
};

export const unMask = (value: string) => {
  return value?.replace(/\D/g, '');
};

export const maskNumber = (value: string) => {
  return value?.replace(/\D/g, '');
};

export const formatDate = (value: string) => {
  return value?.slice(0, 10)?.split('-')?.reverse()?.join('/');
};

export const maskDate = (value: string) => {
  return unMask(value)
    ?.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    ?.slice(0, 10);
};

export const maskCNPJ = (value: string) => {
  return value
    ?.replace(/[^0-9]/g, '')
    ?.replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    ?.slice(0, 18);
};

export const maskCEP = (cep: string) => {
  cep = cep.replace(/\D/g, '');
  const match = cep.match(/^(\d{1,5})(\d{0,3})$/);
  if (match) {
    cep = `${match[1]}${match[2] ? '-' : ''}${match[2]}`;
    return cep;
  }
  return cep;
};

export const maskDimension = (value: string) => {
  return value?.replace(/[^x0-9]+/g, '');
};

export const maskHour = (value: string) => {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, '');

  let hours = digits.substring(0, 2);
  let minutes = digits.substring(2, 4);

  // Limita horas a 23
  if (hours.length === 2) {
    const h = parseInt(hours, 10);
    if (h > 23) hours = '23';
  }

  // Limita minutos a 59
  if (minutes.length === 2) {
    const m = parseInt(minutes, 10);
    if (m > 59) minutes = '59';
  }

  // Monta a string formatada
  if (digits.length <= 2) {
    return hours;
  }
  return `${hours}:${minutes}`;
};

export const maskWeight = (value: string) => {
  const valueFormatted = unformatCurrency(value);

  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valueFormatted);
  return masked?.replace('R$ ', '');
};

export const unformatCurrency = (value: string | undefined) => {
  if (value !== undefined) {
    const valueFormatted = value
      ?.replace(',', '')
      ?.replace('.', '')
      ?.replace(/\D/g, '');

    return Number(valueFormatted) / 100;
  }
  return 0;
};

export const maskMoney = (value: string) => {
  const formatedValue = value?.replace(/\D/g, '');
  if (formatedValue.length > 0) {
    return `R$ ${formatedValue
      ?.replace(/(\d)(\d{2})$/, '$1,$2')
      ?.replace(/(?=(\d{3})+(\D))\B/g, '.')}`;
  }
  return formatedValue;
};

export const maskPhone = (value: string) => {
  if (value?.length > 10) {
    return value
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(\d{2})(\d{5})(\d+)$.*/, '($1) $2-$3')
      ?.slice(0, 15);
  }

  return value
    ?.replace(/[^0-9]/g, '')
    ?.replace(/^(\d{2})(\d{4})(\d{4})$.*/, '($1) $2-$3')
    ?.slice(0, 14);
};

export const maskCPF = (value: string) => {
  return (
    value
      // delete letters
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
      .replace(/.(\d{3})(\d)/, '.$1-$2')
      ?.slice(0, 14)
  );
};

export const maskRG = (value: string) => {
  return value
    ?.replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2}).(\d{3})(\d)/, '$1.$2.$3')
    .replace(/.(\d{3})(\d)/, '.$1-$2');
};

export const currencyMask = (value: number) => {
  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
  return masked;
};

export const maskCoin = (value: string) => {
  const formatedValue = unMaskCoin(value);
  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 1,
  }).format(formatedValue);
  return masked;
};

export const unMaskCoin = (value: string) => {
  if (!value) {
    return 0;
  }

  const unmasked = unMask(value);

  if (unmasked.length === 0) {
    return 0;
  }

  if (value.includes(',')) {
    return Number(unmasked) / 10;
  }

  return Number(unmasked);
};

export const maskPoints = (value: string) => {
  const formatedValue = unMaskPoints(value);
  const masked = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(formatedValue);
  return masked?.concat(' pontos');
};

export const unMaskPoints = (value: string) => {
  if (!value) {
    return 0;
  }

  const unmasked = unMask(value);
  const formatedValue =
    value[value.length - 1] === 'o'
      ? unmasked?.slice(0, unmasked.length - 2)
      : unmasked;

  if (formatedValue.length === 0) {
    return 0;
  }

  return Number(formatedValue);
};

export const cardDateMask = (value: string) => {
  return value?.replace(/^(\d{2})(\d)/, '$1/$2');
};

export const cardNumberMask = (value: string) => {
  return value
    ?.replace(/^(\d{4})(\d)/, '$1 $2')
    .replace(/^(\d{4})\s(\d{4})(\d)/, '$1 $2 $3')
    .replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/, '$1 $2 $3 $4');
};

export const CardNumberDashedMask = (value: string) => {
  return value
    ?.replace(/^(\d{4})(\d)/, '$1-$2')
    .replace(/^(\d{4})-(\d{4})(\d)/, '$1-$2-$3')
    .replace(/^(\d{4})-(\d{4})-(\d{4})(\d)/, '$1-$2-$3-$4');
};

export const timeZone = (date: string) => {
  const timezoned = date.split('Z')[0];
  const parsedISO = parseISO(timezoned);
  const timeZoneDate = new Date(parsedISO).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  return timeZoneDate;
};
export const timeZoneDateOnly = (date: string) => {
  const timeZoneDate = new Date(date).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  // Retorna apenas a parte da data (DD/MM/AAAA)
  return timeZoneDate.split(',')[0];
};
export const forceTimeZone = (date: string) => {
  const timezoned = date.split('Z')[0];
  const parsedISO = parseISO(timezoned);
  return parsedISO;
};

export const notAllowReservedCharacters = (value: string) => {
  return value?.replace(/[^a-zA-Z0-9\u00C0-\u00FF\s]/g, '');
};

export const CPForCNPJMask = (value: string) => {
  const unmasked = unMask(value);

  if (unmasked?.length === 11) {
    return value
      ?.replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3}).(\d{3})(\d)/, '$1.$2.$3')
      .replace(/.(\d{3})(\d)/, '.$1-$2');
  }
  if (unmasked?.length === 14) {
    return value
      ?.replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return unmasked;
};

export const unmaskCurrency = (value: string) => {
  if (!value) {
    return 0;
  }

  const unmasked = unMask(value);

  if (unmasked.length === 0) {
    return 0;
  }

  if (value.includes(',')) {
    return Number(unmasked) / 100;
  }

  return Number(unmasked);
};
export const dateISO = (dateString: string) => {
  const parts = dateString.split('/');
  const date = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const typeDate = new Date(date);
  return typeDate;
};
export const dateBr = (dateString: string) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  const date = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return date;
};
