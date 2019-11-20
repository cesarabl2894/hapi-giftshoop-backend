const GamesCtrl = require('../app/controllers/games');
 jest.mock('../app/controllers/games');

 GamesCtrl.getGames = jest.fn(()=> [
    {
        "id": 7,
        "name": "The Witcher 3: Wild Hunt",
        "developer": "CD Projekt",
        "publisher": "CD Projekt",
        "price": 59,
        "description": "Test",
        "image": "http://www.mobygames.com/images/covers/l/305108-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg"
    }
 ]);

 const expectedData = [
    {
        "id": 7,
        "name": "The Witcher 3: Wild Hunt",
        "developer": "CD Projekt",
        "publisher": "CD Projekt",
        "price": 59,
        "description": "Test",
        "image": "http://www.mobygames.com/images/covers/l/305108-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg"
    }
 ];


test('Example', () => {

});

test('Get Games Function', () => {
    expect(GamesCtrl.getGames()).toEqual(expectedData);
});