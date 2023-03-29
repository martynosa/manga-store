import { AuthError as firebaseAuthError } from 'firebase/auth';

export const firebaseErrorTrimmer = (error: firebaseAuthError) => {
  const onlyInBrackets = error.message.match(/(auth\/[a-zA-Z0-9_-]+)/);
  const errorMessage =
    onlyInBrackets !== null &&
    onlyInBrackets[0].split('/')[1].replaceAll('-', ' ');
  return typeof errorMessage === 'boolean' ? 'general error' : errorMessage;
};
