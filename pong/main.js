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
            elements.push(this.ball);
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
    }

    self.Bar.prototype = {
        down: function(){

        },
        up: function(){

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
        draw: function(){
            for(var i = this.board.elements.length - 1; i>=0; i--){
                var el = this.board.elements[i];

                draw(this.contexto, el);
            }
        }
    }

    //Helper method que no pertenece al objeto pero ayuda a dibujar los elementos
    function draw(contexto, element){
        if(element !== null && element.hasOwnProperty("kind"))
        {
            switch(element.kind){
                case "rectangle":
                contexto.fillRect(element.x, element.y, element.width, element.height);
                break;
            }
        }
        
    }

})();

window.addEventListener("load", main);

function main(){
    var board = new Board(800, 400);
    var bar = new Bar(20, 100, 40, 100, board);
    var bar = new Bar(730, 100, 40, 100, board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas, board);
    console.log(board);
    board_view.draw();
}