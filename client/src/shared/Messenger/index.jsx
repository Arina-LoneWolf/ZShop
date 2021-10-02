import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { useRouteMatch } from 'react-router-dom';

function Messenger() {
  const match = useRouteMatch('/admin');
  if (match) return null;

  return (
    <MessengerCustomerChat pageId={process.env.FACEBOOK_PAGE_ID} appId={process.env.FACEBOOK_APP_ID} themeColor="#ffb0bd" />
  );
}

export default Messenger;