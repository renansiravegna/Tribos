package web;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import model.categoria.Categoria;
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
	
	@POST
	public Response incluir() {
		Categoria esporte = new Categoria("Esporte");
		esporte.adicionar("Skate");
		esporte.adicionar("Patins");
		esporte.adicionar("Bike");
		esporte.adicionar("Corrida");
		esporte.adicionar("Natação");
		esporte.adicionar("Volei");

		Categoria jogos = new Categoria("Jogos");
		jogos.adicionar("CS:GO");
		jogos.adicionar("Destiny");
		jogos.adicionar("Call of Duty");
		jogos.adicionar("The Witcher III");

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(esporte.toEntity());
		datastore.put(jogos.toEntity());
		
		return Response.ok().header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").build();
	}
	
}