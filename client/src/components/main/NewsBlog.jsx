import React from 'react';
import NewsCard from './NewsCard';

const text = [
  { text: 'We are the worlds people Different yet were the same We believe We believe in a dream Praying for peace and healing I hope we can start again We believe We believe in a dream' }];

export default function NewsBlog() {
  return (
    <div className="container-blog">
      {text?.map((el) => (
        <NewsCard
          news={el}
        />
      ))}
    </div>
  );
}
