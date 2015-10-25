angular.module('mapa', [])

.factory('mapa', function() {
	var self = {};
	var _mapa, _referencia, _circle;

	self.criar = function(container, coordenada, zoom) {
		var mapa = document.getElementById(container);
		var posicao = new google.maps.LatLng(coordenada.latitude, coordenada.longitude)
		var opcoes = {
			disableDefaultUI: true,
			scrollwheel: !1,
			center: posicao,
			zoom: zoom || 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		_mapa = new google.maps.Map(mapa, opcoes);

		return self;
	};

	function marcar(coordenada, icone) {
		var opcoes = {
			position: new google.maps.LatLng(coordenada.latitude, coordenada.longitude),
			map: _mapa
		};

		if (icone)
			opcoes.icon = icone;

		return new google.maps.Marker(opcoes);
	}

	function circular(coordenada) {
		return new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: _mapa,
			center: {
				lat: coordenada.latitude,
				lng: coordenada.longitude
			},
			radius: 5000
		});
	};

	self.marcarReferencia = function(coordenada) {
		_referencia = marcar(coordenada);
		_circle = circular(coordenada);

		return self;
	};

	self.alterarReferencia = function(coordenada) {
		_mapa.setCenter({ lat: coordenada.latitude, lng: coordenada.longitude });
		_referencia.setPosition({ lat: coordenada.latitude, lng: coordenada.longitude });
		_circle.setCenter({ lat: coordenada.latitude, lng: coordenada.longitude });

		return self;
	};

	self.marcar = function(coordenada, icone, detalhes) {
		var marcador = marcar(coordenada, icone);

		if(detalhes) {
			marcador.janela = new google.maps.InfoWindow();
			marcador.janela.setContent(detalhes);

			google.maps.event.addListener(marcador, 'click', function() {
				marcador.janela.open(_mapa, this);
			});
		}

		return self;
	};

	return self;
});