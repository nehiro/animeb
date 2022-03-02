import React from 'react';
import { useAuth } from '../../utils/userContext';

const ReviewedCard = () => {
  const { user, reviews, lists } = useAuth();
  return <div>ReviewedCard</div>;
};

export default ReviewedCard;
