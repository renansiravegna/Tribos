package model.usuario;

import java.util.List;

import com.google.appengine.api.datastore.Entity;

import model.entidadebase.EntidadeBase;

public class Usuario extends EntidadeBase {
	
	private String numero;
	
	private List<String> atividades;

	public Usuario() {
		super();
	}

	public Usuario(String numero, List<String> atividades) {
		super();
		this.numero = numero;
		this.atividades = atividades;
	}
	
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public List<String> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<String> atividades) {
		this.atividades = atividades;
	}
	
	@Override
	public Entity toEntity() {
		Entity entity = new Entity(Usuario.class.getName());
		
		entity.setProperty("id", id);
		entity.setProperty("numero", numero);
		entity.setProperty("atividades", atividades);
		
		return entity;
	}
}