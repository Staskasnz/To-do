import { useEffect, useState } from 'react';
import './ToDoList.css'
import deleteButton from '../../images/delete-button.png'
import complateButton from '../../images/complate-button.png'


function ToDoList() {

    const [isAddButtonActive, setIsAddButtonActive] = useState(false);
    const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);
    const [isComplateButtonActive, setIsComplateButtonActive] = useState(false);
    const [complatedInputs, setComplatedinputs] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [todoCounter, setTodoCounter] = useState(0);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }

        const savedComplatedInputs = JSON.parse(localStorage.getItem('complatedInputs'));
        if (savedComplatedInputs) {
            setComplatedinputs(savedComplatedInputs);
        }

        const savedTodoCounter = JSON.parse(localStorage.getItem('counter'));
        if (savedTodoCounter) {
            setTodoCounter(savedTodoCounter)
        }
    }, []);

    function handleAddClick() {
        setIsAddButtonActive(!isAddButtonActive);
    }

    function handleDeleteClick() {
        setIsDeleteButtonActive(!isDeleteButtonActive);
    }

    function handleComplateClick() {
        setIsComplateButtonActive(!isComplateButtonActive)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        setTodoCounter(todoCounter + 1);
        setTodos({ ...todos, [todoCounter]: todoInput });
        setTodoInput('');
        localStorage.setItem('todos', JSON.stringify({ ...todos, [todoCounter]: todoInput }));
        localStorage.setItem('counter', JSON.stringify(todoCounter + 1));
    }

    function handlechange(evt) {
        setTodoInput(evt.target.value);
    }

    function handleEditTodo(evt, index) {
        const updateTodos = { ...todos };
        updateTodos[index] = evt.target.value;
        setTodos(updateTodos);
    }

    function handleDeleteInput(id) {
        console.log(todos);
        const updatedTodos = { ...todos };

        delete updatedTodos[id];

        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    function handleComplateInput(id) {
        const updatedComplatedInputs = { ...complatedInputs };

        if (updatedComplatedInputs.hasOwnProperty(id)) {
            delete updatedComplatedInputs[id];
        } else {
            updatedComplatedInputs[id] = true;
        }

        setComplatedinputs(updatedComplatedInputs);
        localStorage.setItem('complatedInputs', JSON.stringify(updatedComplatedInputs));
    }

    return (
        <div className="todo">
            {todos.length === 0 && <p className="todo__placeholder">Добавь свои планы...</p>}
            {isAddButtonActive && <form className="todo__form" onSubmit={handleSubmit} >
                <input type="text" className="todo__input" placeholder='Запланируй что-нибудь' onChange={handlechange} value={todoInput} required />
            </form>}
            <div className="todo__box-button">
                <button className={`todo__add-button ${isAddButtonActive && "todo__add-button_active"}`}
                    onClick={handleAddClick}></button>
                <button className={`todo__delete-button ${isDeleteButtonActive && "todo__delete-button_active"}`}
                    onClick={handleDeleteClick}></button>
                <button className={`todo__complate-button ${isComplateButtonActive && "todo__complate-button_active"}`}
                    onClick={handleComplateClick}></button>
            </div>
            <div className="todo__added-input-box">
                {Object.keys(todos).map((id) =>
                    <div className='todo__one-input-box'>
                        {isDeleteButtonActive && <img src={deleteButton} alt="Кнопка удаления задания" className="todo__delete-input" onClick={() => handleDeleteInput(id)} />}
                        <input type="text"
                            maxLength={30}
                            key={id}
                            className={`todo__added-input ${complatedInputs.hasOwnProperty(id) ? 'todo__added-input_through' : ''}`}
                            onChange={(evt) => handleEditTodo(evt, id)}
                            value={todos[id]}
                            wrap="hard"
                            disabled={complatedInputs.hasOwnProperty(id)}
                        />
                        {isComplateButtonActive && <img src={complateButton}
                            alt="Кнопка выполнения задания"
                            className='todo__complate-input'
                            onClick={() => handleComplateInput(id)} />}
                    </div>)}
            </div>
        </div>
    );
}

export default ToDoList;