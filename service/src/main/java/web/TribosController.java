package web;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import web.tribos.response.Coordenada;
import web.tribos.response.ListarTribosResponse;

@Path("tribos")
@Produces(value = MediaType.APPLICATION_JSON)
@Consumes(value = MediaType.APPLICATION_JSON)
public class TribosController {

	@GET
	public List<ListarTribosResponse> listar() {
		List<ListarTribosResponse> listarTribosResponse = new ArrayList<>();
		
		listarTribosResponse.add(new ListarTribosResponse("Patins", new Date(), 15, new Coordenada(-20.453751, -54.572491)));
		listarTribosResponse.add(new ListarTribosResponse("Poker", new Date(), 20, new Coordenada(-20.469711, -54.620121)));
		listarTribosResponse.add(new ListarTribosResponse("Livros", new Date(), 47, new Coordenada(-20.469711, -54.620121)));
		
		return listarTribosResponse; 
	}
}