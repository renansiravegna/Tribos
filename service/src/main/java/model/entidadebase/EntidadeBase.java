package model.entidadebase;

import java.util.UUID;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public abstract class EntidadeBase {

	protected String id;
	
	public EntidadeBase() {
		this.id = UUID.randomUUID().toString();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public <T extends EntidadeBase> Key getKey(Class<T> clazz) {
		return KeyFactory.createKey(clazz.getName(), id);
	}
	
	public abstract Entity toEntity();
	
}