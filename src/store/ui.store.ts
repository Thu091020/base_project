import { signal } from '@preact/signals-react'

export interface UiState {
  globalLoading: boolean
}

export const uiSignal = signal<UiState>({
  globalLoading: false,
})

export const setGlobalLoading = (value: boolean) => {
  uiSignal.value = { ...uiSignal.value, globalLoading: value }
}


