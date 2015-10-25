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
	public List<ListarTribosResponse> listar() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query(Tribo.class.getName());
		PreparedQuery pq = datastore.prepare(q);
		
		List<ListarTribosResponse> listarTribosResponse = new ArrayList<>();
		ListarTribosResponse triboResponse;
		for (Entity entity : pq.asIterable()) {
			triboResponse = new ListarTribosResponse();
			Tribo tribo = new Tribo(entity);
			
			triboResponse.setCategoria(tribo.getCategoria());
			triboResponse.setCoordenada(tribo.getCoordenada());
			triboResponse.setDiasDaSemana(tribo.getDiasDaSemana());
			triboResponse.setPopulacao(15);
			
			listarTribosResponse.add(triboResponse);
		}

		return listarTribosResponse;
	}

	@POST
	public String adicionarTribo() {
		Coordenada coordenada = new Coordenada(-20.453751, -54.572491);
		Tribo tribo = new Tribo("Patins", Arrays.asList(DiaDaSemana.TERCA, DiaDaSemana.SEXTA), coordenada);
		Entity triboEntity = tribo.toEntity();

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(triboEntity);

		return tribo.getId();
	}
}