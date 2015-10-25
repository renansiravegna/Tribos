function MemoriaDeTribos() {
	this.salvar = function(scope) {
		scope.tribosSalvas = scope.tribos;
		scope.tribosPertosSalvas = scope.tribosPertos;
	};

	this.restaurar = function(scope) {
		scope.tribos = scope.tribosSalvas;
		scope.tribosPertos = scope.tribosPertosSalvas;
	};
}