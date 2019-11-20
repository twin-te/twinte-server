export interface UserEntity {
  twinte_user_id: string
  twinte_username: string
}

export enum AuthenticationProvider {
  Twitter = 'twitter',
  Google = 'google'
}

export interface UserAuthenticationEntity {
  provider: AuthenticationProvider
  social_id: string
  social_username: string
  social_display_name: string
  access_token: string
  refresh_token: string
}
