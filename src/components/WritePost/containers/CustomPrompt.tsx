// import { useEffect, useContext, useState, useCallback } from 'react';
// import { UNSAFE_NavigationContext as NavigationContext, useLocation } from 'react-router-dom';
// import type { History, Blocker, Transition } from 'history';

// export const useBlocker = (blocker: Blocker, when = true): void => {
//   const navigator = useContext(NavigationContext).navigator as History;

//   useEffect(() => {
//     if (!when) return;

//     const unblock = navigator.block((tx: Transition) => {
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };

//       blocker(autoUnblockingTx);
//     });

//     return unblock;
//   }, [navigator, blocker, when]);
// };

// export const useCallbackPrompt = (when: boolean): [boolean, () => void, () => void] => {
//   const location = useLocation();
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [blockedLocation, setBlockedLocation] = useState<Transition | null>(null);

//   const cancelNavigation = useCallback(() => {
//     setShowPrompt(false);
//     setBlockedLocation(null);
//   }, []);

//   const blocker = useCallback(
//     (tx: Transition) => {
//       if (tx.location.pathname !== location.pathname) {
//         setBlockedLocation(tx);
//         setShowPrompt(true);
//       }
//     },
//     [location],
//   );

//   const confirmNavigation = useCallback(() => {
//     if (blockedLocation) {
//       blockedLocation.retry();
//       cancelNavigation(); // 클린업
//     }
//   }, [blockedLocation]);

//   useBlocker(blocker, when);

//   return [showPrompt, confirmNavigation, cancelNavigation];
// };
