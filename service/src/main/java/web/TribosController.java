package web;

import java.util.ArrayList;
import java.util.Arrays;
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

import model.tribo.DiaDaSemana;
import model.tribo.Tribo;
import web.tribos.response.Coordenada;
import web.tribos.response.ListarTribosResponse;

@Path("tribos")
@Produces(value = MediaType.APPLICATION_JSON)
@Consumes(value = MediaType.APPLICATION_JSON)
public class TribosController {

	@GET
	public Response listar() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(Tribo.class.getName());
		PreparedQuery pq = datastore.prepare(q);
		
		List<ListarTribosResponse> listarTribosResponse = new ArrayList<>();
		ListarTribosResponse triboResponse;
		for (Entity entity : pq.asIterable()) {
			triboResponse = new ListarTribosResponse();
			Tribo tribo = new Tribo(entity);
			
			triboResponse.setNome(tribo.getNome());
			triboResponse.setCoordenada(tribo.getCoordenada());
			triboResponse.setDiasDaSemana(tribo.getDiasDaSemana());
			triboResponse.setPopulacao(15);
			triboResponse.setAtividade(tribo.getAtividade());
			
			listarTribosResponse.add(triboResponse);
		}

		return Response.ok().entity(listarTribosResponse).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").build();
	}

	@POST
	public Response adicionarTribo() {
		Coordenada coordenada1 = new Coordenada(-19.931640, -43.938000);
		Tribo tribo1 = new Tribo("Esporte", Arrays.asList(DiaDaSemana.TERCA, DiaDaSemana.SEXTA), coordenada1, "Poker");
		Entity entity1 = tribo1.toEntity();
		
		Coordenada coordenada2 = new Coordenada(-19.926072, -43.922893);
		Tribo tribo2 = new Tribo("Jogos", Arrays.asList(DiaDaSemana.SEGUNDA), coordenada2, "Destiny");
		Entity entity2 = tribo2.toEntity();
		
		Coordenada coordenada3 = new Coordenada(-19.923974, -43.934566);
		Tribo tribo3 = new Tribo("Esporte", Arrays.asList(DiaDaSemana.DOMINGO, DiaDaSemana.QUARTA), coordenada3, "Bike");
		Entity entity3 = tribo3.toEntity();
		
		Coordenada coordenada4 = new Coordenada(-19.929219, -43.947484);
		Tribo trubo4 = new Tribo("Jogos", Arrays.asList(DiaDaSemana.SABADO), coordenada4, "Call of Duty");
		Entity entity4 = trubo4.toEntity();
		
		Coordenada coordenada5 = new Coordenada(-19.922441, -43.935725);
		Tribo tribo5 = new Tribo("Esporte", Arrays.asList(DiaDaSemana.QUINTA), coordenada5, "Corrida");
		Entity entity5 = tribo5.toEntity();
		
		Coordenada coordenada6 = new Coordenada(-19.922441, -43.935725);
		Tribo tribo6 = new Tribo("Esporte", Arrays.asList(DiaDaSemana.QUINTA), coordenada6, "Natação");
		Entity entity6 = tribo6.toEntity();
		
		Coordenada coordenada7 = new Coordenada(-19.922441, -43.935725);
		Tribo tribo7 = new Tribo("Esporte", Arrays.asList(DiaDaSemana.QUINTA), coordenada7, "Patins");
		Entity entity7 = tribo7.toEntity();

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(entity1);
		datastore.put(entity2);
		datastore.put(entity3);
		datastore.put(entity4);
		datastore.put(entity5);
		datastore.put(entity6);
		datastore.put(entity7);

		return Response.ok().entity(tribo1.getId()).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").build();
	}
}