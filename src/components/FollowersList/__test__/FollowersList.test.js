import { render, screen } from '@testing-library/react';
import FollowersList from '../FollowersList';
import { BrowserRouter } from 'react-router-dom';

// CONTOH ASYNCHRONOUS UNIT TESTING
/// Asynchronous test menggunakan findBy

/// Menggunakan Mock karena di dalam component <FollowersList> terdapat <Link>
const MockFollowersList = () => (
    <BrowserRouter>
        <FollowersList />
    </BrowserRouter>
);

describe('followers list', () => {

    /// Testing Hooks
    //// Berjalan sebelum setiap test
    beforeEach(() => {
        console.log('Running before each test.');
    });

    //// Berjalan sebelum seluruh test
    beforeAll(() => {
        console.log('Running before all test.');
    });

    //// Berjalan sesudah setiap test
    afterEach(() => {
        console.log('Running after each test.');
    });

    //// Berjalan sesudah seluruh test
    afterAll(() => {
        console.log('Running after all test.');
    });

    /// 'test' block. argument pertama adalah deskripsi test. argument kedua adalah test callback.
    test('should render followers items', async () => { 
        // 1. Rendering    
        render(<MockFollowersList />);  
    
        // 2. Temukan element yang ingin di test 
        /// menggunakan asynchronous karena element hanya tersedia ketika fetch API sudah selesai
        const followerDivElement = await screen.findByTestId('follower-item-0'); 
      
        // 3. Element expect / test    
        expect(followerDivElement).toBeInTheDocument(); 
      
        // 4. 'npm test' untuk menjalankan tes dan lihat hasil test
    });

    test('should render multiple followers items', async () => { 
        // 1. Rendering    
        render(<MockFollowersList />);  
    
        // 2. Temukan element yang ingin di test 
        /// menggunakan asynchronous karena element hanya tersedia ketika fetch API sudah selesai
        /// findAllByTestId akan me-return sebuah array
        const followerDivElement = await screen.findAllByTestId(/follower-item/i); 
      
        // 3. Element expect / test    
        expect(followerDivElement.length).toBe(5); 
      
        // 4. 'npm test' untuk menjalankan tes dan lihat hasil test
    });
});