export interface User {
  twinte_user_id: string
  twinte_username: string
}

export enum AuthenticationProvider {
  Twitter = 'Twitter',
  Google = 'Google'
}

export interface UserAuthentication {
  provider: AuthenticationProvider
  social_id: string
  social_username: string
  social_display_name: string
}
