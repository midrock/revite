export const auth: Service.Auth.Config = {
  service: () => import('/~/services/auth/versions/MockLoggedAuthService'),
}
