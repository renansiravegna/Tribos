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
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

import model.categoria.Categoria;
import web.categorias.response.ListarCategoriasResponse;

@Path("categorias")
@Produces(value = MediaType.APPLICATION_JSON)
@Consumes(value = MediaType.APPLICATION_JSON)
public class CategoriasController {

	@GET
	public Response listar() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(Categoria.class.getName());
		PreparedQuery pq = datastore.prepare(q);
		
		ListarCategoriasResponse categoriasResponse;
		List<ListarCategoriasResponse> categorias = new ArrayList<>();
		for (Entity entity : pq.asIterable()) {
			categoriasResponse = new ListarCategoriasResponse();
			
			Categoria categoria = new Categoria(entity);
			categoriasResponse.setNome(categoria.getNome());
			categoriasResponse.setAtividades(categoria.getAtividades());
			
			categorias.add(categoriasResponse);
		}

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
		esporte.adicionar("Poker");

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