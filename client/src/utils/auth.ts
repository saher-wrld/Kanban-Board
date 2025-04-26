import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try{
      // attempt to decode the provided token using jwtDecode, expecting a JwtPayload type
      const decoded = jwtDecode<JwtPayload>(token);

      // check is the decoded token has an exp property and if it is less than the current time (s)
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // if token is exp, return ture indicating the token is expired
        return true; // token is expired
      }
    } catch (err) {
      return false;

    }
  }

  getToken(): string {
    // TODO: return the token
    const loggedInUser = localStorage.getItem('id_token') || '';
    return loggedInUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
