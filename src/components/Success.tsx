import React from 'react';
import sussecc from '../assets/success.svg'

interface SuccessProps {
  count: number
}

const Success: React.FC<SuccessProps> = ({ count }) => {
  return (
    <div className='sussecc'>
      <img src={sussecc} alt="" />
      <h3>Успешно!</h3>
      <p>{`Всем ${count} пользователям отправлено приглашение.`}</p>
      <a href="/">
        <button>Назад</button>
      </a>
    </div>
  );
};

export default Success;