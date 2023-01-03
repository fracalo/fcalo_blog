
import { atom } from 'nanostores'

export const menuStore = atom<'open'|'close'>('open')
