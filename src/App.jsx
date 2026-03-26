import './App.css'
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client/react";
import {GET_ALL_USERS} from "./query/user.js";
import {CREATE_USER} from "./mutations/user.js";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const [newUser] = useMutation(CREATE_USER);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    useEffect(() => {
        if(!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data);
            setUsername('');
            setAge(0);
        })
    }

    const getAll = e => {
        e.preventDefault();
        void refetch();
    }

    if(loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
            }}>
                <input type="text"
                       value={username}
                       onChange={(event) => setUsername(event.target.value)}
                />
                <input type="number"
                       value={age}
                       onChange={(event) => setAge(Number(event.target.value))}
                       min={0}
                />
                <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={(e) => addUser(e)}>Создать</button>
                <button onClick={e => getAll(e)}>Получить</button>
                </div>
            </form>
            <div>
                {users.map(user =>
                    <p key={user.id} className="user">
                        {user.id}. {user.username} {user.age}
                    </p>
                )}
            </div>
        </div>
    )
}

export default App
