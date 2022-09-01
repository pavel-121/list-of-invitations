import React from 'react';
import { Items } from '../App';
import { Skeleton } from './Skeleton';
import User from './User';

interface UsersProps {
  items: Items[],
  isLoading: boolean,
  invited: number[],
  onClickInvited: (id: number) => void,
  onClickSendInvites: () => void
}

const Users: React.FC<UsersProps> = ({ items, isLoading, invited, onClickInvited, onClickSendInvites }) => {
  const [searchValue, setSearchValue] = React.useState<string>('')

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const skeleton = [...new Array(7)].map((_, i) => <Skeleton key={i} />)

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input onChange={onChangeSearchValue} value={searchValue} type="text" placeholder='Найти пользователя ...' />
      </div>
      {isLoading
        ? skeleton
        : <ul className='users'>
          {
            items.filter(obj => {
              const fullName = (obj.first_name + obj.last_name).toLowerCase()
              return fullName.includes(searchValue.toLowerCase()) || obj.email.toLowerCase().includes(searchValue.toLowerCase())
            })
              .map((obj) => (
                <li key={obj.id}> <User isInvited={invited.includes(obj.id)} onClickInvited={onClickInvited} {...obj} /></li>
              ))
          }
        </ul>
      }
      <div className="invite-btn">
        {invited.length > 0 ? <button onClick={onClickSendInvites} >Отправить приглашение</button> : ''}
      </div>
    </>
  );
};

export default Users;