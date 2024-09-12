const Biblioteca = require("../src/biblioteca");

describe('Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
      });

    test('Deve adicionar um livro', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasia', ano: 1997 };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivros()).toContain(livro);
    });

    test('Deve remover um livro', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal' };
        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);
        expect(biblioteca.listarLivros()).not.toContain(livro);
    });

    test('Deve buscar um livro por ID', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.buscarLivroPorId(1)).toEqual(livro);
    });

    test('Deve buscar um livro por título', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.buscarLivroPorTitulo('Harry Potter e a Pedra Filosofal')).toStrictEqual([livro]);
    });

    test('Deve listar livros emprestados e disponíveis', () => {
        const livro1 = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', emprestado: false };
        const livro2 = { id: 2, titulo: 'Harry Potter e a Câmara Secreta', emprestado: true };
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        expect(biblioteca.listarLivrosEmprestados()).toStrictEqual([livro2]);
        expect(biblioteca.listarLivrosDisponiveis()).toStrictEqual([livro1]);
    });

    test('Deve emprestar e devolver um livro', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', emprestado: false };
        biblioteca.adicionarLivro(livro);
        const membro = { id: 1, nome: 'Membro Julia' };
        biblioteca.adicionarMembro(membro);

        expect(biblioteca.emprestarLivro(1, 1)).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(true);

        expect(biblioteca.devolverLivro(1)).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(false);
    });

    test('Deve adicionar e listar membros', () => {
        const membro = { id: 1, nome: 'Membro Julia' };
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.listarMembros()).toStrictEqual([membro]);
    });

    test('Deve remover um membro', () => {
        const membro = { id: 1, nome: 'Membro Julia' };
        biblioteca.adicionarMembro(membro);
        biblioteca.removerMembro(1);
        expect(biblioteca.listarMembros()).not.toContain(membro);
    });

    test('Deve buscar membro por ID', () => {
        const membro = { id: 1, nome: 'Membro Julia' };
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.buscarMembroPorId(1)).toEqual(membro);
    });

    test('Deve contar livros', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal' };
        biblioteca.adicionarLivro(livro);

        expect(biblioteca.contarLivros()).toBe(1);
    });

    test('Deve contar membros', () => {
        const membro = { id: 1, nome: 'Membro Julia' };
        biblioteca.adicionarMembro(membro);

        expect(biblioteca.contarMembros()).toBe(1);
    });

    test('Deve listar livros por autor', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivrosPorAutor('J.K. Rowling')).toStrictEqual([livro]);
    });

    test('Deve listar livros por gênero', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasia' };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivrosPorGenero('Fantasia')).toStrictEqual([livro]);
    });

    test('Deve atualizar informações do livro', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' };
        biblioteca.adicionarLivro(livro);
        biblioteca.atualizarInformacaoLivro(1, { titulo: 'Harry Potter e a Pedra Vermelha' });
        expect(biblioteca.buscarLivroPorId(1).titulo).toBe('Harry Potter e a Pedra Vermelha');
    });

    test('Deve listar livros por ano', () => {
        const livro = { id: 1, titulo: 'Harry Potter e a Pedra Filosofal', ano: 1997 };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.listarLivrosPorAno(1997)).toStrictEqual([livro]);
    });
});