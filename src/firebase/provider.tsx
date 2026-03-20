'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'

interface UserProfile {
  id: string;
  role: 'owner' | 'user';
  firstName: string;
  lastName: string;
  email: string;
}

interface UserAuthState {
  user: User | null;
  profile: UserProfile | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export interface FirebaseContextState extends UserAuthState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<{
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}> = ({ children, firebaseApp, firestore, auth }) => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    profile: null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Cleanup previous profile listener if it exists
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }

        if (firebaseUser) {
          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          unsubscribeProfile = onSnapshot(
            userDocRef,
            (docSnap) => {
              if (docSnap.exists()) {
                setUserAuthState({
                  user: firebaseUser,
                  profile: docSnap.data() as UserProfile,
                  isUserLoading: false,
                  userError: null,
                });
              } else {
                // Handle missing profile by providing a sensible default for demo/anonymous users
                setUserAuthState({
                  user: firebaseUser,
                  profile: {
                    id: firebaseUser.uid,
                    role: 'user', // Default to restricted role until setDoc completes
                    firstName: firebaseUser.displayName?.split(' ')[0] || 'Guest',
                    lastName: firebaseUser.displayName?.split(' ')[1] || 'User',
                    email: firebaseUser.email || '',
                  },
                  isUserLoading: false,
                  userError: null,
                });
              }
            },
            (error) => {
              console.error("Profile listener error:", error);
              // Don't crash the app, just keep the last known state or clear it
              setUserAuthState(prev => ({ ...prev, isUserLoading: false }));
            }
          );
        } else {
          setUserAuthState({ user: null, profile: null, isUserLoading: false, userError: null });
        }
      },
      (error) => {
        setUserAuthState(prev => ({ ...prev, isUserLoading: false, userError: error }));
      }
    );

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [auth, firestore]);

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      ...userAuthState
    };
  }, [firebaseApp, firestore, auth, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) throw new Error('useFirebase must be used within a FirebaseProvider.');
  return context;
};

export const useAuth = () => {
  const { auth } = useFirebase();
  if (!auth) throw new Error('Auth not initialized');
  return auth;
};

export const useFirestore = () => {
  const { firestore } = useFirebase();
  if (!firestore) throw new Error('Firestore not initialized');
  return firestore;
};

export const useUser = () => {
  const { user, profile, isUserLoading, userError } = useFirebase();
  return { user, profile, isUserLoading, userError };
};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T & {__memo?: boolean} {
  const memoized = useMemo(factory, deps) as any;
  if(typeof memoized === 'object' && memoized !== null) memoized.__memo = true;
  return memoized;
}