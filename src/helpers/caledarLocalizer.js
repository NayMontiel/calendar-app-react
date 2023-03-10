import { dateFnsLocalizer } from 'react-big-calendar';
import { parse, format, getDay, startOfWeek } from 'date-fns';
import esES from 'date-fns/locale/es';



const locales = {
    'es': esES,
  }

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });