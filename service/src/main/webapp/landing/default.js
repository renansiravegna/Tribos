var url = 'http://localhost:8080';
var formularioDeCadastro = $('#cadastro form');
var botaoDeSubmit = $('button[type="submit"]', formularioDeCadastro);

$(function() {
	$.getJSON(url + '/s/categorias/', function(resultado){
		imprimirCategoriasEAtividades(resultado);
		mostrarBotaoDeSubmit();
	});

	$(formularioDeCadastro).on('submit', function(e){
		e.preventDefault();
		$('#pronto').hide();
		
		var dados = { numero: $('#numero').val(), atividades: [] };
		
		$(':checkbox:checked').each(function(index, checkbox) {
			dados.atividades.push(checkbox.value);
		});
		
		var json = JSON.stringify(dados);
		
		if(validarCadastro()) {
			$.ajax({
				type: 'POST',
				url: url + '/s/usuarios',
				data: json,
				contentType: 'application/json',
				success: function( data ) {
					$('#pronto').show();
				}
			})
		}
	});

	$('input[type="tel"]').inputmask('(99) 9999[9]-9999'); 
	$('input[type="number"]').inputmask("9999"); 
});

function imprimirCategoriasEAtividades(listaDeCategorias) {
	var html = '';

	$.each(listaDeCategorias, function(i, categoria){
		html += '<h4>' + categoria.nome + '</h4>';

		if(categoria.atividades) {
			html += '<div class="field">';

			$.each(categoria.atividades, function(j, atividade){
				html += '<div class="ui checkbox">';
				html += '	<input type="checkbox" name="atividades" value="' + atividade + '" class="hidden required">';
				html += '	<label>' + atividade + '</label>';
				html += '</div>';
			});

			html += '</div>';
		}
	});

	$('#gostos').append(html);
	$('#gostos .carregando').remove();
	$('.ui.checkbox').checkbox();
}

function esconderBotaoDeSubmit() {
	botaoDeSubmit.attr('disabled', 'disabled')
				 .html(botaoDeSubmit.data('carregando'));
}

function mostrarBotaoDeSubmit() {
	botaoDeSubmit.removeAttr('disabled')
				 .html(botaoDeSubmit.data('texto'));
}

function validarCadastro() {
	var temErro = false;

	$('.field').removeClass('error');

	function adicionarErro(campo) {
		$(campo).parents('.field').addClass('error');
		temErro = true;
	}

	$('input.required', formularioDeCadastro).each(function(){
		var campo = this;

		if($(campo).is('[type="checkbox"],[type="radio"]') ) {
			var name = $(campo).attr('name'); 
			var opcoesMarcadas = $('input[name="' + name + '"]:checked');

			if(opcoesMarcadas.length === 0)
				adicionarErro(campo);
		} else {
			if(!$(campo).val())
				adicionarErro(campo);
		}
	});

	return !temErro;
}