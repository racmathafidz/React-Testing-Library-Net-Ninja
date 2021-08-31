import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../Todo';
import { BrowserRouter } from 'react-router-dom';

// CONTOH INTEGRATION TESTING
/// Lihat file Todo.js
/// Integration testing adalah testing yang melakukan test pada sebuah komponen yang memiliki 2 buah komponen yang saling berinteraksi
/// Pada component <Todo> disini adalah component <AddInput> dan <ToDoList>

/// Menggunakan Mock karena di dalam component <ToDo> terdapat component <TodoFooter> yang terdapat <Link> yang harus berada di dalam <BrowserRouter> 
const MockTodo = () => (
    <BrowserRouter>
        <Todo />
    </BrowserRouter>
);

/// Add Task Function, agar bisa melakukan multiple input task
const addTask = (tasks) => {
    // Temukan element yang ingin di test 
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i); 
    const buttonElement = screen.getByRole('button', { name: /Add/i });

    /// Melakukan input task sesuai jumlah task
    tasks.forEach(task => {
        // Firing Events
        /// Menggunakan fire event change untuk melakukan change pada input element    
        fireEvent.change(inputElement, { target: { value: task }});
        /// Menggunakan fire event click untuk melakukan click pada button
        fireEvent.click(buttonElement);
    });
};

describe('integration test input 1 task', () => {
    /// 'test' block. argument pertama adalah deskripsi test. argument kedua adalah test callback.
    test('new inputted task should exist in the ToDoList div after inputted', async () => { 
        // 1. Rendering
        /// Rendering Mock
        render(<MockTodo />);  
    
        // 2 & 3. Menemukan element yang ingin di test dan firing events
        addTask(['This is new task that added with fire events']);
    
        // Div ToDoList yang telah diinput
        const divElement = screen.getByText('This is new task that added with fire events');
      
        // 4. Element expect / test    
        expect(divElement).toBeInTheDocument(); 
      
        // 5. 'npm test' untuk menjalankan tes dan lihat hasil test
    });
});

describe('integration test input multiple task', () => {
    test('new multiple inputted task should exist in the ToDoList div after inputted', async () => { 
        // 1. Rendering
        /// Rendering Mock
        render(<MockTodo />);  
    
        // 2 & 3. Menemukan element yang ingin di test dan firing events
        addTask([
            'This is new task that added with fire events',
            'This is second task',
            'This is third task'
        ]);
    
        // Div ToDoList yang telah diinput
        const divElement = screen.getAllByTestId('task-container');
      
        // 4. Element expect / test    
        expect(divElement.length).toBe(3); 
      
        // 5. 'npm test' untuk menjalankan tes dan lihat hasil test
    });
});

describe('integration test task line-through when done (task tercoret ketika selesai)', () => {
    test('task should not have completed className when initially rendered', async () => { 
        // 1. Rendering
        /// Rendering Mock
        render(<MockTodo />);  
    
        // 2 & 3. Menemukan element yang ingin di test dan firing events
        addTask(['This is new task that added with fire events']);
    
        // Div ToDoList yang telah diinput
        const divElement = screen.getByText('This is new task that added with fire events');
      
        // 4. Element expect / test            
        /// Task ketika baru ditambahkan atau belum di click tidak boleh memiliki class 'todo-item-completed'
        expect(divElement).not.toHaveClass('todo-item-completed'); 
      
        // 5. 'npm test' untuk menjalankan tes dan lihat hasil test
    });

    test('task should have completed className when clicked', async () => { 
        // 1. Rendering
        /// Rendering Mock
        render(<MockTodo />);  
    
        // 2 & 3. Menemukan element yang ingin di test dan firing events
        addTask(['This is new task that added with fire events']);
    
        // Div ToDoList yang telah diinput
        const divElement = screen.getByText('This is new task that added with fire events');

        // Firing Events
        fireEvent.click(divElement);
      
        // 4. Element expect / test          
        /// Task ketika sudah di click harus memiliki class 'todo-item-completed'  
        expect(divElement).toHaveClass('todo-item-completed'); 
      
        // 5. 'npm test' untuk menjalankan tes dan lihat hasil test
    });
});