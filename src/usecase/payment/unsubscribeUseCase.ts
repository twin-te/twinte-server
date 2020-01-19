export interface UnsubscribeUseCase {
  unsubscribe(subscription_id: string) : Promise<void>
}
