describe("Game", function() {
  var game, player;

  beforeEach(function(){
    game = new Game();
    player = new Player();
    $('#jasmine_content').html('<div id="level-container"></div><div id="sprite-container"></div>');
  });

  it("should be able to return a level", function() {
    var level = game.get_level(0);
    expect(level.id).toEqual(0);
    expect(level.name).toEqual('prototype');
    expect(level.html).toBeDefined();
  });
  
  it("should be able to return a default level", function() {
    var level = game.get_level();
    expect(level.id).toEqual(0);
    expect(level.name).toEqual('prototype');
    expect(level.html).toBeDefined();
  });

  it("should build the board after player name and level are loaded", function(){
    expect($('#jasmine_content #level-container .tube').length).toEqual(0);
    game = new Game();
    player = new Player();
    expect(game.sprites).toBeDefined();
    expect(game.sprites.length).toBeGreaterThan(0);
    expect(game.current_level).toBeDefined();
    expect($('#jasmine_content #level-container .tube').length).toEqual(1);
  });

  it('should start a game loop', function() {
    spyOn(game, 'next_tick').andCallThrough();
    game.start();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(1);
    jasmine.Clock.tick(ONE_GAME_TICK);    
    jasmine.Clock.tick(ONE_GAME_TICK);    
    jasmine.Clock.tick(ONE_GAME_TICK);    
    expect(game.next_tick.calls.length).toBe(4);
  });

  it('should be possible to stop the game loop', function() {
    spyOn(game, 'next_tick').andCallThrough();
    game.start();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(2);
    game.pause();
    jasmine.Clock.tick(ONE_GAME_TICK );    
    jasmine.Clock.tick(ONE_GAME_TICK );    
    expect(game.next_tick.calls.length).toBe(2);
  });


  describe('on next_tick', function(){
    describe('refresh_display',function(){
      describe("moves the .avatar div", function(){
        beforeEach(function(){
          game = new Game();
          player = new Player({position:{x:200,y:200}});
          avatar = player.avatar;
          game.next_tick();
        });    
  
        it('should move left when player presses left', function(){
          var before_position = $(avatar.html).css('left');
          simulate_left_key_press();
          game.next_tick();
          var after_position = $(avatar.html).css('left');
          expect(before_position).toBeGreaterThan(after_position);
        });

        it('should move right when player presses right', function(){
          var before_position = $(avatar.html).css('left');
          simulate_right_key_press();
          game.next_tick();
          var after_position = $(avatar.html).css('left');
          expect(before_position).toBeLessThan(after_position);
        });

      });
    });
  });
});
