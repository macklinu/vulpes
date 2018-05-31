import system from 'system-components'
import { Text } from './Text'

export const Measure = system({ is: Text, maxWidth: '32em' }, 'maxWidth')

Measure.displayName = 'Measure'
