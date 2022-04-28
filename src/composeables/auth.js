import {colorTrace, redirectToLogin} from "../utils/myFunctions";

export const auth = () => {

  const checkUser = (api) => {
    api.get('https://ndo-portal.eprojecttrackers.com/check_user.php').then(d => {
      console.log(d);
    }).catch(error => {
      colorTrace(error.message, 'purple');
      redirectToLogin(error.message);
    })
  }
  return {checkUser};

}
