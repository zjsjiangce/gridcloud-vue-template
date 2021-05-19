import { time } from '../utils'


export default {
  'number': (v) => v || NaN,
  'string': (v) => v || '',
  'boolean': (v) => v || false,
  'array': (v) => v || [],
  'map': () => ({}),
  'any': () => null,
  'date': (v) => v && time(new Date(v)) || '',
  'wrapper': () => ({}),
}