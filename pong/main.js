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
            elements.push(ball);
            return elements;
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
})();

window.addEventListener("load", main);

function main(){
    var board = new board(800, 400);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas, board);
}