import React from 'react'

import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

export const SignIn = () => {

  const logGoogleUser = async() => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
        <h1>SignIn</h1>
        <button onClick={ logGoogleUser }>Sign in with Google</button>
    </div>
  )
}
