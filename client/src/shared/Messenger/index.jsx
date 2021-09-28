import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { useRouteMatch } from 'react-router-dom';

function Messenger() {
  const match = useRouteMatch('/admin');
  if (match) return null;

  return (
    <MessengerCustomerChat pageId="107987698119089" appId="466417401239652" themeColor="#ffb0bd" />
  );
}

export default Messenger;