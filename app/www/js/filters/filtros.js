angular.module('filtros', [])

.filter('distance', function(calcularDistancia) {
	return function(from, to) {
		return calcularDistancia.calcularComTexto(from, to);
	};
});