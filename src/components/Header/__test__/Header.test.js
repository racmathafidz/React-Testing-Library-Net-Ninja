import { render, screen } from '@testing-library/react';
import Header from '../Header';

// CONTOH UNIT TESTING

/// 'test' block. argument pertama adalah deskripsi test. argument kedua adalah test callback.
test('header text should render the same text with the title props', async () => { 
    // 1. Rendering
    /// Render header dengan props 'Title' yang valuenya akan dirender di views
    render(<Header title="Title"/>);  

    // 2. Temukan element yang ingin di test 
    /// getByText = Menemukan text di component yang di render
    /// (Menggunakan regex irregular, jadi huruf besar-kecil tidak berpengaruh)
    const headingElement = screen.getByText(/title/i); 
  
    // 3. Element expect / test
    /// expect text 'title' berada di document
    expect(headingElement).toBeInTheDocument(); 
  
    // 4. 'npm test' untuk menjalankan tes dan lihat hasil test
});

// test('header text should render the correct role/tags', async () => {     
//     render(<Header title="Title"/>);  

//     /// getByRole = Menemukan role/tags di component yang di render
//     /// getByRole 'heading' karena text menggunakan tags h1 (heading 1)
//     const headingElement = screen.getByRole('heading'); 
      
//     expect(headingElement).toBeInTheDocument(); 
// });

test('header text should render the correct role/tags', async () => {     
    render(<Header title="Title"/>);  

    /// getByRole = Menemukan role/tags di component yang di render
    /// getByRole 'heading' karena text menggunakan tags h1 (heading 1)
    /// Menggunakan option object 'name' ketika di component yang dirender terdapat lebih dari 1 role/tag element yang sama
    const headingElement = screen.getByRole('heading', { name: 'Title' }); 
      
    expect(headingElement).toBeInTheDocument(); 
});

// ------------ Menggunakan Semanting Queries

test('header text should have title attribute with correct value rendered', async () => {     
    render(<Header title="Title"/>);  

    /// getByTitle = Menemukan value attribute title di component yang di render
    const headingElement = screen.getByTitle('Header'); 
      
    expect(headingElement).toBeInTheDocument(); 
});

// ------------ Menggunakan Test ID (Pilihan terakhir dalam testing)

test('header text should have data-testid attribute with correct value rendered', async () => {     
    render(<Header title="Title"/>);  

    /// getByTestId = Menemukan test id di component yang di render
    /// membuat test id menggunakan attribute 'data-testid'
    const headingElement = screen.getByTestId('header-test-id'); 
      
    expect(headingElement).toBeInTheDocument(); 
});

 // ------------ Menggunakan Find By (Digunakan untuk testing unit yang harus asynchronous. Contoh: API.)

test('header text should render the same text with the title props', async () => { 
    render(<Header title="Title"/>);  
    
    /// findByText = Menemukan text di component yang di render tetapi harus asynchronous (Digunakan untuk testing unit asynchronous)    
    const headingElement = await screen.findByText(/title/i); 
      
    expect(headingElement).toBeInTheDocument(); 
});

// ------------ Menggunakan Query By (Ketika no match bersifat null bukan error. jadi bisa menggunakan 'not')

test('header text should not render `find-this` text', async () => { 
    render(<Header title="Title"/>);  
    
    /// queryByText = Menemukan text di component yang di render   
    const headingElement = screen.queryByText(/find-this/i); 
    
    /// 'not' expect headingElement tidak ada di document
    expect(headingElement).not.toBeInTheDocument(); 
});

// ------------ Menggunakan Get All (Hasil test berupa array)

test('header should have the correct amount of role/tags rendered', async () => { 
    render(<Header title="Title"/>);  
    
    /// getAllByRole = Menemukan  role/tags di component yang di render dalam bentuk array (bisa lebih dari 1)
    const headingElements = screen.getAllByRole('heading'); 
    
    /// expect length array headingElements menjadi 2
    expect(headingElements.length).toBe(2); 
});