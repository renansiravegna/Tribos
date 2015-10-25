var clientId = '480640858913-5bde6vrvp1a1hdpan1dasiqbvkj20li4.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/prediction';

function quandoCarregarAPagina() {
	window.setTimeout(checkAuth, 1);
}

function checkAuth() {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, quandoEstiverAutorizado);
}

function quandoEstiverAutorizado(resultado) {
	if (resultado && !resultado.error) {
		// apos ter acesso ao gapi
	} else if(!resultado) {
		quandoCarregarAPagina();
	} else {
		alert('Ocorreu um erro inesperado.');
	}
}