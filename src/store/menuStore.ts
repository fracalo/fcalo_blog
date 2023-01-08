
import { atom } from 'nanostores'

export type MenuStoreStates = 'open'|'close'

export const menuStore = atom<MenuStoreStates>('open')
