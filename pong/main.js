//Funcion anonima para la construcción del tablero donde va a estar la pelota
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.plating = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            //elements.push(this.ball);
            return elements;
        }
    }
})();

//Para dibujar las barras
(function(){
    self.Bar = function(x,y, width, height, board)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this); //añado esta barra al array de barras del board
        this.kind = "rectangle"; //esto es para indicarle como dibujar las barras
        this.speed = 20;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();

//Para la construccion de la vista
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d"); // este es el objeto con el que se puede dibujar en javaScript
    }

    self.BoardView.prototype = {
        clean: function(){
            this.contexto.clearRect(0, 0, this.board.width, this.board.height);
        },
        draw: function(){
            for(var i = this.board.elements.length - 1; i>=0; i--){
                var el = this.board.elements[i];

                draw(this.contexto, el);
            }
        },
        play: function()
        {
            this.clean();
            this.draw();
        }
    }

    //Helper method que no pertenece al objeto pero ayuda a dibujar los elementos
    function draw(contexto, element){
        
        switch(element.kind){
            case "rectangle":
            contexto.fillRect(element.x, element.y, element.width, element.height);
            break;
        }
}

})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);


//Para el movimiento de las barras
document.addEventListener("keydown", function(ev){
    ev.preventDefault();
    if(ev.code == "ArrowUp")
    {
        bar_2.up();
    }
    else if(ev.code == "ArrowDown")
    {
        bar_2.down();
    }
    else if(ev.code == "KeyW")
    {
        bar.up();
    }
    else if(ev.code == "KeyS")
    {
        bar.down();
    }
});

window.requestAnimationFrame(controller);

function controller(){
    console.log(board);
    board_view.play();
    window.requestAnimationFrame(controller);

}