package model.categoria;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.Entity;

import model.entidadebase.EntidadeBase;

public class Categoria extends EntidadeBase {
	
	private String nome;
	
	private List<String> atividades = new ArrayList<>();
	
	public Categoria() {
		super();
	}

	public Categoria(String nome) {
		super();
		this.nome = nome;
	}
	
	@SuppressWarnings("unchecked")
	public Categoria(Entity entity) {
		super();
		id = entity.getProperty("id").toString();
		nome = entity.getProperty("nome").toString();
		atividades = (List<String>) entity.getProperty("atividades");
		
		if (atividades == null) {
			atividades = new ArrayList<>();
		}
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<String> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<String> atividades) {
		this.atividades = atividades;
	}
	
	public void adicionar(String atividade) {
		this.atividades.add(atividade);
	}

	@Override
	public Entity toEntity() {
		Entity entity = new Entity(Categoria.class.getName());
		
		entity.setProperty("id", id);
		entity.setProperty("nome", nome);
		entity.setProperty("atividades", atividades);
		
		return entity;
	}
}