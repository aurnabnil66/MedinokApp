const Routes = {
  INTRO: 'Intro',
  ONBOARDING: 'Onboarding',
  MOBILE_LOGIN: 'MobileLogin',
  OTP: 'OTP',

  SELECT_LANGUAGE: 'SelectLanguage',

  /* Main Stack */
  HOME_TAB_STACK: 'HomeTabStack',

  /* Drawer Stack */
  HOME_DRAWER: 'HomeDrawer',
  WALLET_DRAWER: 'WalletDrawer',
  NOTIFICATIONS_DRAWER: 'NotificationsDrawer',

  /* Screens */
  /** *Home Page Top Tab */
  HOME: 'Home',
  DELIVERY: 'Delivery',
  URGENTDELIVERY: 'UrgentDelivery',
  /** *Home Page Top Tab */
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  WALLET: 'Wallet'
};

const BottomTabs = [
  {
    iconName: 'home-outline',
    size: 22,
    selectedIconName: 'home-sharp',
    name: Routes.HOME_TAB_STACK
  },
  {
    iconName: 'globe-outline',
    size: 22,
    selectedIconName: 'globe-sharp',
    name: 'Offers'
  },
  {
    iconName: 'laptop-outline',
    size: 22,
    selectedIconName: 'laptop-sharp',
    name: 'Recharge'
  },
  {
    iconName: 'grid-outline',
    size: 22,
    selectedIconName: 'grid-sharp',
    name: 'menu'
  }
];

export { BottomTabs, Routes };
