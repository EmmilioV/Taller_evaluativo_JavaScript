//Funcion anonima para la construcción del tablero donde va a estar la pelota
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.plating = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){ return bar; }); //Esto es para realizar una copia del arreglo
            elements.push(this.ball);
            return elements;
        }
    }
})();

//Para dibujar la pelota
(function(){
    self.Ball = function(x, y , radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";

    }
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);

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
            if(this.board.playing)
            {
                this.clean();
                this.draw();
                this.board.ball.move();
            }
        }
    }

    //Helper method que no pertenece al objeto pero ayuda a dibujar los elementos
    function draw(contexto, element){
        
        switch(element.kind){
            case "rectangle":
                contexto.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                contexto.beginPath();
                contexto.arc(element.x, element.y, element.radius, 0, 7);
                contexto.fill();
                contexto.closePath();
            break;
        }
    }

})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);


//Para el movimiento de las barras
document.addEventListener("keydown", function(ev){
    ev.preventDefault();
    if(ev.code == "ArrowUp")
    {
        ev.preventDefault();
        bar_2.up();
    }
    else if(ev.code == "ArrowDown")
    {
        ev.preventDefault();
        bar_2.down();
    }
    else if(ev.code == "KeyW")
    {
        ev.preventDefault();
        bar.up();
    }
    else if(ev.code == "KeyS")
    {
        ev.preventDefault();
        bar.down();
    }
    else if(ev.code == "Space")
    {
        ev.preventDefault();
        board.playing = !board.playing;
    }
});

board_view.draw(); //esta linea es para inicializar el dibujo en pausa.

window.requestAnimationFrame(controller);
setTimeout(function(){ 
    ball.direction = -1
}, 4000)

function controller(){
    board_view.play();
    requestAnimationFrame(controller);
}