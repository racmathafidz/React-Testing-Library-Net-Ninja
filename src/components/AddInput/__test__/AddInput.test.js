import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';

// CONTOH UNIT TESTING

/// Menggunakan Mock karena props 'setTodos' pada <AddInput> adalah sebuah hooks function
/// Menggunakan Mock function dari jest (fn stands for function)
const MockSetTodo = jest.fn();

/// Describe block untuk mengelompokkan test (optional)
describe('test biasa', () => {
    /// 'test' block. argument pertama adalah deskripsi test. argument kedua adalah test callback.
    test('should render input element', async () => { 
        // 1. Rendering
        /// Component <AddInput> memiliki 2 props. Sebuah array dan sebuah function. 
        /// Untuk props function kita harus menggunakan Mock.
        render(
            <AddInput 
                todos={[]}
                setTodos={MockSetTodo}
            />
        );  
    
        // 2. Temukan element yang ingin di test 
        /// getByPlaceholderText = Menemukan placeholder di component yang di render
        /// (Menggunakan regex irregular, jadi huruf besar-kecil tidak berpengaruh)
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i); 
      
        // 3. Element expect / test    
        expect(inputElement).toBeInTheDocument(); 
      
        // 4. 'npm test' untuk menjalankan tes dan lihat hasil test
    });
});

// -------------------- Testing With Firing Events

describe('test dengan fire events (menjalankan events)', () => {
    test('should be able to type in input', async () => { 
        render(
            <AddInput 
                todos={[]}
                setTodos={MockSetTodo}
            />
        );  
            
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i); 
      
        // Firing Events
        /// Menggunakan fire event change untuk melakukan change pada input element
        /// Melakukan change pada target.value dengan value yang kita tentukan
        /// Argument pertama adalah element yang akan dikenai change event. Kedua adalah change eventnya.
        fireEvent.change(inputElement, { target: { value: 'This is new task that added with fire events' }})

        expect(inputElement.value).toBe('This is new task that added with fire events'); 
    });

    test('should have empty input when add button is clicked', async () => { 
        render(
            <AddInput 
                todos={[]}
                setTodos={MockSetTodo}
            />
        );  
            
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i); 
        const buttonElement = screen.getByRole('button', { name: /Add/i });
      
        // Firing Events
        /// Menggunakan fire event change untuk melakukan change pada input element
        /// Melakukan change pada target.value dengan value yang kita tentukan
        /// Argument pertama adalah element yang akan dikenai change event. Kedua adalah change eventnya.
        fireEvent.change(inputElement, { target: { value: 'This is new task that added with fire events' }});
        
        /// Menggunakan fire event click untuk melakukan click pada button
        fireEvent.click(buttonElement);

        // Ketika input di change, dan button add di click maka input element harus kosong
        expect(inputElement.value).toBe(''); 
    });
});