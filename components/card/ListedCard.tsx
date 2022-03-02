import React from 'react';
import { useAuth } from '../../utils/userContext';

const ListedCard = () => {
  const { user, reviews, lists } = useAuth();
  return <div>ListedCard</div>;
};

export default ListedCard;
