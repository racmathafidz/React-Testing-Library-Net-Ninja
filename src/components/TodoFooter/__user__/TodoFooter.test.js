import { render, screen } from '@testing-library/react';
import TodoFooter from '../TodoFooter';
import { BrowserRouter } from 'react-router-dom';

// CONTOH UNIT TESTING DENGAN MOCK

/// Menggunakan Mock karena di dalam component <TodoFooter> terdapat <Link> yang harus berada di dalam <BrowserRouter> (<BrowserRouter> berada di index.js).
/// Tanpa Mock, test akan failed karena unit testing hanya akan melakukan test unit secara terpisah. Jadi <BrowserRouter> tidak ikut ter render/test.
/// Maka dari itu kita membuat Mock agar <Link> component <TodoFooter> berada di dalam <BrowserRouter>
const MockTodoFooter = ({ numberOfIncompleteTasks }) => (
    <BrowserRouter>
        <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks}/>
    </BrowserRouter>
);

/// 'test' block. argument pertama adalah deskripsi test. argument kedua adalah test callback.
test('should render the correct amount of incomplete task', async () => { 
    // 1. Rendering
    /// Rendering Mock
    render(<MockTodoFooter numberOfIncompleteTasks={5}/>);  

    // 2. Temukan element yang ingin di test 
    /// getByText = Menemukan text di component yang di render
    /// (Menggunakan regex irregular, jadi huruf besar-kecil tidak berpengaruh)
    const paragraphElement = screen.getByText(/5 tasks left/i); 
  
    // 3. Element expect / test
    /// expect text 'title' berada di document
    expect(paragraphElement).toBeInTheDocument(); 
  
    // 4. 'npm test' untuk menjalankan tes dan lihat hasil test
});

test('should render `task` when the number of incomplete task is one', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByText(/1 task left/i); 
  
    expect(paragraphElement).toBeInTheDocument(); 
});

// -------------------- Testing With Another Assertions
// -------------------- Assertions = Method testing yang berada setelah 'expect' (Contoh: toBe(2), toBeInTheDocument(), etc)

/// Assertion toBeTruthy()
test('element should have true value', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByText(/1 task left/i); 
  
    /// Menggunakan assertions toBeTruthy()
    /// toBeTruthy() = Element yang di render/test harus bernilai true
    /// For another assertions, just read the documentation on the suggestion bitch!
    expect(paragraphElement).toBeTruthy(); 
});

/// Assertion toBeVisible()
test('element should visible to the client', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByText(/1 task left/i); 
  
    /// Menggunakan assertions toBeVisible()
    /// toBeVisible() = Element yang di render/test harus terlihat (visible) oleh client
    /// Contoh toBeVisible() gagal = opacity 0, visibility hidden, dll
    /// For another assertions, just read the documentation on the suggestion bitch!
    expect(paragraphElement).toBeVisible(); 
});

/// Assertion toContainHTML()
test('element should render the correct html tag', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByText(/1 task left/i); 
  
    /// Menggunakan assertions toContainHTML()
    /// toContainHTML() = Element yang di render/test harus memiliki tag html yang diinginkan (disini tag 'p')    
    /// For another assertions, just read the documentation on the suggestion bitch!
    expect(paragraphElement).toContainHTML('p'); 
});

/// Assertion toHaveTextContent()
test('element should render the correct text content', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByTestId('paragraph'); 
  
    /// Menggunakan assertions toContainHTML()
    /// toContainHTML() = Element yang di render/test harus memiliki tag html yang diinginkan (disini tag 'p')    
    /// For another assertions, just read the documentation on the suggestion bitch!
    expect(paragraphElement).toHaveTextContent('1 task left'); 
});

// -------------------- Testing With 'NOT' Assertions

/// Assertion 'NOT' and toBeFalsy()
test('element should not have false value', async () => { 
    render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  

    const paragraphElement = screen.getByTestId('paragraph'); 
  
    /// Menggunakan assertions 'NOT' dan toBeFalsy()
    /// toBeFalsy() = Element yang di render/test harus memiliki value false   
    /// Jadi jika 'not' dan toBeFalsy() digabung, maka value tidak boleh bernilai false (not toBeFalsy)
    expect(paragraphElement).not.toBeFalsy(); 
});

// -------------------- Testing With Element's Assertions

/// Describe block untuk mengelompokkan test (optional)
describe('Testing With Element Assertions', () => {    
    /// Assertion textContent and toBe()
    test('element should render the correct text content', async () => { 
        render(<MockTodoFooter numberOfIncompleteTasks={1}/>);  
    
        const paragraphElement = screen.getByTestId('paragraph'); 
      
        /// Menggunakan assertions element .textContent dan assertions .toBe()
        /// textContent = Element memiliki element yang diinginkan pada .tobe()    
        expect(paragraphElement.textContent).toBe('1 task left'); 
    });
});