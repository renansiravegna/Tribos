package web;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import model.usuario.Usuario;
import web.usuarios.request.CadastraUsuarioRequest;

@Path("usuarios")
@Produces(value = MediaType.APPLICATION_JSON)
@Consumes(value = MediaType.APPLICATION_JSON)
public class UsuarioController {

	@POST
	public Response cadastrar(CadastraUsuarioRequest cadastraUsuarioRequest) {
		Usuario usuario = new Usuario(cadastraUsuarioRequest.getNumero(), cadastraUsuarioRequest.getAtividades());
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(usuario.toEntity());

		return Response.ok().header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").build();
	}
	
}
