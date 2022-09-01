import React from 'react';
import './App.scss';
import Success from './components/Success';
import Users from './components/Users';

export type Items = {
  id: number,
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const App: React.FC = () => {
  const [users, setUsers] = React.useState<Items[]>([])
  const [invited, setInvited] = React.useState<number[]>([])
  const [success, setSuccess] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => setUsers(json.data))
      .catch(err => {
        console.warn(err)
        alert('Ошибка')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onClickInvited = (id: number) => {
    if (invited.includes(id)) {
      setInvited(prev => prev.filter(_id => _id !== id))
    } else {
      setInvited(prev => [...prev, id])
    }
  }
  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className='app'>
      {success
        ? <Success count={invited.length} />
        : <Users items={users} isLoading={isLoading} invited={invited} onClickInvited={onClickInvited} onClickSendInvites={onClickSendInvites} />}
    </div>
  );
}

export default App;
