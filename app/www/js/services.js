angular.module('services', [])

.factory('Tribos', function(calcularDistancia) {
	return {
		todas: function() {
			return [{
				categoria: 'Patins',
				coordenada: {
					latitude: -20.497409,
					longitude: -54.627691
				},
				distancia: calcularDistancia(-20.497409, -54.627691),
				data: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
				populacao: 10
			}];
		}
	}
})

.factory('calcularDistancia', function() {
	function toRad(value) {
		return value * Math.PI / 180;
	}

	function isValidCoordinate(coordinate) {
		return typeof coordinate === "object";
	}

	function calculate(from, to) {
		if (isValidCoordinate(from) && isValidCoordinate(to)) {
			var earthRadiusInKm = 6371;
			var x = (toRad(to.longitude) - toRad(from.longitude)) *
				Math.cos((toRad(from.latitude) + toRad(to.latitude)) / 2);
			var y = (toRad(to.latitude) - toRad(from.latitude));
			return Math.sqrt(x * x + y * y) * earthRadiusInKm;
		}

		return 0;
	}

	return function(from, to) {
		var distanceInKm = calculate(from, to);

		if (distanceInKm > 1)
			return (distanceInKm).toFixed(1) + ' kilometros';

		return (distanceInKm * 1000).toFixed(0) + ' metros';
	}
});