export interface SaveCheckoutHistory {
  SaveCheckoutHistory(session_id: string): Promise<void>
}
