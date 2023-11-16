import { useEffect } from 'react';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';

const GitHubAuth = ({onLogin}) => {

  useEffect(() => {
    const auth = createOAuthAppAuth({
      clientId:"c8c96210430d8b40525e", // process.env.REACT_APP_CLIENT_ID,
      clientSecret: "520ba8902ba3f334ae211a2cbf95c2dc59427077"  // process.env.REACT_APP_CLIENT_SECRET,
    });

    const url = window.location.href;
    const code = new URLSearchParams(window.location.search).get('code');
console.log('url:', url);
console.log('code:', code);
    if (code) {
      auth({
        type: 'token',
        code,
      })
        .then((authResult) => {
          const accessToken = authResult.authentication.token;
          // Save accessToken to your state or context
        // localStorage.setItem('token', JSON.stringify(accessToken))
        onLogin(accessToken);
        })
        .catch((error) => {
          console.error('Authentication error:', error);
        });
    } else {
      window.location.href = auth({
        type: 'oauth-app',
      });
    }
  }, []);

  return <div>Logging in...</div>;
};

export default GitHubAuth;
