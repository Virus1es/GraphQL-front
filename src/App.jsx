import './App.css'
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client/react";
import {GET_ALL_USERS} from "./query/user.js";

function App() {
    const {data, loading, error} = useQuery(GET_ALL_USERS)
  const [users, setUsers] = useState([]);

    useEffect(() => {

    }, [data]);
  return (
    <div>
      <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center'
      }}>
        <input type="text"/>
        <input type="number"/>
        <div style={{display: 'flex', gap: '10px'}}>
          <button>Создать</button>
          <button>Получить</button>
        </div>
      </form>
      <div>
        {users.map(user =>
            <p className="user">{user.id}. {user.username} {user.age}</p>
        )}
      </div>
    </div>
  )
}

export default App
