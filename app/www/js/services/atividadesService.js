angular.module('services.atividades', [])
	.factory('Atividades', function(localStorage) {
		var dados = [{
			nome: 'Patins',
			categoria: 'Esporte'
		}, {
			nome: 'Poker',
			categoria: 'Jogos presenciais'
		}, {
			nome: 'Magic',
			categoria: 'Jogos presenciais'
		}, {
			nome: 'CS:GO',
			categoria: 'Jogos'
		}, {
			nome: 'Teatro',
			categoria: 'Cultura'
		}];

		return {
			todas: function() {
				return dados;
			},

			porCategoria: function(categorias) {
				var atividades = [];

				categorias.map(function(categoria) {
					categoria.atividades.map(function(atividade) {
						atividades.push({
							nome: atividade
						});
					});
				});

				return atividades;
			},

			selecionadas: function() {
				var atividades = localStorage.get('atividades') || [];

				return atividades.filter(function(atividade) {
					return atividade.selecionada;
				});
			},

			salvar: function(atividades) {
				localStorage.set('atividades', atividades);
			}
		};
	});