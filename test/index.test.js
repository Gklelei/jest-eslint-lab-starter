const { capitalizeWords, filterActiveUsers, logAction } = require('../index');


describe('Capitalize words', () => {
    it('capitalizes normal sentence', () => {
        const result = capitalizeWords('hello world');
        expect(result).toBe('Hello World');
    });  
    it('returns empty string when input is empty', ()=>{
        const result = capitalizeWords('');
        expect(result).toBe('');
    });
    it('works with hyphenated words', ()=> {
        const result = capitalizeWords('hello-world');
        expect(result).toBe('Hello-World');
    });

    it('Capitalizes single words', ()=> {
        const result = capitalizeWords('Hello');
        expect(result).toBe('Hello');
    });
});

describe('Filter active users', ()=>{
    const users = [
        {
            name:'lelei',
            isActive:false
        },
        {
            name:'lelei',
            isActive:true
        }
    ];
    it('should contain both active and inactive users in the input', ()=>{
       
        const hasActive = users.some((u)=> u.isActive);
        const hasNotActive = users.some((u)=> !u.isActive);

        expect(hasActive).toBe(true);
        expect(hasNotActive).toBe(true);
    });

    it('should return all active users', ()=> {
        const result = filterActiveUsers(users);
        // expect(result.length).toBe(1);
        expect(result).toEqual([
            {
                name:'lelei',
                isActive:true
            }
        ]);
    });
    it('returns empty array when input is empty', ()=>{
        const users = [];
        const result = filterActiveUsers(users);
        expect(result.length).toBe(0);
        // expect(result).toEqual([])
    });
});

describe('logAction', () => {
    it('generates the correct log string for valid inputs', () => {
        const result = logAction('login', 'lelei');
        expect(result).toMatch(/^User lelei performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('generates log string when useName is missing', () => {
        const result = logAction('login', undefined);
        expect(result).toMatch(/^User undefined performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });   
    it('generates log string when action is missing', () => {
        const result = logAction(undefined, 'lelei');
        expect(result).toMatch(/^User lelei performed undefined at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });   
    it('generates log string when an empty string is passed', () => {
        const result = logAction('', '');
        expect(result).toMatch(/^User\s\sperformed\s\sat\s\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });   
});


