package web;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import web.categorias.response.ListarCategoriasResponse;

@Path("categorias")
@Produces(value = MediaType.APPLICATION_JSON)
@Consumes(value = MediaType.APPLICATION_JSON)
public class CategoriasController {

	@GET
	public Response listar() {
		List<ListarCategoriasResponse> categorias = new ArrayList<>();
		
		categorias.add(new ListarCategoriasResponse("Esporte"));
		categorias.add(new ListarCategoriasResponse("Cultura"));
		categorias.add(new ListarCategoriasResponse("Lazer"));
		
		return Response.ok().entity(categorias).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").build();
	}
	
}
