import { AuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import saveUserData from "./user";
import { FormEvent, FormEventHandler } from "react";
import { useRouter } from "next/navigation";




const handleAuthProviderSignIn = async (provider: AuthProvider) => {

   
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        await saveUserData(user);
        console.log('logged in user', user);
      
    }catch (error){
        console.error(`${provider.providerId} sign-in error:`, error );
    }
};

export const signInWithGoogle = ()=> {
    
    
    const provider = new GoogleAuthProvider();
    return handleAuthProviderSignIn(provider);
  
};
export const signInWithGithub = ()=> {
    const provider = new GithubAuthProvider();
    return handleAuthProviderSignIn(provider);
};
export const signInWithFacebook = ()=> {
    const provider = new FacebookAuthProvider();
    return handleAuthProviderSignIn(provider);
};